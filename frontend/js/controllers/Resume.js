App.controller('ResumeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    'CONFIG',
    function($scope,$rootScope,$timeout,CONFIG) {

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
                        title           : 'Curriculum Vitae',
                        skills_title    : 'Compétences',
                        sections        : [
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
                        title           : 'Resume',
                        skills_title    : 'Skills',
                        sections        : [
                            {
                                title   : 'Formation',
                                content : [
                                    {
                                        title   : 'Lille, University Lille 1',
                                        year    : '2015-2018',
                                        place   : 'Telecom Lille, France',
                                        details : 'Studies in Computer Science, Networking, Signal Theorie and Economy.'
                                    },{
                                        title   : 'Lycée Berthollet, Preparatory classes for engineering school.',
                                        year    : '2013 - 2015',
                                        place   : 'Annecy, France',
                                        details : 'MPSI - MP'
                                    },{
                                        title   : 'Lycée Edouard Herriot, secondary school',
                                        year    : '2013',
                                        place   : 'Voiron, France',
                                        details : '<i>Baccalauréat S</i>, secondary school diploma equivalent to A-levels.<br>Passed with <i>highest honors</i>.'
                                    }
                                ]
                            },
                            {
                                title   : 'Internships and Personnal Projects',
                                content : [
                                    {
                                        title   : 'Internship as web developer at MyMiniFactory',
                                        year    : '2016 - 4 months',
                                        place   : 'Londres, England',
                                        details : 'Creation of a REST API for a 3D printing online platform.<br>Improvement of the current platform with AngularJS and Node.JS'
                                    },{
                                        title   : 'Lead Developer and Manager of Zzzelp (http://zzzelp.fr)',
                                        year    : '2013 - 2016',
                                        place   : '',
                                        details : 'Online platform aiming at improving the user experience on the online game Antzzz.<br>The website is currently used by more than 5 000 regular users.'
                                    },{
                                        title   : 'Study of the PageRank algorithm',
                                        year    : '2015',
                                        place   : '',
                                        details : 'Mathematical study of the PageRank (historical algorithm of Google).<br>Computation of the PageRank for <i>Wikipedia France</i>.'
                                    }
                                ]
                            }
                        ]
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
                            value : 4.5
                        },{
                            title : 'Jquery',
                            value : 3.5
                        },{
                            title : 'CSS',
                            value : 3.5
                        },{
                            title : 'AngularJS',
                            value : 3
                        }
                    ]
                },{
                    title   : 'Back-end',
                    content : [
                        {
                            title : 'PHP',
                            value : 4
                        },{
                            title : 'MySQL',
                            value : 3.5
                        },{
                            title : 'Django',
                            value : 3
                        },{
                            title : 'Node.JS',
                            value : 3
                        }

                    ]
                }
            ];
        };

        $scope.init();


        $rootScope.$on('change_language', function(event, language) {
            $scope.set_language(language);
        });

    }
]);