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
    } 
});

App.controller('HomeCtrl', [
	function() {
		console.log('HomeCtrl');
	}
]);
App.controller('ProjectCtrl', [
    '$scope',
    '$timeout',
    '$stateParams',
    '$window',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$timeout,$stateParams,$window,CONFIG,projects,codes) {

        $scope.affiche = false;
        $scope.project = projects.get_project($stateParams.project);
        $scope.codes = [];

        $scope.init = function() {
            $scope.set_language(CONFIG.language.default);
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

        $scope.add_code = function(code) {
            console.log(code);  
        };


        $scope.init();

    }
]);
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
App.directive("codeBlock", [
    '$window',
    '$timeout',
    '$state',
    function($window,$timeout,$state) {
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

                scope.set_language(localStorage.getItem('language'));

                //$window.hljs.highlightBlock(scope.html);
            },
            templateUrl: 'partials/code-block.html'
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
    '$state',
    'CONFIG',
    function($rootScope,$timeout,$state,CONFIG) {
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
                                languages       : 'Langages maitrisés'
                            };
                            break;
                        case 'english' :
                            scope.html = {
                                title           : 'Personal data',
                                age             : 'yo',
                                country         : 'France',
                                resume          : 'Resume',
                                projects_title  : 'Projects',
                                languages       : 'Programming languages'
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
            {
                title_fr        : 'Simplification des appels AJAX',
                title_en        : 'Simplification of the AJAX calls',
                description_fr  : 'Cette classe permet de simplifier les interactions entre l\'extension et le serveur en gérant par exemple automatiquement l\'authentification',
                description_en  : 'This class provide a set of tools that simplify the interactions between the extension and the server.',
                language        : 'JavaScript',
                year            : 2016,
                project         : 'Zzzelp',
                file            : 'ajax.js'
            }
        ];
        
        this.get = function(filter_type, value, callback) {
            var codes = that.filter(filter_type, value);
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
    function(project_zzzelp, project_pagerank) {

        this.get_project = function(project_str) {
            switch(project_str) {
                case 'Zzzelp' :
                    return project_zzzelp;
                case 'Pagerank' :
                    return project_pagerank;
                default :
                    console.error('This project doesn\'t exist');
            }           
        };
    }
]);
App.service('project_pagerank', [
    function() {

        this.title = 'PageRank';
    }
]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL0hvbWUuanMiLCJjb250cm9sbGVycy9Qcm9qZWN0LmpzIiwiY29udHJvbGxlcnMvUmVzdW1lLmpzIiwiZGlyZWN0aXZlcy9jb2RlLWJsb2NrLmpzIiwiZGlyZWN0aXZlcy9oZWFkZXItYmFyLmpzIiwiZGlyZWN0aXZlcy9uYXYtYmFyLmpzIiwic2VydmljZXMvY29kZXMuanMiLCJzZXJ2aWNlcy9wcm9qZWN0cy5qcyIsInNlcnZpY2VzL3Byb2plY3RfcGFnZXJhbmsuanMiLCJzZXJ2aWNlcy9wcm9qZWN0X3p6emVscC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE1BQUEsUUFBQSxPQUFBLE9BQUEsQ0FBQSxZQUFBOztBQUVBLElBQUEsT0FBQTtJQUNBO0lBQ0EsU0FBQSxnQkFBQTtRQUNBO1NBQ0EsT0FBQSxPQUFBO1lBQ0EsS0FBQTtZQUNBLGFBQUE7WUFDQSxZQUFBOztTQUVBLE9BQUEsU0FBQTtZQUNBLEtBQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7U0FFQSxNQUFBLFVBQUE7WUFDQSxLQUFBO1lBQ0EsYUFBQTtZQUNBLFlBQUE7Ozs7O0FBS0EsSUFBQSxJQUFBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsU0FBQSxPQUFBLFdBQUEsUUFBQTtRQUNBLEdBQUEsT0FBQSxRQUFBLE9BQUEsS0FBQTtZQUNBLE9BQUEsR0FBQTs7O1FBR0EsYUFBQSxRQUFBLFlBQUEsT0FBQSxTQUFBOztRQUVBLFdBQUEsSUFBQSxtQkFBQSxTQUFBLE9BQUEsVUFBQTtXQUNBLGFBQUEsUUFBQSxZQUFBOzs7OztBQUtBLElBQUEsU0FBQSxVQUFBO0lBQ0EsV0FBQTtRQUNBLFVBQUE7O0lBRUEsWUFBQTtRQUNBLFFBQUE7Ozs7QUM5Q0EsSUFBQSxXQUFBLFlBQUE7Q0FDQSxXQUFBO0VBQ0EsUUFBQSxJQUFBOzs7QUNGQSxJQUFBLFdBQUEsZUFBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsU0FBQSxPQUFBLFNBQUEsYUFBQSxRQUFBLE9BQUEsU0FBQSxPQUFBOztRQUVBLE9BQUEsVUFBQTtRQUNBLE9BQUEsVUFBQSxTQUFBLFlBQUEsYUFBQTtRQUNBLE9BQUEsUUFBQTs7UUFFQSxPQUFBLE9BQUEsV0FBQTtZQUNBLE9BQUEsYUFBQSxPQUFBLFNBQUE7WUFDQSxPQUFBO1lBQ0EsU0FBQSxXQUFBO2dCQUNBLE9BQUEsVUFBQTtlQUNBLE9BQUEsVUFBQTs7O1FBR0EsT0FBQSxlQUFBLFNBQUEsVUFBQTtZQUNBLE9BQUEsT0FBQSxPQUFBLFFBQUEsU0FBQTs7O1FBR0EsT0FBQSxhQUFBLFdBQUE7WUFDQSxNQUFBLElBQUEsV0FBQSxPQUFBLFFBQUEsTUFBQSxTQUFBLE1BQUE7Z0JBQ0EsT0FBQSxNQUFBLEtBQUE7Ozs7UUFJQSxPQUFBLFdBQUEsU0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBOzs7O1FBSUEsT0FBQTs7OztBQ3JDQSxJQUFBLFdBQUEsY0FBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFNBQUEsT0FBQSxTQUFBLFFBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLE9BQUEsT0FBQSxXQUFBO1lBQ0EsT0FBQSxhQUFBLE9BQUEsU0FBQTtZQUNBLFNBQUEsV0FBQTtnQkFDQSxPQUFBLFVBQUE7ZUFDQSxPQUFBLFVBQUE7OztRQUdBLE9BQUEsZUFBQSxTQUFBLFVBQUE7WUFDQSxPQUFBO2dCQUNBLEtBQUE7b0JBQ0EsT0FBQSxPQUFBO3dCQUNBLFdBQUE7NEJBQ0E7Z0NBQ0EsVUFBQTtnQ0FDQSxVQUFBO29DQUNBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7c0NBQ0E7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTtzQ0FDQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBOzs7OzRCQUlBO2dDQUNBLFVBQUE7Z0NBQ0EsVUFBQTtvQ0FDQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FD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UUFFQSxLQUFBLFFBQUE7OztBQ0hBLElBQUEsUUFBQSxrQkFBQTtJQUNBLFdBQUE7O1FBRUEsS0FBQSxPQUFBOztRQUVBLEtBQUEsbUJBQUE7UUFDQSxLQUFBLG1CQUFBO1FBQ0EsS0FBQSxtQkFBQTtRQUNBLEtBQUEsbUJBQUE7UUFDQSxLQUFBLG1CQUFBO1FBQ0EsS0FBQSxtQkFBQTs7UUFFQSxLQUFBLFdBQUEsU0FBQSxVQUFBO1lBQ0EsT0FBQTtnQkFDQSxLQUFBO29CQUNBLE9BQUE7d0JBQ0Esa0JBQUE7d0JBQ0Esa0JBQUEsS0FBQTs7Z0JBRUEsS0FBQTtvQkFDQSxPQUFBO3dCQUNBLFFBQUE7O2dCQUVBO29CQUNBLFFBQUEsTUFBQTs7OztHQUlBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBBcHAgPSBhbmd1bGFyLm1vZHVsZSgnQXBwJywgWyd1aS5yb3V0ZXInLCduZ1Nhbml0aXplJ10pO1xyXG5cclxuQXBwLmNvbmZpZyhbXHJcbiAgICAnJHN0YXRlUHJvdmlkZXInLFxyXG4gICAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSAoJ2hvbWUnLHtcclxuICAgICAgICAgICAgdXJsOiAnL2hvbWUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSAoJ3Jlc3VtZScse1xyXG4gICAgICAgICAgICB1cmw6ICcvcmVzdW1lJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9yZXN1bWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZXN1bWVDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdwcm9qZWN0Jyx7XHJcbiAgICAgICAgICAgIHVybDogJy9wcm9qZWN0cy97cHJvamVjdH0nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3Byb2plY3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q3RybCdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXSk7XHJcblxyXG5BcHAucnVuKFtcclxuICAgICckc3RhdGUnLFxyXG4gICAgJyRyb290U2NvcGUnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICBmdW5jdGlvbigkc3RhdGUsJHJvb3RTY29wZSxDT05GSUcpIHtcclxuICAgICAgICBpZigkc3RhdGUuY3VycmVudC51cmwgPT0gJ14nKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmd1YWdlJywgQ09ORklHLmxhbmd1YWdlLmRlZmF1bHQpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignY2hhbmdlX2xhbmd1YWdlJywgZnVuY3Rpb24oZXZlbnQsIGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmd1YWdlJywgbGFuZ3VhZ2UpOyBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXSk7XHJcblxyXG5BcHAuY29uc3RhbnQoJ0NPTkZJRycsIHtcclxuICAgIGxhbmd1YWdlIDoge1xyXG4gICAgICAgIGRlZmF1bHQgOiAnZnJlbmNoJ1xyXG4gICAgfSxcclxuICAgIGFuaW1hdGlvbiA6IHtcclxuICAgICAgICBzdGFydCA6IDEwMDBcclxuICAgIH0gXHJcbn0pO1xyXG4iLCJBcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBbXHJcblx0ZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygnSG9tZUN0cmwnKTtcclxuXHR9XHJcbl0pOyIsIkFwcC5jb250cm9sbGVyKCdQcm9qZWN0Q3RybCcsIFtcclxuICAgICckc2NvcGUnLFxyXG4gICAgJyR0aW1lb3V0JyxcclxuICAgICckc3RhdGVQYXJhbXMnLFxyXG4gICAgJyR3aW5kb3cnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICAncHJvamVjdHMnLFxyXG4gICAgJ2NvZGVzJyxcclxuICAgIGZ1bmN0aW9uKCRzY29wZSwkdGltZW91dCwkc3RhdGVQYXJhbXMsJHdpbmRvdyxDT05GSUcscHJvamVjdHMsY29kZXMpIHtcclxuXHJcbiAgICAgICAgJHNjb3BlLmFmZmljaGUgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUucHJvamVjdCA9IHByb2plY3RzLmdldF9wcm9qZWN0KCRzdGF0ZVBhcmFtcy5wcm9qZWN0KTtcclxuICAgICAgICAkc2NvcGUuY29kZXMgPSBbXTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldF9sYW5ndWFnZShDT05GSUcubGFuZ3VhZ2UuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgICRzY29wZS5sb2FkX2NvZGVzKCk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmFmZmljaGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCBDT05GSUcuYW5pbWF0aW9uLnN0YXJ0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0X2xhbmd1YWdlID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmh0bWwgPSAkc2NvcGUucHJvamVjdC5nZXRfaHRtbChsYW5ndWFnZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmxvYWRfY29kZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29kZXMuZ2V0KCdwcm9qZWN0JywgJHNjb3BlLnByb2plY3QubmFtZSwgZnVuY3Rpb24oY29kZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvZGVzLnB1c2goY29kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5hZGRfY29kZSA9IGZ1bmN0aW9uKGNvZGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY29kZSk7ICBcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbl0pOyIsIkFwcC5jb250cm9sbGVyKCdSZXN1bWVDdHJsJywgW1xyXG4gICAgJyRzY29wZScsXHJcbiAgICAnJHRpbWVvdXQnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsQ09ORklHKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UoQ09ORklHLmxhbmd1YWdlLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hZmZpY2hlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgQ09ORklHLmFuaW1hdGlvbi5zdGFydCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldF9sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJlbmNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25zIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRm9ybWF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ1RlbGVjb20gTGlsbGUsIFVuaXZlcnNpdMOpIExpbGxlIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE1LTIwMTgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdMaWxsZSwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnRXR1ZGVzIGVuIGluZm9ybWF0aXF1ZSwgcsOpc2VhdSwgdGjDqW9yaWUgZHUgc2lnbmFsIGV0IMOpY29ub21pZS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMeWPDqWUgQmVydGhvbGxldCwgQ2xhc3NlIFByw6lwYXJhdG9pcmUgYXV4IEdyYW5kZXMgRWNvbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxMyAtIDIwMTUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdBbm5lY3ksIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ01QU0kgLSBNUCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0x5Y8OpZSBFZG91YXJkIEhlcnJpb3QsIEJhY2NhbGF1csOpYXQgUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdWb2lyb24sIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ01lbnRpb24gVHLDqHMgQmllbi4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnU3RhZ2VzIGV0IFByb2pldHMgUGVyc29ubmVscycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdTdGFnZSBlbiB0YW50IHF1ZSBkw6l2ZWxvcHBldXIgV2ViIMOgIE15TWluaUZhY3RvcnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE2IC0gNCBtb2lzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnTG9uZHJlcywgQW5nbGV0ZXJyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ0Nyw6lhdGlvbiBkXFwndW5lIEFQSSBSRVNUIHBvdXIgdW5lIHBsYXRlZm9ybWUgZGUgY3LDqWF0aW9uIGRcXCdvYmpldHMgM0QuPGJyPkFtw6lsaW9yYXRpb24gZGUgbGEgcGxhdGVmb3JtZSBleGlzdGFudGUgYXZlYyBBbmd1bGFySlMgZXQgTm9kZS5KUy4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdDcsOpYXRpb24gZXQgZ2VzdGlvbm5haXJlIGRlIFp6emVscCAoaHR0cDovL3p6emVscC5mciknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDEzIC0gMjAxNicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ1BsYXRlZm9ybWUgZW4gbGlnbmUgdmlzYW50IMOgIGFtw6lsaW9yZXIgbFxcJ2V4cMOpcmllbmNlIHV0aWxpc2F0ZXVyIGR1IGpldSBlbiBsaWduZSBGb3VybWl6enouPGJyPkxlIHNpdGUgY29tcHRlIGFjdHVlbGxlbWVudCBwbHVzIGRlIDUgMDAwIHV0aWxpc2F0ZXVycyByw6lndWxpZXJzLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0V0dWRlIGRlIGxcXCdhbGdvcml0aG1lIGR1IFBhZ2VSYW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ0V0dWRlIG1hdGjDqW1hdGlxdWUgZHUgUGFnZVJhbmsgKGFsZ29yaXRobWUgaGlzdG9yaXF1ZSBkZSBHb29nbGUpLiBDYWxjdWwgZHUgUGFnZVJhbmsgZGUgV2lraXDDqWRpYSBGcmFuY2UuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaHRtbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhpcyBsYW5ndWFnZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLmh0bWwuc2tpbGxzID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRnJvbnQtZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdKYXZhU2NyaXB0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ0FuZ3VsYXJKUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdKcXVlcnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzLjVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdDU1MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzLjVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnQmFjay1lbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ1BIUCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdEamFuZ28nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnTm9kZS5KUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdNeVNRTCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDMuNVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbl0pOyIsIkFwcC5kaXJlY3RpdmUoXCJjb2RlQmxvY2tcIiwgW1xyXG4gICAgJyR3aW5kb3cnLFxyXG4gICAgJyR0aW1lb3V0JyxcclxuICAgICckc3RhdGUnLFxyXG4gICAgZnVuY3Rpb24oJHdpbmRvdywkdGltZW91dCwkc3RhdGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZSA6IHtcclxuICAgICAgICAgICAgICAgIGNvZGUgOiAnPWNvZGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cuaGxqcy5oaWdobGlnaHRCbG9jayhlbGVtZW50LmZpbmQoJ2NvZGUnKVswXSk7XHJcbiAgICAgICAgICAgICAgICB9LDEwMCk7ICBcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmcmVuY2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgOiBzY29wZS5jb2RlLnRpdGxlX2ZyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogc2NvcGUuY29kZS5kZXNjcmlwdGlvbl9mciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5nbGlzaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaHRtbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICA6IHNjb3BlLmNvZGUudGl0bGVfZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBzY29wZS5jb2RlLmRlc2NyaXB0aW9uX2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhpcyBsYW5ndWFnZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3BlLmh0bWwpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5nb19wcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygncHJvamVjdCcsIHsgcHJvamVjdCA6IHByb2plY3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8kd2luZG93LmhsanMuaGlnaGxpZ2h0QmxvY2soc2NvcGUuaHRtbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvY29kZS1ibG9jay5odG1sJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0pO1xyXG4iLCJBcHAuZGlyZWN0aXZlKFwiaGVhZGVyQmFyXCIsIFtcclxuXHQnJHRpbWVvdXQnLFxyXG5cdCdDT05GSUcnLFxyXG4gIFx0ZnVuY3Rpb24oJHRpbWVvdXQsQ09ORklHKSB7XHJcbiAgICBcdHJldHVybiB7XHJcblx0ICAgICAgICByZXN0cmljdDogJ0UnLFxyXG5cdCAgICAgICAgc2NvcGUgOiB0cnVlLFxyXG5cdCAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblx0ICAgICAgICBcdHNjb3BlLmFmZmljaGUgPSBmYWxzZTtcclxuXHJcblx0ICAgICAgICBcdHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHQgICAgICAgIFx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcclxuXHQgICAgICAgIFx0XHRcdHNjb3BlLmFmZmljaGUgPSB0cnVlO1xyXG5cdCAgICAgICAgXHRcdH0sIENPTkZJRy5hbmltYXRpb24uc3RhcnQpO1xyXG5cdCAgICAgICAgXHR9O1xyXG5cclxuXHQgICAgICAgIFx0c2NvcGUuaW5pdCgpO1xyXG5cdCAgICAgICBcdH0sXHJcblx0ICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2hlYWRlci1iYXIuaHRtbCdcclxuICAgIFx0fTtcclxuICBcdH1cclxuXSk7XHJcbiIsIkFwcC5kaXJlY3RpdmUoXCJuYXZCYXJcIiwgW1xyXG4gICAgJyRyb290U2NvcGUnLFxyXG4gICAgJyR0aW1lb3V0JyxcclxuICAgICckc3RhdGUnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICBmdW5jdGlvbigkcm9vdFNjb3BlLCR0aW1lb3V0LCRzdGF0ZSxDT05GSUcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuYWZmaWNoZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5hZmZpY2hlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBDT05GSUcuYW5pbWF0aW9uLnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuY2hhbmdlX2xhbmd1YWdlID0gZnVuY3Rpb24obGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZV9sYW5ndWFnZScsIGxhbmd1YWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZXRfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmcmVuY2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgICAgIDogJ0Rvbm7DqWVzIHBlcnNvbm5lbGxlcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlICAgICAgICAgICAgIDogJ2FucycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSAgICAgICAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdW1lICAgICAgICAgIDogJ0N1cnJpY3VsdW0gVml0YWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzX3RpdGxlICA6ICdQcm9qZXRzIHLDqWFsaXPDqXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlcyAgICAgICA6ICdMYW5nYWdlcyBtYWl0cmlzw6lzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmdsaXNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5odG1sID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgICAgICAgICA6ICdQZXJzb25hbCBkYXRhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2UgICAgICAgICAgICAgOiAneW8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgICAgICAgICA6ICdGcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZSAgICAgICAgICA6ICdSZXN1bWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzX3RpdGxlICA6ICdQcm9qZWN0cycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VzICAgICAgIDogJ1Byb2dyYW1taW5nIGxhbmd1YWdlcydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGlzIGxhbmd1YWdlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNob3dfcmVzdW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdyZXN1bWUnKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuZ29fcHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Byb2plY3QnLCB7IHByb2plY3QgOiBwcm9qZWN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5pbml0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbmF2LWJhci5odG1sJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0pO1xyXG4iLCJBcHAuc2VydmljZSgnY29kZXMnLCBbXHJcbiAgICAnJGh0dHAnLFxyXG4gICAgZnVuY3Rpb24oJGh0dHApIHtcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlX2ZyICAgICAgICA6ICdTaW1wbGlmaWNhdGlvbiBkZXMgYXBwZWxzIEFKQVgnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGVfZW4gICAgICAgIDogJ1NpbXBsaWZpY2F0aW9uIG9mIHRoZSBBSkFYIGNhbGxzJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uX2ZyICA6ICdDZXR0ZSBjbGFzc2UgcGVybWV0IGRlIHNpbXBsaWZpZXIgbGVzIGludGVyYWN0aW9ucyBlbnRyZSBsXFwnZXh0ZW5zaW9uIGV0IGxlIHNlcnZldXIgZW4gZ8OpcmFudCBwYXIgZXhlbXBsZSBhdXRvbWF0aXF1ZW1lbnQgbFxcJ2F1dGhlbnRpZmljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25fZW4gIDogJ1RoaXMgY2xhc3MgcHJvdmlkZSBhIHNldCBvZiB0b29scyB0aGF0IHNpbXBsaWZ5IHRoZSBpbnRlcmFjdGlvbnMgYmV0d2VlbiB0aGUgZXh0ZW5zaW9uIGFuZCB0aGUgc2VydmVyLicsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSAgICAgICAgOiAnSmF2YVNjcmlwdCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyICAgICAgICAgICAgOiAyMDE2LFxyXG4gICAgICAgICAgICAgICAgcHJvamVjdCAgICAgICAgIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICBmaWxlICAgICAgICAgICAgOiAnYWpheC5qcydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihmaWx0ZXJfdHlwZSwgdmFsdWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2RlcyA9IHRoYXQuZmlsdGVyKGZpbHRlcl90eXBlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldF9maWxlX2NvbnRlbnQoY29kZXNbaV0sIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyX3R5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0Lmxpc3QuZmlsdGVyKGZ1bmN0aW9uKGNvZGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjb2RlW2ZpbHRlcl90eXBlXSA9PSB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0X2ZpbGVfY29udGVudCA9IGZ1bmN0aW9uKGNvZGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZCA6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9maWxlcy8nICsgY29kZS5maWxlXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gc3VjY2Vzc0NhbGxiYWNrKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlLmNvbnRlbnQgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY29kZSk7XHJcbiAgICAgICAgICAgIH0sIHRoYXQuZXJyb3IpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5dKTsiLCJBcHAuc2VydmljZSgncHJvamVjdHMnLCBbXHJcbiAgICAncHJvamVjdF96enplbHAnLFxyXG4gICAgJ3Byb2plY3RfcGFnZXJhbmsnLFxyXG4gICAgZnVuY3Rpb24ocHJvamVjdF96enplbHAsIHByb2plY3RfcGFnZXJhbmspIHtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRfcHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3Rfc3RyKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChwcm9qZWN0X3N0cikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnWnp6ZWxwJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Rfenp6ZWxwO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZXJhbmsnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdF9wYWdlcmFuaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgcHJvamVjdCBkb2VzblxcJ3QgZXhpc3QnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7IiwiQXBwLnNlcnZpY2UoJ3Byb2plY3RfcGFnZXJhbmsnLCBbXHJcbiAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy50aXRsZSA9ICdQYWdlUmFuayc7XHJcbiAgICB9XHJcbl0pOyIsIkFwcC5zZXJ2aWNlKCdwcm9qZWN0X3p6emVscCcsIFtcclxuICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSAnWnp6ZWxwJztcclxuXHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgPSAgJzxwPlp6emVscCBlc3QgdW5lIHBsYXRlZm9ybWUgcGVybWV0dGFudCBkXFwnZW5yaWNoaXIgbFxcJ2V4cMOpcmllbmNlIHV0aWxpc2F0ZXVyIHN1ciBsZSBqZXUgZW4gbGlnbmUgRm91cm1penp6Ljxicj4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdJbCBtZXQgw6AgZGlzcG9zaXRpb24gZGVzIGpvdWV1cnMgdW5lIHPDqXJpZSBkXFwnb3V0aWxzIHZpc2FudCDDoCBsYSBmb2lzIMOgIGF1Z21lbnRlciBsZXVyIHByb2R1Y3Rpdml0w6kgZXQgw6AgcmVuZHJlIGxlIGpldSBwbHVzIGFncsOpYWJsZSBhdSBxdW90aWRpZW4uICc7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJ0xlIHNpdGUgY29tcG9ydGUgYWluc2kgZGVzIGFpZGVzIGRlIGpldSwgZGVzIGluZGljYXRldXJzIGRlIHBlcmZvcm1hbmNlIG91IGVuY29yZSBkZXMgb3V0aWxzIGRlIGdlc3Rpb24uPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPlVuZSBleHRlbnNpb24gQ2hyb21lIGV0IEZpcmVmb3ggZXN0IMOpZ2FsZW1lbnQgcHJvcG9zw6llIGV0IG9mZnJlIHRvdXQgdW4gZW5zZW1ibGUgZFxcJ2Ftw6lsaW9yYXRpb25zIGdyYXBoaXF1ZXMgZXQgZFxcJ2FuYWx5c2VzIGRlcyBkb25uw6llcyBkdSBqZXUuPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPkxhIHBsYXRlZm9ybWUgZXN0IGVudGnDqHJlbWVudCBmaW5hbmPDqWUgcGFyIHNhIGNvbW11bmF1dMOpIGdyw6JjZSDDoCB1biBmaW5hbmNlbWVudCBwYXJ0aWNpcGF0aWYgYXlhbnQgcsOpY29sdMOpIDQ2NeKCrCDDoCBsYSBmaW4gZGUgbFxcJ2FubsOpZSAyMDE0LjwvcD4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdRdWVscXVlcyB2YWxldXJzIGNsw6llcyA6IDxicj48dWw+PGxpPn4gNCAwMDAgY29tcHRlcyBhY3RpZnM8L2xpPjxsaT5+IDQgMDAwIDAwMCBwYWdlcyB2dWVzIHBhciBtb2lzPC9saT48bGk+fiAzMCAwMDAgbGlnbmVzIGRlIGNvZGU8L2xpPjwvdWw+JztcclxuXHJcbiAgICAgICAgdGhpcy5nZXRfaHRtbCA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJlbmNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgICAgIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbnRhdGlvbiAgICA6IHRoaXMucHJlc2VudGF0aW9uX2ZyXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdaenplbHAnXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
