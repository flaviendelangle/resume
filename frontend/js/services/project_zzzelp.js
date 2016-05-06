App.service('project_zzzelp', [
    function() {

        this.name = 'Zzzelp';

        this.presentation_fr =  '<p>Zzzelp est une plateforme permettant d\'enrichir l\'expérience utilisateur sur le jeu en ligne Fourmizzz.<br>';
        this.presentation_fr += 'Il met à disposition des joueurs une série d\'outils visant à la fois à augmenter leur productivité et à rendre le jeu plus agréable au quotidien. ';
        this.presentation_fr += 'Le site comporte ainsi des aides de jeu, des indicateurs de performance ou encore des outils de gestion.</p>';
        this.presentation_fr += '<p>Une extension Chrome et Firefox est également proposée et offre tout un ensemble d\'améliorations graphiques et d\'analyses des données du jeu.</p>';
        this.presentation_fr += '<p>La plateforme est entièrement financée par sa communauté grâce à un financement participatif ayant récolté 465€ à la fin de l\'année 2014.</p>';
        this.presentation_fr += 'Quelques valeurs clées : <br><ul><li>~ 4 000 comptes actifs</li><li>~ 4 000 000 pages vues par mois</li><li>~ 30 000 lignes de code</li></ul>';

        this.get_html = function(language) {
            switch(language) {
                case 'french' :
                    return {
                        title           : 'Zzzelp',
                        presentation    : this.presentation_fr
                    };
                case 'english' :
                    return {
                        title : 'Zzzelp'
                    };
                default :
                    console.error('This language is not yet implemented');
            }            
        };
    }
]);