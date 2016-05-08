App.service('project_zzzelp', [
    function() {

        this.name = 'Zzzelp';

        this.presentation_fr =  '<p>Zzzelp est une plateforme permettant d\'enrichir l\'expérience utilisateur sur le jeu en ligne Fourmizzz.<br>';
        this.presentation_fr += 'Il met à disposition des joueurs une série d\'outils visant à la fois à augmenter leur productivité et à rendre le jeu plus agréable au quotidien. ';
        this.presentation_fr += 'Le site comporte ainsi des aides de jeu, des indicateurs de performance ou encore des outils de gestion.</p>';
        this.presentation_fr += '<p>Une extension Chrome et Firefox est également proposée et offre tout un ensemble d\'améliorations graphiques et d\'analyses des données du jeu.</p>';
        this.presentation_fr += '<p>La plateforme est entièrement financée par sa communauté grâce à un <a href="https://fr.ulule.com/zzzelp/" target="_BLANK">';
        this.presentation_fr += 'financement participatif</a> ayant récolté 465€ à la fin de l\'année 2014.</p>';
        this.presentation_fr += 'Quelques valeurs clées : <br><ul><li>~ 4 000 comptes actifs</li><li>~ 4 000 000 pages vues par mois</li><li>~ 30 000 lignes de code</li></ul>';

        this.presentation_en =  '<p>Zzzelp is a website aiming at improving the user experience on the online game Antzzz.<br>';
        this.presentation_en += 'It provides a set of tools that allow every user to improve their productivity and to make the game more pleasant. ';
        this.presentation_en += 'To do that, the website include helps for the game, performance indicators or monitoring tools.</p>';
        this.presentation_en += '<p>An extension for Chrome and Firefox which add many graphical improvement and data analysis is also available.</p>';
        this.presentation_en += '<p>The project is fully funded by its community thanks to a <a href="https://fr.ulule.com/zzzelp/" target="_BLANK">';
        this.presentation_en += 'crowdfunding</a> that raised 465€ at the end of the year 2014.</p>';
        this.presentation_en += 'Some key values : <br><ul><li>~ 4 000 active accounts</li><li>~ 4 000 000 monthly views</li><li>~35 000 lines of code</li>';


        this.get_html = function(language) {
            switch(language) {
                case 'french' :
                    return {
                        title           : 'Zzzelp',
                        presentation    : this.presentation_fr
                    };
                case 'english' :
                    return {
                        title : 'Zzzelp',
                        presentation    : this.presentation_en
                    };
                default :
                    console.error('This language is not yet implemented');
            }            
        };
    }
]);