# -*- coding: utf-8 -*-

import datetime
import time
import sqlite3


"""
    Calcul du PageRank
"""

def PageRank() :
    """
    Fonction principale permettant de calculer le PageRank à partir de deux fichiers :
        - La liste des liens entre deux articles de Wikipédia
        - La liste des articles de Wikipédia (calculé à la première utilisation)
    """
    date = datetime.datetime.now() 
    nom_bdd = str(date.day) + '-' + str(date.month) + '-' + str(date.year) + ' ' + str(date.hour) + ':' + str(date.minute) + ':' + str(date.second) + '.sq3'
    Initialisation_BDD(nom_bdd)
    graphe, index = Initialisation_graphe_web(nom_bdd)
    taille = len(graphe)
    pagerank = Initialisation_PageRank(taille, False)
    graphe = Recuperation_liens(graphe, index, nom_bdd)
    distance = 1
    n = 0
    while distance > 1e-06 :
        n+=1
        pagerank, distance = Iteration_Pagerank(pagerank, graphe, taille, n, nom_bdd)
        print str(n) + ' : ' + str(distance)
    Stockage_PageRank(pagerank, index, 0, nom_bdd)

def Initialisation_PageRank(taille, vide) :
    """
    Crée le vecteur initial du PageRank (vecteur colonne de N éléments valant chacun 1/N)
    Il est représenté par un dictionnaire dont les clés sont les indexs des articles
    """
    if vide :
        valeur_initiale = 0
    else :
        valeur_initiale = 1.0/float(taille)    
    pagerank = {}
    for i in range(taille) :
        pagerank[i] = valeur_initiale
    return pagerank    
    
def Iteration_Pagerank(pagerank, graphe, taille, n, nom_bdd) :
    """
    Calcul Pn+1 à partir de Pn
    """
    debut = time.time()
    c = 0.85 # coefficient d'atténuation
    n_elements = float(taille)
    pagerank_2 = Initialisation_PageRank(taille, True)
    for i in range(taille) :
        liens = graphe[i]
        liens_length = len(liens)
        for j in range(liens_length) :
               pagerank_2[liens[j]] += pagerank[i] / float(liens_length)
    for i in range(taille) :
        pagerank_2[i] = c * pagerank_2[i] + (1-c) / n_elements;
    Stockage_duree(nom_bdd, { 'name' : 'Calcul du PageRank ' + str(n), 'duration' : time.time() - debut })
    return pagerank_2, Distance_PageRank(pagerank, pagerank_2, taille, nom_bdd)

def Distance_PageRank(pagerank_1, pagerank_2, taille, nom_bdd) :
    """
    Calcul la distance (Norme 1) entre deux itérations successives du PageRank
    """
    debut = time.time()
    distance = 0
    for i in range(taille) :
        distance += abs(pagerank_1[i] - pagerank_2[i])
    Stockage_distance(nom_bdd, distance)
    Stockage_duree(nom_bdd, { 'name' : 'Calcul de la distance', 'duration' : time.time() - debut })
    return distance
    
    
      
    
    
    
"""
    Gestions des fichiers contenant la liste des liens puis la liste des articles
"""

def Generation_liste_articles() :
    """
    Crée la liste des articles grâce à la liste des liens entre deux articles
    Ne prend en compte que les articles ayant au moins un lien sortant
    """
    with open('page_links_fr.nq', 'r') as dump :
        i = 0
        articles = ''
        ex_source = ''
        for ligne in dump :
            (source, cible) = Analyse_ligne_liens(ligne)
            if (source != None and source != ex_source) :
                ex_source = source
                articles += ex_source + '\n'
                i += 1
                """
                    On stock les titres tous les 1 000 articles pour éviter d'avoir des chaînes de caractère trop longues
                """
                if(i%1000 == 0) :
                    print i
                    Stocker_titres_articles(articles, i)
                    articles = ''
    Stocker_titres_articles(articles, i)

def Stocker_titres_articles(contenu, i) :
    """
    Stock les titres des articles dans un fichier pour ne pas avoir à les chercher à chaque utilisation
    """
    if i == 1000 :
        with open('liste_articles.txt', 'w') as fichier :
            fichier.write(contenu + '\n')
    else : 
        with open('liste_articles.txt', 'a') as fichier :
            fichier.write(contenu + '\n')

def Initialisation_graphe_web(nom_bdd) :
    """
    Crée le graphe orienté représentant les articles Wikipédia sans aucun lien
    """
    debut = time.time()
    graphe = {}
    index = {}
    i = 0
    with open('liste_articles.txt', 'r') as fichier :
        for ligne in fichier :
            index[ligne.replace('\n','').strip()] = i
            graphe[i] = []
            i+=1
    Stockage_duree(nom_bdd, { 'name' : 'Initialisation du graphe', 'duration' : time.time() - debut })
    return graphe, index
            
def Recuperation_liens(graphe, index, nom_bdd) :
    """
    Ajoute les liens au graphe représentant Wikipédia
    Les données sont représentées en liste d'adjacence sous la forme :
        {
            1 : [...],
            2 : [...],
            ...
        }
    """
    debut = time.time()
    with open('page_links_fr.nq', 'r') as dump :
        i = 0
        for ligne in dump :
            i+=1
            (source, cible) = Analyse_ligne_liens(ligne)
            if source != None :
                if cible in index :
                    graphe[index[source]].append(index[cible])
            
    Stockage_duree(nom_bdd, { 'name' : 'Remplissage du graphe', 'duration' : time.time() - debut })
    return graphe
        
def Analyse_ligne_liens(ligne) :
    """
    Transforme une ligne avec les deux articles concernés par un lien en deux URL
    """
    if '<' in ligne :
        ligne = ligne.replace('>','').split('<')
        return ligne[1].replace('http://fr.dbpedia.org/resource/', '').strip(), ligne[3].replace('http://fr.dbpedia.org/resource/', '').strip()
    return None, None







"""
    Gestion de la base de donnée
"""

def Initialisation_BDD(nom_bdd) :
    """
    Crée une base de données avec SQLITE afin de stocker les résultats du programme
    """
    bdd = sqlite3.connect(nom_bdd)
    cursor = bdd.cursor()
    cursor.execute("""CREATE TABLE operations (
                            id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                            name TEXT,
                            duration FLOAT
                        )
                        """)
    cursor.execute("""CREATE TABLE distances (
                            id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                            distance FLOAT
                        )
                        """)    
    bdd.close()

def Stockage_duree(nom_bdd, donnees) :
    """
    Stock en base de données la durée nécessaire pour réaliser chacune des parties du code
    """
    [...]

def Stockage_distance(nom_bdd, distance) :
    """
    Stock en base de données la distance entre deux itérations du PageRank
    """
    [...]
    
def Stockage_PageRank(pagerank, index, taille, nom_bdd) :
    """
    Stock le PageRank obtenu au terme de toutes les itérations
    """
    [...]




Generation_liste_articles()