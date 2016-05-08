var App = angular.module('App', ['ui.router','ngSanitize']);

App.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider
        .state ('home',{
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .state ('resume',{
            url: '/resume',
            templateUrl: 'partials/resume.html',
            controller: 'ResumeCtrl'
        })
        .state('project',{
            url: '/projects/{project}',
            templateUrl: 'partials/project.html',
            controller: 'ProjectCtrl'
        })
        .state('language',{
            url: '/language/{language}',
            templateUrl: 'partials/language.html',
            controller: 'LanguageCtrl'
        });
    }
]);

App.run([
    '$state',
    '$rootScope',
    'CONFIG',
    function($state,$rootScope,CONFIG) {
        if($state.current.url == '^') {
            $state.go('home');
        }

        localStorage.setItem('language', CONFIG.language.default);

        $rootScope.$on('change_language', function(event, language) {
           localStorage.setItem('language', language); 
        });
    }
]);

App.constant('CONFIG', {
    language : {
        default : 'french'
    },
    animation : {
        start : 1000
    },
    social : {
        github      : 'https://github.com/flaviendelangle/',
        linkedin    : 'https://fr.linkedin.com/in/flavien-delangle-7b0596105'
    }
});

App.controller('HomeCtrl', [
	function() {
		console.log('HomeCtrl');
	}
]);
App.controller('LanguageCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$stateParams',
    '$window',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$rootScope,$timeout,$stateParams,$window,CONFIG,projects,codes) {

        $scope.affiche = false;
        $scope.codes = [];
        $scope.language = $stateParams.language;

        $scope.init = function() {
            $scope.set_language(CONFIG.language.default);
            $scope.load_codes();
            $timeout(function() {
                $scope.affiche = true;
            }, CONFIG.animation.start);
        };

        $scope.set_language = function(language) {
            $scope.html = {
                language : $scope.language
            };
        };

        $scope.load_codes = function() {
            codes.get('language', $scope.language, function(code) {
                $scope.codes.push(code);
            });
        };

        $scope.init();

        $rootScope.$on('change_language', function(event, language) {
            $scope.set_language(language);
        });

    }
]);
App.controller('ProjectCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$stateParams',
    '$window',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$rootScope,$timeout,$stateParams,$window,CONFIG,projects,codes) {
        console.log($stateParams.project);
        $scope.affiche = false;
        $scope.project = projects.get_project($stateParams.project);
        $scope.codes = [];

        $scope.init = function() {
            $scope.set_language(localStorage.getItem('language'));
            $scope.load_codes();
            $timeout(function() {
                $scope.affiche = true;
            }, CONFIG.animation.start);
        };

        $scope.set_language = function(language) {
            $scope.html = $scope.project.get_html(language);
        };

        $scope.load_codes = function() {
            codes.get('project', $scope.project.name, function(code) {
                $scope.codes.push(code);
            });
        };

        $scope.init();

        $rootScope.$on('change_language', function(event, language) {
            $scope.set_language(language);
        });

    }
]);
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
App.directive("codeBlock", [
    '$window',
    '$timeout',
    '$rootScope',
    '$state',
    function($window,$timeout,$rootScope,$state) {
        return {
            restrict: 'E',
            scope : {
                code : '=code'
            },
            link: function(scope, element, attrs) {

                $timeout(function() {
                    $window.hljs.highlightBlock(element.find('code')[0]);
                },100);  

                scope.set_language = function(language) {
                    switch(language) {
                        case 'french' :
                            scope.html = {
                                title       : scope.code.title_fr,
                                description : scope.code.description_fr 
                            };
                            break;
                        case 'english' :
                            scope.html = {
                                title       : scope.code.title_en,
                                description : scope.code.description_en
                            };
                            break;
                        default :
                            console.error('This language is not yet implemented');
                    }
                    console.log(scope.html);
                };

                scope.go_project = function(project) {
                    $state.go('project', { project : project });
                };

                scope.go_language = function(language) {
                    $state.go('language', { language : language });  
                };

                scope.set_language(localStorage.getItem('language'));

                $rootScope.$on('change_language', function(event, language) {
                    scope.set_language(language);
                });
            },
            templateUrl: 'partials/code-block.html'
        };
    }
]);

App.directive("contactForm", [
    '$timeout',
    '$rootScope',
    '$http',
    'CONFIG',
    function($timeout,$rootScope,$http,CONFIG) {
        return {
            restrict: 'E',
            scope : true,
            link: function(scope, element, attrs) {

                scope.form_visibility = 0;
                scope.title_visibility = 0;
                scope.z_index_form = -1;
                scope.form = {
                    name    : '',
                    company : '',
                    email   : '',
                    message : ''
                };

                scope.show_title = function() {
                    scope.title_visibility = 1;
                };

                scope.hide_title = function() {
                    scope.title_visibility = 0;
                };

                scope.set_language = function(language) {
                    switch(language) {
                        case 'french' :
                            scope.html = {
                                title       : (~scope.z_index_form ? 'Masquer' : 'Afficher') + ' le formulaire de contact',
                                contact     : 'Me contacter',
                                send        : 'Envoyer'
                            };
                            break;
                        case 'english' :
                            scope.html = {
                                title       : scope.code.title_en,
                                contact     : 'Contact me',
                                send        : 'Send'
                            };
                            break;
                        default :
                            console.error('This language is not yet implemented');
                    }
                    console.log(scope.html);
                };


                scope.show_form = function() {
                    var mode = (scope.form_visibility + 1)%2;
                    //document.querySelector('#action_title_contact').innerHTML = mode ? 'Masquer' : 'Afficher';
                    scope.form_visibility = mode;
                    if(mode) {
                        scope.z_index_form = 20;
                        scope.set_language(localStorage.getItem('language'));
                    }
                    else {
                        $timeout(function() {
                            scope.z_index_form = -1;
                            scope.set_language(localStorage.getItem('language'));
                        }, 1000);
                    }                
                };

                scope.send = function(form) {
                    $http({
                        method  : 'POST',
                        url     : '/api/contact/new/',
                        header  : {
                            'Content-Type': 'application/json'
                        },
                        data    : form
                    }).then(function successCallback(response) {
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log(response);
                    });   
                    return false;
                };

                scope.set_language(localStorage.getItem('language'));

                $rootScope.$on('change_language', function(event, language) {
                    scope.set_language(language);
                });

            },
            templateUrl: 'partials/contact-form.html'
        };
    }
]);

App.directive("headerBar", [
	'$timeout',
	'CONFIG',
  	function($timeout,CONFIG) {
    	return {
	        restrict: 'E',
	        scope : true,
	        link: function(scope, element, attrs) {
	        	scope.affiche = false;

	        	scope.init = function() {
	        		$timeout(function() {
	        			scope.affiche = true;
	        		}, CONFIG.animation.start);
	        	};

	        	scope.init();
	       	},
	        templateUrl: 'partials/header-bar.html'
    	};
  	}
]);

App.directive("navBar", [
    '$rootScope',
    '$timeout',
    '$window',
    '$state',
    'CONFIG',
    function($rootScope,$timeout,$window,$state,CONFIG) {
        return {
            restrict: 'E',
            scope : true,
            link: function(scope, element, attrs) {
                scope.affiche = false;

                scope.init = function() {
                    scope.set_language(localStorage.getItem('language'));
                    $timeout(function() {
                        scope.affiche = true;
                    }, CONFIG.animation.start);
                };

                scope.change_language = function(language) {
                    $rootScope.$broadcast('change_language', language);
                    scope.set_language(language);
                };

                scope.set_language = function(language) {
                    switch(language) {
                        case 'french' :
                            scope.html = {
                                title           : 'Données personnelles',
                                age             : 'ans',
                                country         : '',
                                resume          : 'Curriculum Vitae',
                                projects_title  : 'Projets réalisés',
                                languages       : 'Langages maitrisés',
                                projects        : [
                                    { name : 'Stage chez MyMiniFactory', state : 'MyMiniFactory' },
                                    { name : 'Zzzelp', state : 'Zzzelp' },
                                    { name : 'TIPE : PageRank', state : 'PageRank' },
                                    { name : 'Projet ISN', state : 'ISN' }
                                ]
                            };
                            break;
                        case 'english' :
                            scope.html = {
                                title           : 'Personal data',
                                age             : 'yo',
                                country         : 'France',
                                resume          : 'Resume',
                                projects_title  : 'Projects',
                                languages       : 'Programming languages',
                                projects        : [
                                    { name : 'Internship at MyMiniFactory', state : 'MyMiniFactory' },
                                    { name : 'Zzzelp', state : 'Zzzelp' },
                                    { name : 'TIPE : PageRank', state : 'PageRank' },
                                    { name : 'ISN project', state : 'ISN' }
                                ]
                            };
                            break;
                        default :
                            console.error('This language is not yet implemented');
                    }
                };

                scope.show_resume = function() {
                    $state.go('resume');
                };

                scope.go_project = function(project) {
                    $state.go('project', { project : project });
                };

                scope.open_github = function() {
                    $window.open(CONFIG.social.github, '_blank');
                };

                scope.open_linkedin = function() {
                    $window.open(CONFIG.social.linkedin, '_blank');
                };

                scope.init();
            },
            templateUrl: 'partials/nav-bar.html'
        };
    }
]);

