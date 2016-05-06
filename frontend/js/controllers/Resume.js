App.controller('ResumeCtrl', [
    '$scope',
    '$timeout',
    'CONFIG',
    function($scope,$timeout,CONFIG) {

        $scope.affiche = false;

        $scope.init = function() {
            $scope.set_language(CONFIG.language.default);
            $timeout(function() {
                $scope.affiche = true;
            }, CONFIG.animation.start);
        };

        $scope.set_language = function(language) {
            switch(language) {
                case 'french' :
                    $scope.html = {
                        sections : [
                            {
                                title   : 'Formation',
                                content : [
                                    {
                                        title   : 'Telecom Lille, Université Lille 1',
                                        year    : '2015-2018',
                                        place   : 'Lille, France',
                                        details : 'Etudes en informatique, réseau, théorie du signal et économie.'
                                    },{
                                        title   : 'Lycée Berthollet, Classe Préparatoire aux Grandes Ecoles',
                                        year    : '2013 - 2015',
                                        place   : 'Annecy, France',
                                        details : 'MPSI - MP'
                                    },{
                                        title   : 'Lycée Edouard Herriot, Baccalauréat S',
                                        year    : '2013',
                                        place   : 'Voiron, France',
                                        details : 'Mention Très Bien.'
                                    }
                                ]
                            },
                            {
                                title   : 'Stages et Projets Personnels',
                                content : [
                                    {
                                        title   : 'Stage en tant que développeur Web à MyMiniFactory',
                                        year    : '2016 - 4 mois',
                                        place   : 'Londres, Angleterre',
                                        details : 'Création d\'une API REST pour une plateforme de création d\'objets 3D.<br>Amélioration de la plateforme existante avec AngularJS et Node.JS.'
                                    },{
                                        title   : 'Création et gestionnaire de Zzzelp (http://zzzelp.fr)',
                                        year    : '2013 - 2016',
                                        place   : '',
                                        details : 'Plateforme en ligne visant à améliorer l\'expérience utilisateur du jeu en ligne Fourmizzz.<br>Le site compte actuellement plus de 5 000 utilisateurs réguliers.'
                                    },{
                                        title   : 'Etude de l\'algorithme du PageRank',
                                        year    : '2015',
                                        place   : '',
                                        details : 'Etude mathématique du PageRank (algorithme historique de Google). Calcul du PageRank de Wikipédia France.'
                                    }
                                ]
                            }
                        ]
                    };
                    break;
                case 'english' :
                    $scope.html = {
                    };
                    break;
                default :
                    console.error('This language is not yet implemented');
            }
            $scope.html.skills = [
                {
                    title   : 'Front-end',
                    content : [
                        {
                            title : 'JavaScript',
                            value : 4
                        },{
                            title : 'AngularJS',
                            value : 3
                        },{
                            title : 'Jquery',
                            value : 3.5
                        },{
                            title : 'CSS',
                            value : 3.5
                        }
                    ]
                },{
                    title   : 'Back-end',
                    content : [
                        {
                            title : 'PHP',
                            value : 4
                        },{
                            title : 'Django',
                            value : 3
                        },{
                            title : 'Node.JS',
                            value : 3
                        },{
                            title : 'MySQL',
                            value : 3.5
                        }

                    ]
                }
            ];
        };


        $scope.init();

    }
]);