<?php

class OptimisationDistances {

    const CONVOISPROCHE = 1740;

    public $tableau_coordonnees;
    public $convois_restants;
    public $ratio_TDC;
    public $nombre_convois;
    public $convois = array();
    public $total_distance = 0;
    public $total_ressources = 0;
    public $total_ressources_proches = 0;


    public function __construct($alliance) {
        [...]
        $this->RepartitionConvois();
    }

    /**
     * Répartit les convois entre les joueurs selon le plan suivant :
     * - Répartir tous les convois possibles Ã  moins de 15 minutes par ordre croissant de distance
     * - Répartir tous les convois des joueurs qui auraient du mal à convoyer loin (ouvrières / TDC < 1.3)
     * - Répartir les convois restant par ordre dÃ©croissant de convois Ã  faire
    **/
    protected function RepartitionConvois() {
        $this->ConvoisVoisins();
        $this->ConvoisPrioritaires();
        $this->ConvoisRestants();
    }

    /**
     *  Répartit tous les convois Ã  moins de 15 minutes de trajet.
    **/
    protected function ConvoisVoisins() {
        foreach ($this->tableau_coordonnees as $duo => $distance) {
            if($distance > 15) {
                break;
            }
            else {
                $couple = explode('/', $duo);
                if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
                    $convoi = $this->ValeurConvoi($couple);
                    $this->AppliquerConvoi($couple, $convoi, $distance);
                }
            }
        }
    }

    /**
        * Répartit un maximum de convois proches (< 29mn ) aux joueurs ayant un ration ouvrÃ¨res / TDC faible
    **/
    protected function ConvoisPrioritaires() {
        while($this->ratio_TDC as $pseudo => $ratio) {
            if($ratio > 1.3) {
                break;
            }
            foreach($this->tableau_coordonnees as $duo => $distance) {
                $couple = explode('/', $duo);
                if ($distance < self::CONVOISPROCHE AND $couple[0] == $pseudo) {
                    if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
                        $convoi = $this->ValeurConvoi($couple);
                        $this->AppliquerConvoi($couple, $convoi, $distance);
                    }
                }
            }
        }
    }

    protected function ConvoisRestants() {
        foreach($this->nombre_convois as $pseudo => $ratio) {
            foreach($this->tableau_coordonnees as $duo => $distance) {
                $couple = explode('/', $duo);
                if ($couple[0] == $pseudo) {
                    if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
                        $convoi = $this->ValeurConvoi($couple);
                        $this->AppliquerConvoi($couple, $convoi, $distance);
                    }
                }
            }
        }
    }

    protected function ValeurConvoi($couple) {
        /*
            Le joueur 1 doit envoyer plus de ressources que le joueur 2 ne doit en recevoir
        */
        if ($this->convois_restants[$couple[0]] > -$this->convois_restants[$couple[1]]) {
            return -$this->convois_restants[$couple[1]] ;
                }
        /*
            Le joueur 2 doit recevoir plus de ressources que le joueur 1 ne doit en envoyer
        */
        else {
            return $this->convois_restants[$couple[0]];
        }
    }

    protected function AppliquerConvoi($couple, $convoi, $distance) {
        /*
            On met à jour les différentes statistiques
        */
        $this->total_distance += $convoi*$distance;
        $this->total_ressources += $convoi;

        /*
            On met à jour les convois restantes
        */
        $this->convois_restants[$couple[0]] -= $convoi;
        $this->convois_restants[$couple[1]] += $convoi;

        /*
            Le convois est à moins de 30 minutes
        */
        if($distance <= self::CONVOISPROCHE) {
            $this->total_ressources_proches += $convoi;
        }

        $this->convois[$couple[0]][$couple[1]] = $convoi;
    }

    [...]
}



?>