App.service('codes', [
    '$http',
    function($http) {

        var that = this;

        this.list = [

            // Zzzelp
            {
                title_fr        : 'Simplification des appels AJAX',
                title_en        : 'Simplification of the AJAX calls',
                description_fr  : 'Cette classe permet de simplifier les interactions entre l\'extension et le serveur en gérant par exemple automatiquement l\'authentification',
                description_en  : 'This class provide a set of tools that simplify the interactions between the extension and the server.',
                language        : 'JavaScript',
                year            : 2016,
                project         : 'Zzzelp',
                file            : 'ajax.js'
            },
            {
                title_fr        : 'Attaques optimisées sur une cible',
                title_en        : 'Optimized attacks on a target',
                description_fr  : 'Cette classe permet de simplifier les interactions entre l\'extension et le serveur en gérant par exemple automatiquement l\'authentification',
                description_en  : 'This class provide a set of tools that simplify the interactions between the extension and the server.',
                language        : 'JavaScript',
                year            : 2014,
                project         : 'Zzzelp',
                file            : 'attack_computation.js'
            },
            {
                title_fr        : 'Répartition des ressources entre les membres d\'un groupe',
                title_en        : 'Repartition of the resources between the members of a group',
                description_fr  : 'Sur Fourmizzz, les ressources sont récoltées par un nombre réduit de joueurs qui vont ensuite devoir envoyer leur surplus aux autres membres. Il est alors important d\'optimiser ces envois de ressources afin de limiter au maximum les trajets de longue durée et de maximiser les envois à moins de 30 minutes qui sont particulièrement intéressant. Zzzelp comporte plusieurs algorithme visant à optimiser cette répartition, celui présenté ci-dessous tente de prendre en compte la capacité d\'envoi de chacun.',
                description_en  : 'On Antzzz, resources are collected by a small group of players who must send some part of it to the other members. It is then very important to choose carefully who gives his resources to who. Indeed it is vital to avoid long distance shipment and to have the maximum of shipment under 30 minutes which are very interesting. Zzzelp gives access to several algorithm aiming at optimizing this repartition, the one given here tries to take into account the sending capacity of each member.',
                language        : 'PHP',
                year            : 2014,
                project         : 'Zzzelp',
                file            : 'resources_optimization.php'
            },

            // PageRank
            {
                title_fr        : 'Calcul du PageRank de Wikipédia France',
                title_en        : 'Computation of the PageRank of Wikipedia France',
                description_fr  : 'Calcul le PageRank de chaque page sur Wikipédia France',
                description_en  : 'Compute the PageRank of every Web page in Wikipédia France.',
                language        : 'Python',
                year            : 2015,
                project         : 'PageRank',
                file            : 'pagerank.py'
            },

            // MyMiniFactory
            {
                title_fr        : 'Gestion des objets coté client',
                title_en        : 'Management of the objects on the frontend',
                description_fr  : 'Version simplifiée des fonctions servant à récupérer et à mettre à jour les objets créés par l\'utilisateur.',
                description_en  : 'Simplified version of the code aiming at retrieving and storing the objects created by the user',
                language        : 'JavaScript',
                year            : 2016,
                project         : 'MyMiniFactory',
                file            : 'object_storage.js'
            }
        ];
        
        this.get = function(filter_type, value, callback) {
            var codes = that.filter(filter_type, value);
            console.log(codes);
            for(var i=0; i<codes.length; i++) {
                that.get_file_content(codes[i], callback);
            }
        };

        this.filter = function(filter_type, value) {
            return that.list.filter(function(code){
                return (code[filter_type] == value);
            });
        };

        this.get_file_content = function(code, callback) {
            $http({
                method : 'GET',
                url : '/files/' + code.file
            }).then(function successCallback(response) {
                code.content = response.data;
                callback(code);
            }, that.error);            
        };

    }
]);
App.service('projects', [
    'project_zzzelp',
    'project_pagerank',
    'project_myminifactory',
    function(project_zzzelp, project_pagerank,project_myminifactory) {

        this.get_project = function(project_str) {
            switch(project_str) {
                case 'Zzzelp' :
                    return project_zzzelp;
                case 'PageRank' :
                    return project_pagerank;
                case 'MyMiniFactory' :
                    return project_myminifactory;
                default :
                    console.error('This project doesn\'t exist');
            }           
        };
    }
]);
App.service('project_myminifactory', [
    function() {

        this.name = 'MyMiniFactory';

        this.presentation_fr =  '<p>MyMiniFactory est une entreprise proposant un ensemble de solutions en rapport avec l\'univers de l\'impression 3D. ';
        this.presentation_fr += 'J\'ai pour ma part intégré l\'équipe en charge du projet <i>WeDesign.live</i> qui a pour but de rendre la création et le ';
        this.presentation_fr += 'partage d\'objets imprimés en 3D accessible à tous. Dans le cadre de ce stage, j\'ai aidé à la réalisation d\'une API REST ';
        this.presentation_fr += 'et à son intégration dans une application web développée avec AngularJS. Une présentation plus détaillée du projet est disponible ';
        this.presentation_fr += 'dans mon <a href="/files/stage3INGE1fdelangle.pdf">rapport de stage</a>.</p>';

        this.presentation_en =  '<p>MyMiniFactory is a company offering a set of solutions in relation with the world of 3D printing. ';
        this.presentation_en += 'During my internship, I\'ve worked with the team in charge of the <i>WeDesign.live</i> project that aim at making creation and ';
        this.presentation_en += 'and sharking of 3D printable objets accessible to all. To do that, I participated to the creation of a REST API and to its intergration ';
        this.presentation_en += 'in a web application developped with AngularJS. A more detailled presentation is available in my ';
        this.presentation_en += '<a href="/files/stage3INGE1fdelangle.pdf">internship report (in french)</a>.</p>';


        this.get_html = function(language) {
            switch(language) {
                case 'french' :
                    return {
                        title           : 'Stage chez MyMiniFactory',
                        presentation    : this.presentation_fr
                    };
                case 'english' :
                    return {
                        title : 'Internship at MyMiniFactory',
                        presentation    : this.presentation_en
                    };
                default :
                    console.error('This language is not yet implemented');
            }            
        };
    }
]);
App.service('project_pagerank', [
    function() {

        this.name = 'PageRank';

        this.presentation_fr =  '<p>Dans le cadre des <i>Concours aux Grandes Ecoles</i>, j\'ai présenté l\'épreuve de <i>TIPE</i> ';
        this.presentation_fr += '(Travail d\'initiative personnelle encadré). Etant particulièrement intéressé par tout ce qui touche à Internet, ';
        this.presentation_fr += 'je me suis orienté vers un sujet traitant des moteurs de recherche.</p>';
        this.presentation_fr += '<p>Ce projet m\'a permit mettre en relation mes connaissances informatiques et une partie de ce ';
        this.presentation_fr += 'que j\'avais appris en Mathématiques pendant mes deux années de Classe Préparatoire.';
        this.presentation_fr += '<ul><li><a target="_BLANK" href="https://docs.google.com/document/d/13uvqbV9SPfbMD30CcD19Da5LzvwRChDKyoR-8aGVwQ0/edit?usp=sharing">';
        this.presentation_fr += 'Support de présentation orale</a></li>';
        this.presentation_fr += '<li><a href="http://zzzelp.fr/Examples/PageRank.py">Sources complètes</a></li></ul>';

		this.presentation_en = '<p>During the examinations leading to my engineer school, I had to achieve a project in a science subject. ';
		this.presentation_en += 'Beeing fascinated by everything arround the Internet, ';
		this.presentation_en += 'I decided to do something related to search engines.</p>';
		this.presentation_en += '<p>This project helped me to understand how Mathematics (more precisely Algebra) can be useful in Computer Science.</p>';
		this.presentation_en += '<ul><li><a target="_BLANK" href="https://docs.google.com/document/d/13uvqbV9SPfbMD30CcD19Da5LzvwRChDKyoR-8aGVwQ0/edit?usp=sharing">';
		this.presentation_en += 'Oral medium of presentation (in french)</a></li>';
		this.presentation_en += '<li><a href="http://zzzelp.fr/Examples/PageRank.py">Complete source code</a></li></ul>';

        this.get_html = function(language) {
            switch(language) {
                case 'french' :
                    return {
                        title           : 'PageRank',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL0hvbWUuanMiLCJjb250cm9sbGVycy9MYW5ndWFnZS5qcyIsImNvbnRyb2xsZXJzL1Byb2plY3QuanMiLCJjb250cm9sbGVycy9SZXN1bWUuanMiLCJkaXJlY3RpdmVzL2NvZGUtYmxvY2suanMiLCJkaXJlY3RpdmVzL2NvbnRhY3QtZm9ybS5qcyIsImRpcmVjdGl2ZXMvaGVhZGVyLWJhci5qcyIsImRpcmVjdGl2ZXMvbmF2LWJhci5qcyIsInNlcnZpY2VzL2NvZGVzLmpzIiwic2VydmljZXMvcHJvamVjdHMuanMiLCJzZXJ2aWNlcy9wcm9qZWN0X215bWluaWZhY3RvcnkuanMiLCJzZXJ2aWNlcy9wcm9qZWN0X3BhZ2VyYW5rLmpzIiwic2VydmljZXMvcHJvamVjdF96enplbHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBLFFBQUEsT0FBQSxPQUFBLENBQUEsWUFBQTs7QUFFQSxJQUFBLE9BQUE7SUFDQTtJQUNBLFNBQUEsZ0JBQUE7UUFDQTtTQUNBLE9BQUEsT0FBQTtZQUNBLEtBQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7U0FFQSxPQUFBLFNBQUE7WUFDQSxLQUFBO1lBQ0EsYUFBQTtZQUNBLFlBQUE7O1NBRUEsTUFBQSxVQUFBO1lBQ0EsS0FBQTtZQUNBLGFBQUE7WUFDQSxZQUFBOztTQUVBLE1BQUEsV0FBQTtZQUNBLEtBQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7Ozs7QUFLQSxJQUFBLElBQUE7SUFDQTtJQUNBO0lBQ0E7SUFDQSxTQUFBLE9BQUEsV0FBQSxRQUFBO1FBQ0EsR0FBQSxPQUFBLFFBQUEsT0FBQSxLQUFBO1lBQ0EsT0FBQSxHQUFBOzs7UUFHQSxhQUFBLFFBQUEsWUFBQSxPQUFBLFNBQUE7O1FBRUEsV0FBQSxJQUFBLG1CQUFBLFNBQUEsT0FBQSxVQUFBO1dBQ0EsYUFBQSxRQUFBLFlBQUE7Ozs7O0FBS0EsSUFBQSxTQUFBLFVBQUE7SUFDQSxXQUFBO1FBQ0EsVUFBQTs7SUFFQSxZQUFBO1FBQ0EsUUFBQTs7SUFFQSxTQUFBO1FBQ0EsY0FBQTtRQUNBLGNBQUE7Ozs7QUN2REEsSUFBQSxXQUFBLFlBQUE7Q0FDQSxXQUFBO0VBQ0EsUUFBQSxJQUFBOzs7QUNGQSxJQUFBLFdBQUEsZ0JBQUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsU0FBQSxPQUFBLFdBQUEsU0FBQSxhQUFBLFFBQUEsT0FBQSxTQUFBLE9BQUE7O1FBRUEsT0FBQSxVQUFBO1FBQ0EsT0FBQSxRQUFBO1FBQ0EsT0FBQSxXQUFBLGFBQUE7O1FBRUEsT0FBQSxPQUFBLFdBQUE7WUFDQSxPQUFBLGFBQUEsT0FBQSxTQUFBO1lBQ0EsT0FBQTtZQUNBLFNBQUEsV0FBQTtnQkFDQSxPQUFBLFVBQUE7ZUFDQSxPQUFBLFVBQUE7OztRQUdBLE9BQUEsZUFBQSxTQUFBLFVBQUE7WUFDQSxPQUFBLE9BQUE7Z0JBQ0EsV0FBQSxPQUFBOzs7O1FBSUEsT0FBQSxhQUFBLFdBQUE7WUFDQSxNQUFBLElBQUEsWUFBQSxPQUFBLFVBQUEsU0FBQSxNQUFBO2dCQUNBLE9BQUEsTUFBQSxLQUFBOzs7O1FBSUEsT0FBQTs7UUFFQSxXQUFBLElBQUEsbUJBQUEsU0FBQSxPQUFBLFVBQUE7WUFDQSxPQUFBLGFBQUE7Ozs7O0FDdENBLElBQUEsV0FBQSxlQUFBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFNBQUEsT0FBQSxXQUFBLFNBQUEsYUFBQSxRQUFBLE9BQUEsU0FBQSxPQUFBO1FBQ0EsUUFBQSxJQUFBLGFBQUE7UUFDQSxPQUFBLFVBQUE7UUFDQSxPQUFBLFVBQUEsU0FBQSxZQUFBLGFBQUE7UUFDQSxPQUFBLFFBQUE7O1FBRUEsT0FBQSxPQUFBLFdBQUE7WUFDQSxPQUFBLGFBQUEsYUFBQSxRQUFBO1lBQ0EsT0FBQTtZQUNBLFNBQUEsV0FBQTtnQkFDQSxPQUFBLFVBQUE7ZUFDQSxPQUFBLFVBQUE7OztRQUdBLE9BQUEsZUFBQSxTQUFBLFVBQUE7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R0EsTUFBQSxhQUFBLFNBQUEsU0FBQTtvQkFDQSxPQUFBLEdBQUEsV0FBQSxFQUFBLFVBQUE7OztnQkFHQSxNQUFBLGNBQUEsV0FBQTtvQkFDQSxRQUFBLEtBQUEsT0FBQSxPQUFBLFFBQUE7OztnQkFHQSxNQUFBLGdCQUFBLFdBQUE7b0JBQ0EsUUFBQSxLQUFBLE9BQUEsT0FBQSxVQUFBOzs7Z0JBR0EsTUFBQTs7WUFFQSxhQUFBOzs7OztBQ2xGQSxJQUFBLFFBQUEsU0FBQTtJQUNBO0lBQ0EsU0FBQSxPQUFBOztRQUVBLElBQUEsT0FBQTs7UUFFQSxLQUFBLE9BQUE7OztZQUdBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBOztZQUVBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBOztZQUVBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBO2dCQUNBLGtCQUFBOzs7O1lBSUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Z0JBQ0Esa0JBQUE7Ozs7WUFJQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTtnQkFDQSxrQkFBQTs7OztRQUlBLEtBQUEsTUFBQSxTQUFBLGFBQUEsT0FBQSxVQUFBO1lBQ0EsSUFBQSxRQUFBLEtBQUEsT0FBQSxhQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsSUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsUUFB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bW9kdWxlKCdBcHAnLCBbJ3VpLnJvdXRlcicsJ25nU2FuaXRpemUnXSk7XHJcblxyXG5BcHAuY29uZmlnKFtcclxuICAgICckc3RhdGVQcm92aWRlcicsXHJcbiAgICBmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlICgnaG9tZScse1xyXG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlICgncmVzdW1lJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3Jlc3VtZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Jlc3VtZUN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2plY3QnLHtcclxuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL3twcm9qZWN0fScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcHJvamVjdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdsYW5ndWFnZScse1xyXG4gICAgICAgICAgICB1cmw6ICcvbGFuZ3VhZ2Uve2xhbmd1YWdlfScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbGFuZ3VhZ2UuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMYW5ndWFnZUN0cmwnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbl0pO1xyXG5cclxuQXBwLnJ1bihbXHJcbiAgICAnJHN0YXRlJyxcclxuICAgICckcm9vdFNjb3BlJyxcclxuICAgICdDT05GSUcnLFxyXG4gICAgZnVuY3Rpb24oJHN0YXRlLCRyb290U2NvcGUsQ09ORklHKSB7XHJcbiAgICAgICAgaWYoJHN0YXRlLmN1cnJlbnQudXJsID09ICdeJykge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5ndWFnZScsIENPTkZJRy5sYW5ndWFnZS5kZWZhdWx0KTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ2NoYW5nZV9sYW5ndWFnZScsIGZ1bmN0aW9uKGV2ZW50LCBsYW5ndWFnZSkge1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5ndWFnZScsIGxhbmd1YWdlKTsgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbl0pO1xyXG5cclxuQXBwLmNvbnN0YW50KCdDT05GSUcnLCB7XHJcbiAgICBsYW5ndWFnZSA6IHtcclxuICAgICAgICBkZWZhdWx0IDogJ2ZyZW5jaCdcclxuICAgIH0sXHJcbiAgICBhbmltYXRpb24gOiB7XHJcbiAgICAgICAgc3RhcnQgOiAxMDAwXHJcbiAgICB9LFxyXG4gICAgc29jaWFsIDoge1xyXG4gICAgICAgIGdpdGh1YiAgICAgIDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9mbGF2aWVuZGVsYW5nbGUvJyxcclxuICAgICAgICBsaW5rZWRpbiAgICA6ICdodHRwczovL2ZyLmxpbmtlZGluLmNvbS9pbi9mbGF2aWVuLWRlbGFuZ2xlLTdiMDU5NjEwNSdcclxuICAgIH1cclxufSk7XHJcbiIsIkFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIFtcclxuXHRmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdIb21lQ3RybCcpO1xyXG5cdH1cclxuXSk7IiwiQXBwLmNvbnRyb2xsZXIoJ0xhbmd1YWdlQ3RybCcsIFtcclxuICAgICckc2NvcGUnLFxyXG4gICAgJyRyb290U2NvcGUnLFxyXG4gICAgJyR0aW1lb3V0JyxcclxuICAgICckc3RhdGVQYXJhbXMnLFxyXG4gICAgJyR3aW5kb3cnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICAncHJvamVjdHMnLFxyXG4gICAgJ2NvZGVzJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlLCR0aW1lb3V0LCRzdGF0ZVBhcmFtcywkd2luZG93LENPTkZJRyxwcm9qZWN0cyxjb2Rlcykge1xyXG5cclxuICAgICAgICAkc2NvcGUuYWZmaWNoZSA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5jb2RlcyA9IFtdO1xyXG4gICAgICAgICRzY29wZS5sYW5ndWFnZSA9ICRzdGF0ZVBhcmFtcy5sYW5ndWFnZTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldF9sYW5ndWFnZShDT05GSUcubGFuZ3VhZ2UuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgICRzY29wZS5sb2FkX2NvZGVzKCk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmFmZmljaGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCBDT05GSUcuYW5pbWF0aW9uLnN0YXJ0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0X2xhbmd1YWdlID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA6ICRzY29wZS5sYW5ndWFnZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5sb2FkX2NvZGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvZGVzLmdldCgnbGFuZ3VhZ2UnLCAkc2NvcGUubGFuZ3VhZ2UsIGZ1bmN0aW9uKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignY2hhbmdlX2xhbmd1YWdlJywgZnVuY3Rpb24oZXZlbnQsIGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXSk7IiwiQXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RDdHJsJywgW1xyXG4gICAgJyRzY29wZScsXHJcbiAgICAnJHJvb3RTY29wZScsXHJcbiAgICAnJHRpbWVvdXQnLFxyXG4gICAgJyRzdGF0ZVBhcmFtcycsXHJcbiAgICAnJHdpbmRvdycsXHJcbiAgICAnQ09ORklHJyxcclxuICAgICdwcm9qZWN0cycsXHJcbiAgICAnY29kZXMnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCRyb290U2NvcGUsJHRpbWVvdXQsJHN0YXRlUGFyYW1zLCR3aW5kb3csQ09ORklHLHByb2plY3RzLGNvZGVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLnByb2plY3QpO1xyXG4gICAgICAgICRzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLnByb2plY3QgPSBwcm9qZWN0cy5nZXRfcHJvamVjdCgkc3RhdGVQYXJhbXMucHJvamVjdCk7XHJcbiAgICAgICAgJHNjb3BlLmNvZGVzID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykpO1xyXG4gICAgICAgICAgICAkc2NvcGUubG9hZF9jb2RlcygpO1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hZmZpY2hlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgQ09ORklHLmFuaW1hdGlvbi5zdGFydCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldF9sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5odG1sID0gJHNjb3BlLnByb2plY3QuZ2V0X2h0bWwobGFuZ3VhZ2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5sb2FkX2NvZGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvZGVzLmdldCgncHJvamVjdCcsICRzY29wZS5wcm9qZWN0Lm5hbWUsIGZ1bmN0aW9uKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jb2Rlcy5wdXNoKGNvZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignY2hhbmdlX2xhbmd1YWdlJywgZnVuY3Rpb24oZXZlbnQsIGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXSk7IiwiQXBwLmNvbnRyb2xsZXIoJ1Jlc3VtZUN0cmwnLCBbXHJcbiAgICAnJHNjb3BlJyxcclxuICAgICckcm9vdFNjb3BlJyxcclxuICAgICckdGltZW91dCcsXHJcbiAgICAnQ09ORklHJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlLCR0aW1lb3V0LENPTkZJRykge1xyXG5cclxuICAgICAgICAkc2NvcGUuYWZmaWNoZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0X2xhbmd1YWdlKENPTkZJRy5sYW5ndWFnZS5kZWZhdWx0KTtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWZmaWNoZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIENPTkZJRy5hbmltYXRpb24uc3RhcnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZyZW5jaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5odG1sID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnQ3VycmljdWx1bSBWaXRhZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsc190aXRsZSAgICA6ICdDb21ww6l0ZW5jZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9ucyAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdGb3JtYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnVGVsZWNvbSBMaWxsZSwgVW5pdmVyc2l0w6kgTGlsbGUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTUtMjAxOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJ0xpbGxlLCBGcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA6ICdFdHVkZXMgZW4gaW5mb3JtYXRpcXVlLCByw6lzZWF1LCB0aMOpb3JpZSBkdSBzaWduYWwgZXQgw6ljb25vbWllLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0x5Y8OpZSBCZXJ0aG9sbGV0LCBDbGFzc2UgUHLDqXBhcmF0b2lyZSBhdXggR3JhbmRlcyBFY29sZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDEzIC0gMjAxNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJ0FubmVjeSwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnTVBTSSAtIE1QJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnTHljw6llIEVkb3VhcmQgSGVycmlvdCwgQmFjY2FsYXVyw6lhdCBTJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxMycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJ1ZvaXJvbiwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnTWVudGlvbiBUcsOocyBCaWVuLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdTdGFnZXMgZXQgUHJvamV0cyBQZXJzb25uZWxzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ1N0YWdlIGVuIHRhbnQgcXVlIGTDqXZlbG9wcGV1ciBXZWIgw6AgTXlNaW5pRmFjdG9yeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTYgLSA0IG1vaXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdMb25kcmVzLCBBbmdsZXRlcnJlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnQ3LDqWF0aW9uIGRcXCd1bmUgQVBJIFJFU1QgcG91ciB1bmUgcGxhdGVmb3JtZSBkZSBjcsOpYXRpb24gZFxcJ29iamV0cyAzRC48YnI+QW3DqWxpb3JhdGlvbiBkZSBsYSBwbGF0ZWZvcm1lIGV4aXN0YW50ZSBhdmVjIEFuZ3VsYXJKUyBldCBOb2RlLkpTLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0Nyw6lhdGlvbiBldCBnZXN0aW9ubmFpcmUgZGUgWnp6ZWxwIChodHRwOi8venp6ZWxwLmZyKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTMgLSAyMDE2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnUGxhdGVmb3JtZSBlbiBsaWduZSB2aXNhbnQgw6AgYW3DqWxpb3JlciBsXFwnZXhww6lyaWVuY2UgdXRpbGlzYXRldXIgZHUgamV1IGVuIGxpZ25lIEZvdXJtaXp6ei48YnI+TGUgc2l0ZSBjb21wdGUgYWN0dWVsbGVtZW50IHBsdXMgZGUgNSAwMDAgdXRpbGlzYXRldXJzIHLDqWd1bGllcnMuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRXR1ZGUgZGUgbFxcJ2FsZ29yaXRobWUgZHUgUGFnZVJhbmsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE1JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnRXR1ZGUgbWF0aMOpbWF0aXF1ZSBkdSBQYWdlUmFuayAoYWxnb3JpdGhtZSBoaXN0b3JpcXVlIGRlIEdvb2dsZSkuIENhbGN1bCBkdSBQYWdlUmFuayBkZSBXaWtpcMOpZGlhIEZyYW5jZS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5nbGlzaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5odG1sID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnUmVzdW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzX3RpdGxlICAgIDogJ1NraWxscycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25zICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0Zvcm1hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMaWxsZSwgVW5pdmVyc2l0eSBMaWxsZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxNS0yMDE4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnVGVsZWNvbSBMaWxsZSwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnU3R1ZGllcyBpbiBDb21wdXRlciBTY2llbmNlLCBOZXR3b3JraW5nLCBTaWduYWwgVGhlb3JpZSBhbmQgRWNvbm9teS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMeWPDqWUgQmVydGhvbGxldCwgUHJlcGFyYXRvcnkgY2xhc3NlcyBmb3IgZW5naW5lZXJpbmcgc2Nob29sLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTMgLSAyMDE1JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnQW5uZWN5LCBGcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA6ICdNUFNJIC0gTVAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMeWPDqWUgRWRvdWFyZCBIZXJyaW90LCBzZWNvbmRhcnkgc2Nob29sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxMycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJ1ZvaXJvbiwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnPGk+QmFjY2FsYXVyw6lhdCBTPC9pPiwgc2Vjb25kYXJ5IHNjaG9vbCBkaXBsb21hIGVxdWl2YWxlbnQgdG8gQS1sZXZlbHMuPGJyPlBhc3NlZCB3aXRoIDxpPmhpZ2hlc3QgaG9ub3JzPC9pPi4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnSW50ZXJuc2hpcHMgYW5kIFBlcnNvbm5hbCBQcm9qZWN0cycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdJbnRlcm5zaGlwIGFzIHdlYiBkZXZlbG9wZXIgYXQgTXlNaW5pRmFjdG9yeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTYgLSA0IG1vbnRocycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJ0xvbmRyZXMsIEVuZ2xhbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA6ICdDcmVhdGlvbiBvZiBhIFJFU1QgQVBJIGZvciBhIDNEIHByaW50aW5nIG9ubGluZSBwbGF0Zm9ybS48YnI+SW1wcm92ZW1lbnQgb2YgdGhlIGN1cnJlbnQgcGxhdGZvcm0gd2l0aCBBbmd1bGFySlMgYW5kIE5vZGUuSlMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMZWFkIERldmVsb3BlciBhbmQgTWFuYWdlciBvZiBaenplbHAgKGh0dHA6Ly96enplbHAuZnIpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxMyAtIDIwMTYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlscyA6ICdPbmxpbmUgcGxhdGZvcm0gYWltaW5nIGF0IGltcHJvdmluZyB0aGUgdXNlciBleHBlcmllbmNlIG9uIHRoZSBvbmxpbmUgZ2FtZSBBbnR6enouPGJyPlRoZSB3ZWJzaXRlIGlzIGN1cnJlbnRseSB1c2VkIGJ5IG1vcmUgdGhhbiA1IDAwMCByZWd1bGFyIHVzZXJzLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ1N0dWR5IG9mIHRoZSBQYWdlUmFuayBhbGdvcml0aG0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE1JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnTWF0aGVtYXRpY2FsIHN0dWR5IG9mIHRoZSBQYWdlUmFuayAoaGlzdG9yaWNhbCBhbGdvcml0aG0gb2YgR29vZ2xlKS48YnI+Q29tcHV0YXRpb24gb2YgdGhlIFBhZ2VSYW5rIGZvciA8aT5XaWtpcGVkaWEgRnJhbmNlPC9pPi4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhpcyBsYW5ndWFnZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLmh0bWwuc2tpbGxzID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRnJvbnQtZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdKYXZhU2NyaXB0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogNC41XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnSnF1ZXJ5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogMy41XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnQ1NTJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogMy41XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnQW5ndWxhckpTJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdCYWNrLWVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnUEhQJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ015U1FMJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogMy41XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnRGphbmdvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ05vZGUuSlMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5pbml0KCk7XHJcblxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignY2hhbmdlX2xhbmd1YWdlJywgZnVuY3Rpb24oZXZlbnQsIGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXSk7IiwiQXBwLmRpcmVjdGl2ZShcImNvZGVCbG9ja1wiLCBbXHJcbiAgICAnJHdpbmRvdycsXHJcbiAgICAnJHRpbWVvdXQnLFxyXG4gICAgJyRyb290U2NvcGUnLFxyXG4gICAgJyRzdGF0ZScsXHJcbiAgICBmdW5jdGlvbigkd2luZG93LCR0aW1lb3V0LCRyb290U2NvcGUsJHN0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGUgOiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlIDogJz1jb2RlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkd2luZG93LmhsanMuaGlnaGxpZ2h0QmxvY2soZWxlbWVudC5maW5kKCdjb2RlJylbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSwxMDApOyAgXHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuc2V0X2xhbmd1YWdlID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2gobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZnJlbmNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5odG1sID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgICAgIDogc2NvcGUuY29kZS50aXRsZV9mcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA6IHNjb3BlLmNvZGUuZGVzY3JpcHRpb25fZnIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgOiBzY29wZS5jb2RlLnRpdGxlX2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogc2NvcGUuY29kZS5kZXNjcmlwdGlvbl9lblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZS5odG1sKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuZ29fcHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Byb2plY3QnLCB7IHByb2plY3QgOiBwcm9qZWN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5nb19sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsYW5ndWFnZScsIHsgbGFuZ3VhZ2UgOiBsYW5ndWFnZSB9KTsgIFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdjaGFuZ2VfbGFuZ3VhZ2UnLCBmdW5jdGlvbihldmVudCwgbGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvY29kZS1ibG9jay5odG1sJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0pO1xyXG4iLCJBcHAuZGlyZWN0aXZlKFwiY29udGFjdEZvcm1cIiwgW1xyXG4gICAgJyR0aW1lb3V0JyxcclxuICAgICckcm9vdFNjb3BlJyxcclxuICAgICckaHR0cCcsXHJcbiAgICAnQ09ORklHJyxcclxuICAgIGZ1bmN0aW9uKCR0aW1lb3V0LCRyb290U2NvcGUsJGh0dHAsQ09ORklHKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5mb3JtX3Zpc2liaWxpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUudGl0bGVfdmlzaWJpbGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBzY29wZS56X2luZGV4X2Zvcm0gPSAtMTtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmZvcm0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSAgICA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbCAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA6ICcnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNob3dfdGl0bGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS50aXRsZV92aXNpYmlsaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuaGlkZV90aXRsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnRpdGxlX3Zpc2liaWxpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmcmVuY2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgOiAofnNjb3BlLnpfaW5kZXhfZm9ybSA/ICdNYXNxdWVyJyA6ICdBZmZpY2hlcicpICsgJyBsZSBmb3JtdWxhaXJlIGRlIGNvbnRhY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3QgICAgIDogJ01lIGNvbnRhY3RlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZCAgICAgICAgOiAnRW52b3llcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5nbGlzaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaHRtbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICA6IHNjb3BlLmNvZGUudGl0bGVfZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdCAgICAgOiAnQ29udGFjdCBtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZCAgICAgICAgOiAnU2VuZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGlzIGxhbmd1YWdlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2NvcGUuaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zaG93X2Zvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZSA9IChzY29wZS5mb3JtX3Zpc2liaWxpdHkgKyAxKSUyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGlvbl90aXRsZV9jb250YWN0JykuaW5uZXJIVE1MID0gbW9kZSA/ICdNYXNxdWVyJyA6ICdBZmZpY2hlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuZm9ybV92aXNpYmlsaXR5ID0gbW9kZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnpfaW5kZXhfZm9ybSA9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS56X2luZGV4X2Zvcm0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNlbmQgPSBmdW5jdGlvbihmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QgIDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgICAgIDogJy9hcGkvY29udGFjdC9uZXcvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSAgICA6IGZvcm1cclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3NDYWxsYmFjayhyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gZXJyb3JDYWxsYmFjayhyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdjaGFuZ2VfbGFuZ3VhZ2UnLCBmdW5jdGlvbihldmVudCwgbGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2NvbnRhY3QtZm9ybS5odG1sJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0pO1xyXG4iLCJBcHAuZGlyZWN0aXZlKFwiaGVhZGVyQmFyXCIsIFtcclxuXHQnJHRpbWVvdXQnLFxyXG5cdCdDT05GSUcnLFxyXG4gIFx0ZnVuY3Rpb24oJHRpbWVvdXQsQ09ORklHKSB7XHJcbiAgICBcdHJldHVybiB7XHJcblx0ICAgICAgICByZXN0cmljdDogJ0UnLFxyXG5cdCAgICAgICAgc2NvcGUgOiB0cnVlLFxyXG5cdCAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblx0ICAgICAgICBcdHNjb3BlLmFmZmljaGUgPSBmYWxzZTtcclxuXHJcblx0ICAgICAgICBcdHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHQgICAgICAgIFx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcclxuXHQgICAgICAgIFx0XHRcdHNjb3BlLmFmZmljaGUgPSB0cnVlO1xyXG5cdCAgICAgICAgXHRcdH0sIENPTkZJRy5hbmltYXRpb24uc3RhcnQpO1xyXG5cdCAgICAgICAgXHR9O1xyXG5cclxuXHQgICAgICAgIFx0c2NvcGUuaW5pdCgpO1xyXG5cdCAgICAgICBcdH0sXHJcblx0ICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2hlYWRlci1iYXIuaHRtbCdcclxuICAgIFx0fTtcclxuICBcdH1cclxuXSk7XHJcbiIsIkFwcC5kaXJlY3RpdmUoXCJuYXZCYXJcIiwgW1xyXG4gICAgJyRyb290U2NvcGUnLFxyXG4gICAgJyR0aW1lb3V0JyxcclxuICAgICckd2luZG93JyxcclxuICAgICckc3RhdGUnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICBmdW5jdGlvbigkcm9vdFNjb3BlLCR0aW1lb3V0LCR3aW5kb3csJHN0YXRlLENPTkZJRykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmFmZmljaGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIENPTkZJRy5hbmltYXRpb24uc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5jaGFuZ2VfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlX2xhbmd1YWdlJywgbGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZShsYW5ndWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZyZW5jaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaHRtbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnRG9ubsOpZXMgcGVyc29ubmVsbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2UgICAgICAgICAgICAgOiAnYW5zJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICAgICAgICAgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bWUgICAgICAgICAgOiAnQ3VycmljdWx1bSBWaXRhZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdHNfdGl0bGUgIDogJ1Byb2pldHMgcsOpYWxpc8OpcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VzICAgICAgIDogJ0xhbmdhZ2VzIG1haXRyaXPDqXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lIDogJ1N0YWdlIGNoZXogTXlNaW5pRmFjdG9yeScsIHN0YXRlIDogJ015TWluaUZhY3RvcnknIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZSA6ICdaenplbHAnLCBzdGF0ZSA6ICdaenplbHAnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZSA6ICdUSVBFIDogUGFnZVJhbmsnLCBzdGF0ZSA6ICdQYWdlUmFuaycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lIDogJ1Byb2pldCBJU04nLCBzdGF0ZSA6ICdJU04nIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgICAgIDogJ1BlcnNvbmFsIGRhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZSAgICAgICAgICAgICA6ICd5bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSAgICAgICAgIDogJ0ZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdW1lICAgICAgICAgIDogJ1Jlc3VtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdHNfdGl0bGUgIDogJ1Byb2plY3RzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZXMgICAgICAgOiAnUHJvZ3JhbW1pbmcgbGFuZ3VhZ2VzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0cyAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZSA6ICdJbnRlcm5zaGlwIGF0IE15TWluaUZhY3RvcnknLCBzdGF0ZSA6ICdNeU1pbmlGYWN0b3J5JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWUgOiAnWnp6ZWxwJywgc3RhdGUgOiAnWnp6ZWxwJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWUgOiAnVElQRSA6IFBhZ2VSYW5rJywgc3RhdGUgOiAnUGFnZVJhbmsnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZSA6ICdJU04gcHJvamVjdCcsIHN0YXRlIDogJ0lTTicgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGlzIGxhbmd1YWdlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNob3dfcmVzdW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdyZXN1bWUnKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuZ29fcHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Byb2plY3QnLCB7IHByb2plY3QgOiBwcm9qZWN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5vcGVuX2dpdGh1YiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cub3BlbihDT05GSUcuc29jaWFsLmdpdGh1YiwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5vcGVuX2xpbmtlZGluID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHdpbmRvdy5vcGVuKENPTkZJRy5zb2NpYWwubGlua2VkaW4sICdfYmxhbmsnKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuaW5pdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL25hdi1iYXIuaHRtbCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5dKTtcclxuIiwiQXBwLnNlcnZpY2UoJ2NvZGVzJywgW1xyXG4gICAgJyRodHRwJyxcclxuICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW1xyXG5cclxuICAgICAgICAgICAgLy8gWnp6ZWxwXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlX2ZyICAgICAgICA6ICdTaW1wbGlmaWNhdGlvbiBkZXMgYXBwZWxzIEFKQVgnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGVfZW4gICAgICAgIDogJ1NpbXBsaWZpY2F0aW9uIG9mIHRoZSBBSkFYIGNhbGxzJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uX2ZyICA6ICdDZXR0ZSBjbGFzc2UgcGVybWV0IGRlIHNpbXBsaWZpZXIgbGVzIGludGVyYWN0aW9ucyBlbnRyZSBsXFwnZXh0ZW5zaW9uIGV0IGxlIHNlcnZldXIgZW4gZ8OpcmFudCBwYXIgZXhlbXBsZSBhdXRvbWF0aXF1ZW1lbnQgbFxcJ2F1dGhlbnRpZmljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25fZW4gIDogJ1RoaXMgY2xhc3MgcHJvdmlkZSBhIHNldCBvZiB0b29scyB0aGF0IHNpbXBsaWZ5IHRoZSBpbnRlcmFjdGlvbnMgYmV0d2VlbiB0aGUgZXh0ZW5zaW9uIGFuZCB0aGUgc2VydmVyLicsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSAgICAgICAgOiAnSmF2YVNjcmlwdCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyICAgICAgICAgICAgOiAyMDE2LFxyXG4gICAgICAgICAgICAgICAgcHJvamVjdCAgICAgICAgIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICBmaWxlICAgICAgICAgICAgOiAnYWpheC5qcydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGVfZnIgICAgICAgIDogJ0F0dGFxdWVzIG9wdGltaXPDqWVzIHN1ciB1bmUgY2libGUnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGVfZW4gICAgICAgIDogJ09wdGltaXplZCBhdHRhY2tzIG9uIGEgdGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uX2ZyICA6ICdDZXR0ZSBjbGFzc2UgcGVybWV0IGRlIHNpbXBsaWZpZXIgbGVzIGludGVyYWN0aW9ucyBlbnRyZSBsXFwnZXh0ZW5zaW9uIGV0IGxlIHNlcnZldXIgZW4gZ8OpcmFudCBwYXIgZXhlbXBsZSBhdXRvbWF0aXF1ZW1lbnQgbFxcJ2F1dGhlbnRpZmljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25fZW4gIDogJ1RoaXMgY2xhc3MgcHJvdmlkZSBhIHNldCBvZiB0b29scyB0aGF0IHNpbXBsaWZ5IHRoZSBpbnRlcmFjdGlvbnMgYmV0d2VlbiB0aGUgZXh0ZW5zaW9uIGFuZCB0aGUgc2VydmVyLicsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSAgICAgICAgOiAnSmF2YVNjcmlwdCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyICAgICAgICAgICAgOiAyMDE0LFxyXG4gICAgICAgICAgICAgICAgcHJvamVjdCAgICAgICAgIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICBmaWxlICAgICAgICAgICAgOiAnYXR0YWNrX2NvbXB1dGF0aW9uLmpzJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZV9mciAgICAgICAgOiAnUsOpcGFydGl0aW9uIGRlcyByZXNzb3VyY2VzIGVudHJlIGxlcyBtZW1icmVzIGRcXCd1biBncm91cGUnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGVfZW4gICAgICAgIDogJ1JlcGFydGl0aW9uIG9mIHRoZSByZXNvdXJjZXMgYmV0d2VlbiB0aGUgbWVtYmVycyBvZiBhIGdyb3VwJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uX2ZyICA6ICdTdXIgRm91cm1penp6LCBsZXMgcmVzc291cmNlcyBzb250IHLDqWNvbHTDqWVzIHBhciB1biBub21icmUgcsOpZHVpdCBkZSBqb3VldXJzIHF1aSB2b250IGVuc3VpdGUgZGV2b2lyIGVudm95ZXIgbGV1ciBzdXJwbHVzIGF1eCBhdXRyZXMgbWVtYnJlcy4gSWwgZXN0IGFsb3JzIGltcG9ydGFudCBkXFwnb3B0aW1pc2VyIGNlcyBlbnZvaXMgZGUgcmVzc291cmNlcyBhZmluIGRlIGxpbWl0ZXIgYXUgbWF4aW11bSBsZXMgdHJhamV0cyBkZSBsb25ndWUgZHVyw6llIGV0IGRlIG1heGltaXNlciBsZXMgZW52b2lzIMOgIG1vaW5zIGRlIDMwIG1pbnV0ZXMgcXVpIHNvbnQgcGFydGljdWxpw6hyZW1lbnQgaW50w6lyZXNzYW50LiBaenplbHAgY29tcG9ydGUgcGx1c2lldXJzIGFsZ29yaXRobWUgdmlzYW50IMOgIG9wdGltaXNlciBjZXR0ZSByw6lwYXJ0aXRpb24sIGNlbHVpIHByw6lzZW50w6kgY2ktZGVzc291cyB0ZW50ZSBkZSBwcmVuZHJlIGVuIGNvbXB0ZSBsYSBjYXBhY2l0w6kgZFxcJ2Vudm9pIGRlIGNoYWN1bi4nLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25fZW4gIDogJ09uIEFudHp6eiwgcmVzb3VyY2VzIGFyZSBjb2xsZWN0ZWQgYnkgYSBzbWFsbCBncm91cCBvZiBwbGF5ZXJzIHdobyBtdXN0IHNlbmQgc29tZSBwYXJ0IG9mIGl0IHRvIHRoZSBvdGhlciBtZW1iZXJzLiBJdCBpcyB0aGVuIHZlcnkgaW1wb3J0YW50IHRvIGNob29zZSBjYXJlZnVsbHkgd2hvIGdpdmVzIGhpcyByZXNvdXJjZXMgdG8gd2hvLiBJbmRlZWQgaXQgaXMgdml0YWwgdG8gYXZvaWQgbG9uZyBkaXN0YW5jZSBzaGlwbWVudCBhbmQgdG8gaGF2ZSB0aGUgbWF4aW11bSBvZiBzaGlwbWVudCB1bmRlciAzMCBtaW51dGVzIHdoaWNoIGFyZSB2ZXJ5IGludGVyZXN0aW5nLiBaenplbHAgZ2l2ZXMgYWNjZXNzIHRvIHNldmVyYWwgYWxnb3JpdGhtIGFpbWluZyBhdCBvcHRpbWl6aW5nIHRoaXMgcmVwYXJ0aXRpb24sIHRoZSBvbmUgZ2l2ZW4gaGVyZSB0cmllcyB0byB0YWtlIGludG8gYWNjb3VudCB0aGUgc2VuZGluZyBjYXBhY2l0eSBvZiBlYWNoIG1lbWJlci4nLFxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgICAgICAgIDogJ1BIUCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyICAgICAgICAgICAgOiAyMDE0LFxyXG4gICAgICAgICAgICAgICAgcHJvamVjdCAgICAgICAgIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICBmaWxlICAgICAgICAgICAgOiAncmVzb3VyY2VzX29wdGltaXphdGlvbi5waHAnXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBQYWdlUmFua1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZV9mciAgICAgICAgOiAnQ2FsY3VsIGR1IFBhZ2VSYW5rIGRlIFdpa2lww6lkaWEgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlX2VuICAgICAgICA6ICdDb21wdXRhdGlvbiBvZiB0aGUgUGFnZVJhbmsgb2YgV2lraXBlZGlhIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbl9mciAgOiAnQ2FsY3VsIGxlIFBhZ2VSYW5rIGRlIGNoYXF1ZSBwYWdlIHN1ciBXaWtpcMOpZGlhIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbl9lbiAgOiAnQ29tcHV0ZSB0aGUgUGFnZVJhbmsgb2YgZXZlcnkgV2ViIHBhZ2UgaW4gV2lraXDDqWRpYSBGcmFuY2UuJyxcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlICAgICAgICA6ICdQeXRob24nLFxyXG4gICAgICAgICAgICAgICAgeWVhciAgICAgICAgICAgIDogMjAxNSxcclxuICAgICAgICAgICAgICAgIHByb2plY3QgICAgICAgICA6ICdQYWdlUmFuaycsXHJcbiAgICAgICAgICAgICAgICBmaWxlICAgICAgICAgICAgOiAncGFnZXJhbmsucHknXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBNeU1pbmlGYWN0b3J5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlX2ZyICAgICAgICA6ICdHZXN0aW9uIGRlcyBvYmpldHMgY290w6kgY2xpZW50JyxcclxuICAgICAgICAgICAgICAgIHRpdGxlX2VuICAgICAgICA6ICdNYW5hZ2VtZW50IG9mIHRoZSBvYmplY3RzIG9uIHRoZSBmcm9udGVuZCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbl9mciAgOiAnVmVyc2lvbiBzaW1wbGlmacOpZSBkZXMgZm9uY3Rpb25zIHNlcnZhbnQgw6AgcsOpY3Vww6lyZXIgZXQgw6AgbWV0dHJlIMOgIGpvdXIgbGVzIG9iamV0cyBjcsOpw6lzIHBhciBsXFwndXRpbGlzYXRldXIuJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uX2VuICA6ICdTaW1wbGlmaWVkIHZlcnNpb24gb2YgdGhlIGNvZGUgYWltaW5nIGF0IHJldHJpZXZpbmcgYW5kIHN0b3JpbmcgdGhlIG9iamVjdHMgY3JlYXRlZCBieSB0aGUgdXNlcicsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSAgICAgICAgOiAnSmF2YVNjcmlwdCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyICAgICAgICAgICAgOiAyMDE2LFxyXG4gICAgICAgICAgICAgICAgcHJvamVjdCAgICAgICAgIDogJ015TWluaUZhY3RvcnknLFxyXG4gICAgICAgICAgICAgICAgZmlsZSAgICAgICAgICAgIDogJ29iamVjdF9zdG9yYWdlLmpzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKGZpbHRlcl90eXBlLCB2YWx1ZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGNvZGVzID0gdGhhdC5maWx0ZXIoZmlsdGVyX3R5cGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY29kZXMpO1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9MDsgaTxjb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXRfZmlsZV9jb250ZW50KGNvZGVzW2ldLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlcl90eXBlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5saXN0LmZpbHRlcihmdW5jdGlvbihjb2RlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoY29kZVtmaWx0ZXJfdHlwZV0gPT0gdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldF9maWxlX2NvbnRlbnQgPSBmdW5jdGlvbihjb2RlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2QgOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvZmlsZXMvJyArIGNvZGUuZmlsZVxyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIHN1Y2Nlc3NDYWxsYmFjayhyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgY29kZS5jb250ZW50ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNvZGUpO1xyXG4gICAgICAgICAgICB9LCB0aGF0LmVycm9yKTsgICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXSk7IiwiQXBwLnNlcnZpY2UoJ3Byb2plY3RzJywgW1xyXG4gICAgJ3Byb2plY3Rfenp6ZWxwJyxcclxuICAgICdwcm9qZWN0X3BhZ2VyYW5rJyxcclxuICAgICdwcm9qZWN0X215bWluaWZhY3RvcnknLFxyXG4gICAgZnVuY3Rpb24ocHJvamVjdF96enplbHAsIHByb2plY3RfcGFnZXJhbmsscHJvamVjdF9teW1pbmlmYWN0b3J5KSB7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0X3Byb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0X3N0cikge1xyXG4gICAgICAgICAgICBzd2l0Y2gocHJvamVjdF9zdHIpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1p6emVscCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0X3p6emVscDtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VSYW5rJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3RfcGFnZXJhbms7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdNeU1pbmlGYWN0b3J5JyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3RfbXltaW5pZmFjdG9yeTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgcHJvamVjdCBkb2VzblxcJ3QgZXhpc3QnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7IiwiQXBwLnNlcnZpY2UoJ3Byb2plY3RfbXltaW5pZmFjdG9yeScsIFtcclxuICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSAnTXlNaW5pRmFjdG9yeSc7XHJcblxyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyID0gICc8cD5NeU1pbmlGYWN0b3J5IGVzdCB1bmUgZW50cmVwcmlzZSBwcm9wb3NhbnQgdW4gZW5zZW1ibGUgZGUgc29sdXRpb25zIGVuIHJhcHBvcnQgYXZlYyBsXFwndW5pdmVycyBkZSBsXFwnaW1wcmVzc2lvbiAzRC4gJztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9mciArPSAnSlxcJ2FpIHBvdXIgbWEgcGFydCBpbnTDqWdyw6kgbFxcJ8OpcXVpcGUgZW4gY2hhcmdlIGR1IHByb2pldCA8aT5XZURlc2lnbi5saXZlPC9pPiBxdWkgYSBwb3VyIGJ1dCBkZSByZW5kcmUgbGEgY3LDqWF0aW9uIGV0IGxlICc7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJ3BhcnRhZ2UgZFxcJ29iamV0cyBpbXByaW3DqXMgZW4gM0QgYWNjZXNzaWJsZSDDoCB0b3VzLiBEYW5zIGxlIGNhZHJlIGRlIGNlIHN0YWdlLCBqXFwnYWkgYWlkw6kgw6AgbGEgcsOpYWxpc2F0aW9uIGRcXCd1bmUgQVBJIFJFU1QgJztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9mciArPSAnZXQgw6Agc29uIGludMOpZ3JhdGlvbiBkYW5zIHVuZSBhcHBsaWNhdGlvbiB3ZWIgZMOpdmVsb3Bww6llIGF2ZWMgQW5ndWxhckpTLiBVbmUgcHLDqXNlbnRhdGlvbiBwbHVzIGTDqXRhaWxsw6llIGR1IHByb2pldCBlc3QgZGlzcG9uaWJsZSAnO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdkYW5zIG1vbiA8YSBocmVmPVwiL2ZpbGVzL3N0YWdlM0lOR0UxZmRlbGFuZ2xlLnBkZlwiPnJhcHBvcnQgZGUgc3RhZ2U8L2E+LjwvcD4nO1xyXG5cclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9lbiA9ICAnPHA+TXlNaW5pRmFjdG9yeSBpcyBhIGNvbXBhbnkgb2ZmZXJpbmcgYSBzZXQgb2Ygc29sdXRpb25zIGluIHJlbGF0aW9uIHdpdGggdGhlIHdvcmxkIG9mIDNEIHByaW50aW5nLiAnO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICdEdXJpbmcgbXkgaW50ZXJuc2hpcCwgSVxcJ3ZlIHdvcmtlZCB3aXRoIHRoZSB0ZWFtIGluIGNoYXJnZSBvZiB0aGUgPGk+V2VEZXNpZ24ubGl2ZTwvaT4gcHJvamVjdCB0aGF0IGFpbSBhdCBtYWtpbmcgY3JlYXRpb24gYW5kICc7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZW4gKz0gJ2FuZCBzaGFya2luZyBvZiAzRCBwcmludGFibGUgb2JqZXRzIGFjY2Vzc2libGUgdG8gYWxsLiBUbyBkbyB0aGF0LCBJIHBhcnRpY2lwYXRlZCB0byB0aGUgY3JlYXRpb24gb2YgYSBSRVNUIEFQSSBhbmQgdG8gaXRzIGludGVyZ3JhdGlvbiAnO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICdpbiBhIHdlYiBhcHBsaWNhdGlvbiBkZXZlbG9wcGVkIHdpdGggQW5ndWxhckpTLiBBIG1vcmUgZGV0YWlsbGVkIHByZXNlbnRhdGlvbiBpcyBhdmFpbGFibGUgaW4gbXkgJztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9lbiArPSAnPGEgaHJlZj1cIi9maWxlcy9zdGFnZTNJTkdFMWZkZWxhbmdsZS5wZGZcIj5pbnRlcm5zaGlwIHJlcG9ydCAoaW4gZnJlbmNoKTwvYT4uPC9wPic7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdldF9odG1sID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgc3dpdGNoKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmcmVuY2gnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnU3RhZ2UgY2hleiBNeU1pbmlGYWN0b3J5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VudGF0aW9uICAgIDogdGhpcy5wcmVzZW50YXRpb25fZnJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5nbGlzaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ0ludGVybnNoaXAgYXQgTXlNaW5pRmFjdG9yeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbnRhdGlvbiAgICA6IHRoaXMucHJlc2VudGF0aW9uX2VuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7IiwiQXBwLnNlcnZpY2UoJ3Byb2plY3RfcGFnZXJhbmsnLCBbXHJcbiAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ1BhZ2VSYW5rJztcclxuXHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgPSAgJzxwPkRhbnMgbGUgY2FkcmUgZGVzIDxpPkNvbmNvdXJzIGF1eCBHcmFuZGVzIEVjb2xlczwvaT4sIGpcXCdhaSBwcsOpc2VudMOpIGxcXCfDqXByZXV2ZSBkZSA8aT5USVBFPC9pPiAnO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICcoVHJhdmFpbCBkXFwnaW5pdGlhdGl2ZSBwZXJzb25uZWxsZSBlbmNhZHLDqSkuIEV0YW50IHBhcnRpY3VsacOocmVtZW50IGludMOpcmVzc8OpIHBhciB0b3V0IGNlIHF1aSB0b3VjaGUgw6AgSW50ZXJuZXQsICc7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJ2plIG1lIHN1aXMgb3JpZW50w6kgdmVycyB1biBzdWpldCB0cmFpdGFudCBkZXMgbW90ZXVycyBkZSByZWNoZXJjaGUuPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPkNlIHByb2pldCBtXFwnYSBwZXJtaXQgbWV0dHJlIGVuIHJlbGF0aW9uIG1lcyBjb25uYWlzc2FuY2VzIGluZm9ybWF0aXF1ZXMgZXQgdW5lIHBhcnRpZSBkZSBjZSAnO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdxdWUgalxcJ2F2YWlzIGFwcHJpcyBlbiBNYXRow6ltYXRpcXVlcyBwZW5kYW50IG1lcyBkZXV4IGFubsOpZXMgZGUgQ2xhc3NlIFByw6lwYXJhdG9pcmUuJztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9mciArPSAnPHVsPjxsaT48YSB0YXJnZXQ9XCJfQkxBTktcIiBocmVmPVwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xM3V2cWJWOVNQZmJNRDMwQ2NEMTlEYTVMenZ3UkNoREt5b1ItOGFHVndRMC9lZGl0P3VzcD1zaGFyaW5nXCI+JztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9mciArPSAnU3VwcG9ydCBkZSBwcsOpc2VudGF0aW9uIG9yYWxlPC9hPjwvbGk+JztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9mciArPSAnPGxpPjxhIGhyZWY9XCJodHRwOi8venp6ZWxwLmZyL0V4YW1wbGVzL1BhZ2VSYW5rLnB5XCI+U291cmNlcyBjb21wbMOodGVzPC9hPjwvbGk+PC91bD4nO1xyXG5cclxuXHRcdHRoaXMucHJlc2VudGF0aW9uX2VuID0gJzxwPkR1cmluZyB0aGUgZXhhbWluYXRpb25zIGxlYWRpbmcgdG8gbXkgZW5naW5lZXIgc2Nob29sLCBJIGhhZCB0byBhY2hpZXZlIGEgcHJvamVjdCBpbiBhIHNjaWVuY2Ugc3ViamVjdC4gJztcclxuXHRcdHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICdCZWVpbmcgZmFzY2luYXRlZCBieSBldmVyeXRoaW5nIGFycm91bmQgdGhlIEludGVybmV0LCAnO1xyXG5cdFx0dGhpcy5wcmVzZW50YXRpb25fZW4gKz0gJ0kgZGVjaWRlZCB0byBkbyBzb21ldGhpbmcgcmVsYXRlZCB0byBzZWFyY2ggZW5naW5lcy48L3A+JztcclxuXHRcdHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICc8cD5UaGlzIHByb2plY3QgaGVscGVkIG1lIHRvIHVuZGVyc3RhbmQgaG93IE1hdGhlbWF0aWNzIChtb3JlIHByZWNpc2VseSBBbGdlYnJhKSBjYW4gYmUgdXNlZnVsIGluIENvbXB1dGVyIFNjaWVuY2UuPC9wPic7XHJcblx0XHR0aGlzLnByZXNlbnRhdGlvbl9lbiArPSAnPHVsPjxsaT48YSB0YXJnZXQ9XCJfQkxBTktcIiBocmVmPVwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xM3V2cWJWOVNQZmJNRDMwQ2NEMTlEYTVMenZ3UkNoREt5b1ItOGFHVndRMC9lZGl0P3VzcD1zaGFyaW5nXCI+JztcclxuXHRcdHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICdPcmFsIG1lZGl1bSBvZiBwcmVzZW50YXRpb24gKGluIGZyZW5jaCk8L2E+PC9saT4nO1xyXG5cdFx0dGhpcy5wcmVzZW50YXRpb25fZW4gKz0gJzxsaT48YSBocmVmPVwiaHR0cDovL3p6emVscC5mci9FeGFtcGxlcy9QYWdlUmFuay5weVwiPkNvbXBsZXRlIHNvdXJjZSBjb2RlPC9hPjwvbGk+PC91bD4nO1xyXG5cclxuICAgICAgICB0aGlzLmdldF9odG1sID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgc3dpdGNoKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmcmVuY2gnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnUGFnZVJhbmsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVzZW50YXRpb24gICAgOiB0aGlzLnByZXNlbnRhdGlvbl9mclxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmdsaXNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnWnp6ZWxwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VudGF0aW9uICAgIDogdGhpcy5wcmVzZW50YXRpb25fZW5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhpcyBsYW5ndWFnZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5dKTtcclxuXHJcblxyXG5cclxuXHJcbiIsIkFwcC5zZXJ2aWNlKCdwcm9qZWN0X3p6emVscCcsIFtcclxuICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSAnWnp6ZWxwJztcclxuXHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgPSAgJzxwPlp6emVscCBlc3QgdW5lIHBsYXRlZm9ybWUgcGVybWV0dGFudCBkXFwnZW5yaWNoaXIgbFxcJ2V4cMOpcmllbmNlIHV0aWxpc2F0ZXVyIHN1ciBsZSBqZXUgZW4gbGlnbmUgRm91cm1penp6Ljxicj4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdJbCBtZXQgw6AgZGlzcG9zaXRpb24gZGVzIGpvdWV1cnMgdW5lIHPDqXJpZSBkXFwnb3V0aWxzIHZpc2FudCDDoCBsYSBmb2lzIMOgIGF1Z21lbnRlciBsZXVyIHByb2R1Y3Rpdml0w6kgZXQgw6AgcmVuZHJlIGxlIGpldSBwbHVzIGFncsOpYWJsZSBhdSBxdW90aWRpZW4uICc7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJ0xlIHNpdGUgY29tcG9ydGUgYWluc2kgZGVzIGFpZGVzIGRlIGpldSwgZGVzIGluZGljYXRldXJzIGRlIHBlcmZvcm1hbmNlIG91IGVuY29yZSBkZXMgb3V0aWxzIGRlIGdlc3Rpb24uPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPlVuZSBleHRlbnNpb24gQ2hyb21lIGV0IEZpcmVmb3ggZXN0IMOpZ2FsZW1lbnQgcHJvcG9zw6llIGV0IG9mZnJlIHRvdXQgdW4gZW5zZW1ibGUgZFxcJ2Ftw6lsaW9yYXRpb25zIGdyYXBoaXF1ZXMgZXQgZFxcJ2FuYWx5c2VzIGRlcyBkb25uw6llcyBkdSBqZXUuPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPkxhIHBsYXRlZm9ybWUgZXN0IGVudGnDqHJlbWVudCBmaW5hbmPDqWUgcGFyIHNhIGNvbW11bmF1dMOpIGdyw6JjZSDDoCB1biA8YSBocmVmPVwiaHR0cHM6Ly9mci51bHVsZS5jb20venp6ZWxwL1wiIHRhcmdldD1cIl9CTEFOS1wiPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJ2ZpbmFuY2VtZW50IHBhcnRpY2lwYXRpZjwvYT4gYXlhbnQgcsOpY29sdMOpIDQ2NeKCrCDDoCBsYSBmaW4gZGUgbFxcJ2FubsOpZSAyMDE0LjwvcD4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdRdWVscXVlcyB2YWxldXJzIGNsw6llcyA6IDxicj48dWw+PGxpPn4gNCAwMDAgY29tcHRlcyBhY3RpZnM8L2xpPjxsaT5+IDQgMDAwIDAwMCBwYWdlcyB2dWVzIHBhciBtb2lzPC9saT48bGk+fiAzMCAwMDAgbGlnbmVzIGRlIGNvZGU8L2xpPjwvdWw+JztcclxuXHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZW4gPSAgJzxwPlp6emVscCBpcyBhIHdlYnNpdGUgYWltaW5nIGF0IGltcHJvdmluZyB0aGUgdXNlciBleHBlcmllbmNlIG9uIHRoZSBvbmxpbmUgZ2FtZSBBbnR6enouPGJyPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZW4gKz0gJ0l0IHByb3ZpZGVzIGEgc2V0IG9mIHRvb2xzIHRoYXQgYWxsb3cgZXZlcnkgdXNlciB0byBpbXByb3ZlIHRoZWlyIHByb2R1Y3Rpdml0eSBhbmQgdG8gbWFrZSB0aGUgZ2FtZSBtb3JlIHBsZWFzYW50LiAnO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICdUbyBkbyB0aGF0LCB0aGUgd2Vic2l0ZSBpbmNsdWRlIGhlbHBzIGZvciB0aGUgZ2FtZSwgcGVyZm9ybWFuY2UgaW5kaWNhdG9ycyBvciBtb25pdG9yaW5nIHRvb2xzLjwvcD4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICc8cD5BbiBleHRlbnNpb24gZm9yIENocm9tZSBhbmQgRmlyZWZveCB3aGljaCBhZGQgbWFueSBncmFwaGljYWwgaW1wcm92ZW1lbnQgYW5kIGRhdGEgYW5hbHlzaXMgaXMgYWxzbyBhdmFpbGFibGUuPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZW4gKz0gJzxwPlRoZSBwcm9qZWN0IGlzIGZ1bGx5IGZ1bmRlZCBieSBpdHMgY29tbXVuaXR5IHRoYW5rcyB0byBhIDxhIGhyZWY9XCJodHRwczovL2ZyLnVsdWxlLmNvbS96enplbHAvXCIgdGFyZ2V0PVwiX0JMQU5LXCI+JztcclxuICAgICAgICB0aGlzLnByZXNlbnRhdGlvbl9lbiArPSAnY3Jvd2RmdW5kaW5nPC9hPiB0aGF0IHJhaXNlZCA0NjXigqwgYXQgdGhlIGVuZCBvZiB0aGUgeWVhciAyMDE0LjwvcD4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2VuICs9ICdTb21lIGtleSB2YWx1ZXMgOiA8YnI+PHVsPjxsaT5+IDQgMDAwIGFjdGl2ZSBhY2NvdW50czwvbGk+PGxpPn4gNCAwMDAgMDAwIG1vbnRobHkgdmlld3M8L2xpPjxsaT5+MzUgMDAwIGxpbmVzIG9mIGNvZGU8L2xpPic7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdldF9odG1sID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgc3dpdGNoKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmcmVuY2gnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnWnp6ZWxwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VudGF0aW9uICAgIDogdGhpcy5wcmVzZW50YXRpb25fZnJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5nbGlzaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbnRhdGlvbiAgICA6IHRoaXMucHJlc2VudGF0aW9uX2VuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
