var App = angular.module('App', ['ui.router','ngSanitize','hljs']);

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

App.config([
    'hljsServiceProvider',
    function(hljsServiceProvider) {
        hljsServiceProvider.setOptions({
            tabReplace : '    '
        });
    }
]);

App.run([
    '$state',
    function($state) {
        if($state.current.url == '^') {
            $state.go('home');
        }
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

App.service('codes', [
    '$http',
    function($http) {

        var that = this;

        this.list = [
            {
                language    : 'JavaScript',
                date        : 2016,
                project     : 'zzzelp',
                file        : 'ajax.js'
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

        this.error = function(response) {
            console.log(response);  
        };

    }
]);
App.controller('HomeCtrl', [
	function() {
		console.log('HomeCtrl');
	}
]);
App.controller('ProjectCtrl', [
    '$scope',
    '$timeout',
    '$stateParams',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$timeout,$stateParams,CONFIG,projects,codes) {

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
                console.log($scope.codes);
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
                    scope.set_language(CONFIG.language.default);
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

                scope.init();
            },
            templateUrl: 'partials/nav-bar.html'
        };
    }
]);

App.service('projects', [
    'project_zzzelp',
    'project_pagerank',
    function(project_zzzelp, project_pagerank) {

        this.get_project = function(project_str) {
            switch(project_str) {
                case 'zzzelp' :
                    return project_zzzelp;
                case 'pagerank' :
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

        this.name = 'zzzelp';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2NvZGVzLmpzIiwiY29udHJvbGxlcnMvSG9tZS5qcyIsImNvbnRyb2xsZXJzL1Byb2plY3QuanMiLCJjb250cm9sbGVycy9SZXN1bWUuanMiLCJkaXJlY3RpdmVzL2hlYWRlci1iYXIuanMiLCJkaXJlY3RpdmVzL25hdi1iYXIuanMiLCJzZXJ2aWNlcy9wcm9qZWN0cy5qcyIsInNlcnZpY2VzL3Byb2plY3RfcGFnZXJhbmsuanMiLCJzZXJ2aWNlcy9wcm9qZWN0X3p6emVscC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE1BQUEsUUFBQSxPQUFBLE9BQUEsQ0FBQSxZQUFBLGFBQUE7O0FBRUEsSUFBQSxPQUFBO0lBQ0E7SUFDQSxTQUFBLGdCQUFBO1FBQ0E7U0FDQSxPQUFBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsYUFBQTtZQUNBLFlBQUE7O1NBRUEsT0FBQSxTQUFBO1lBQ0EsS0FBQTtZQUNBLGFBQUE7WUFDQSxZQUFBOztTQUVBLE1BQUEsVUFBQTtZQUNBLEtBQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTs7Ozs7QUFLQSxJQUFBLE9BQUE7SUFDQTtJQUNBLFNBQUEscUJBQUE7UUFDQSxvQkFBQSxXQUFBO1lBQ0EsYUFBQTs7Ozs7QUFLQSxJQUFBLElBQUE7SUFDQTtJQUNBLFNBQUEsUUFBQTtRQUNBLEdBQUEsT0FBQSxRQUFBLE9BQUEsS0FBQTtZQUNBLE9BQUEsR0FBQTs7Ozs7QUFLQSxJQUFBLFNBQUEsVUFBQTtJQUNBLFdBQUE7UUFDQSxVQUFBOztJQUVBLFlBQUE7UUFDQSxRQUFBOzs7O0FDL0NBLElBQUEsUUFBQSxTQUFBO0lBQ0E7SUFDQSxTQUFBLE9BQUE7O1FBRUEsSUFBQSxPQUFBOztRQUVBLEtBQUEsT0FBQTtZQUNBO2dCQUNBLGNBQUE7Z0JBQ0EsY0FBQTtnQkFDQSxjQUFBO2dCQUNBLGNBQUE7Ozs7UUFJQSxLQUFBLE1BQUEsU0FBQSxhQUFBLE9BQUEsVUFBQTtZQUNBLElBQUEsUUFBQSxLQUFBLE9BQUEsYUFBQTtZQUNBLElBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLFFBQUEsS0FBQTtnQkFDQSxLQUFBLGlCQUFBLE1BQUEsSUFBQTs7OztRQUlBLEtBQUEsU0FBQSxTQUFBLGFBQUEsT0FBQTtZQUNBLE9BQUEsS0FBQSxLQUFBLE9BQUEsU0FBQSxLQUFBO2dCQUNBLFFBQUEsS0FBQSxnQkFBQTs7OztRQUlBLEtBQUEsbUJBQUEsU0FBQSxNQUFBLFVBQUE7WUFDQSxNQUFBO2dCQUNBLFNBQUE7Z0JBQ0EsTUFBQSxZQUFBLEtBQUE7ZUFDQSxLQUFBLFNBQUEsZ0JBQUEsVUFBQTtnQkFDQSxLQUFBLFVBQUEsU0FBQTtnQkFDQSxTQUFBO2VBQ0EsS0FBQTs7O1FBR0EsS0FBQSxRQUFBLFNBQUEsVUFBQTtZQUNBLFFBQUEsSUFBQTs7Ozs7QUN2Q0EsSUFBQSxXQUFBLFlBQUE7Q0FDQSxXQUFBO0VBQ0EsUUFBQSxJQUFBOzs7QUNGQSxJQUFBLFdBQUEsZUFBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFNBQUEsT0FBQSxTQUFBLGFBQUEsT0FBQSxTQUFBLE9BQUE7O1FBRUEsT0FBQSxVQUFBO1FBQ0EsT0FBQSxVQUFBLFNBQUEsWUFBQSxhQUFBO1FBQ0EsT0FBQSxRQUFBOztRQUVBLE9BQUEsT0FBQSxXQUFBO1lBQ0EsT0FBQSxhQUFBLE9BQUEsU0FBQTtZQUNBLE9BQUE7WUFDQSxTQUFBLFdBQUE7Z0JBQ0EsT0FBQSxVQUFBO2VBQ0EsT0FBQSxVQUFBOzs7UUFHQSxPQUFBLGVBQUEsU0FBQSxVQUFBO1lBQ0EsT0FBQSxPQUFBLE9BQUEsUUFBQSxTQUFBOzs7UUFHQSxPQUFBLGFBQUEsV0FBQTtZQUNBLE1BQUEsSUFBQSxXQUFBLE9BQUEsUUFBQSxNQUFBLFNBQUEsTUFBQTtnQkFDQSxPQUFBLE1BQUEsS0FBQTtnQkFDQSxRQUFBLElBQUEsT0FBQTs7OztRQUlBLE9BQUEsV0FBQSxTQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBOzs7O0FDckNB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TUFBQSxjQUFBLFdBQUE7b0JBQ0EsT0FBQSxHQUFBOzs7Z0JBR0EsTUFBQTs7WUFFQSxhQUFBOzs7OztBQ3pEQSxJQUFBLFFBQUEsWUFBQTtJQUNBO0lBQ0E7SUFDQSxTQUFBLGdCQUFBLGtCQUFBOztRQUVBLEtBQUEsY0FBQSxTQUFBLGFBQUE7WUFDQSxPQUFBO2dCQUNBLEtBQUE7b0JBQ0EsT0FBQTtnQkFDQSxLQUFBO29CQUNBLE9BQUE7Z0JBQ0E7b0JBQ0EsUUFBQSxNQUFBOzs7OztBQ1pBLElBQUEsUUFBQSxvQkFBQTtJQUNBLFdBQUE7O1FBRUEsS0FBQSxRQUFBOzs7QUNIQSxJQUFBLFFBQUEsa0JBQUE7SUFDQSxXQUFBOztRQUVBLEtBQUEsT0FBQTs7UUFFQSxLQUFBLG1CQUFBO1FBQ0EsS0FBQSxtQkFBQTtRQUNBLEtBQUEsbUJBQUE7UUFDQSxLQUFBLG1CQUFBO1FBQ0EsS0FBQSxtQkFBQTtRQUNBLEtBQUEsbUJBQUE7O1FBRUEsS0FBQSxXQUFBLFNBQUEsVUFBQTtZQUNBLE9BQUE7Z0JBQ0EsS0FBQTtvQkFDQSxPQUFBO3dCQUNBLGtCQUFBO3dCQUNBLGtCQUFBLEtBQUE7O2dCQUVBLEtBQUE7b0JBQ0EsT0FBQTt3QkFDQSxRQUFBOztnQkFFQTtvQkFDQSxRQUFBLE1BQUE7Ozs7R0FJQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXBwID0gYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsndWkucm91dGVyJywnbmdTYW5pdGl6ZScsJ2hsanMnXSk7XHJcblxyXG5BcHAuY29uZmlnKFtcclxuICAgICckc3RhdGVQcm92aWRlcicsXHJcbiAgICBmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlICgnaG9tZScse1xyXG4gICAgICAgICAgICB1cmw6ICcvaG9tZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlICgncmVzdW1lJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9yZXN1bWUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3Jlc3VtZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Jlc3VtZUN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2plY3QnLHtcclxuICAgICAgICAgICAgdXJsOiAnL3Byb2plY3RzL3twcm9qZWN0fScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcHJvamVjdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDdHJsJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5dKTtcclxuXHJcbkFwcC5jb25maWcoW1xyXG4gICAgJ2hsanNTZXJ2aWNlUHJvdmlkZXInLFxyXG4gICAgZnVuY3Rpb24oaGxqc1NlcnZpY2VQcm92aWRlcikge1xyXG4gICAgICAgIGhsanNTZXJ2aWNlUHJvdmlkZXIuc2V0T3B0aW9ucyh7XHJcbiAgICAgICAgICAgIHRhYlJlcGxhY2UgOiAnICAgICdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXSk7XHJcblxyXG5BcHAucnVuKFtcclxuICAgICckc3RhdGUnLFxyXG4gICAgZnVuY3Rpb24oJHN0YXRlKSB7XHJcbiAgICAgICAgaWYoJHN0YXRlLmN1cnJlbnQudXJsID09ICdeJykge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbl0pO1xyXG5cclxuQXBwLmNvbnN0YW50KCdDT05GSUcnLCB7XHJcbiAgICBsYW5ndWFnZSA6IHtcclxuICAgICAgICBkZWZhdWx0IDogJ2ZyZW5jaCdcclxuICAgIH0sXHJcbiAgICBhbmltYXRpb24gOiB7XHJcbiAgICAgICAgc3RhcnQgOiAxMDAwXHJcbiAgICB9IFxyXG59KTtcclxuIiwiQXBwLnNlcnZpY2UoJ2NvZGVzJywgW1xyXG4gICAgJyRodHRwJyxcclxuICAgIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSAgICA6ICdKYXZhU2NyaXB0JyxcclxuICAgICAgICAgICAgICAgIGRhdGUgICAgICAgIDogMjAxNixcclxuICAgICAgICAgICAgICAgIHByb2plY3QgICAgIDogJ3p6emVscCcsXHJcbiAgICAgICAgICAgICAgICBmaWxlICAgICAgICA6ICdhamF4LmpzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihmaWx0ZXJfdHlwZSwgdmFsdWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2RlcyA9IHRoYXQuZmlsdGVyKGZpbHRlcl90eXBlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldF9maWxlX2NvbnRlbnQoY29kZXNbaV0sIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyX3R5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0Lmxpc3QuZmlsdGVyKGZ1bmN0aW9uKGNvZGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjb2RlW2ZpbHRlcl90eXBlXSA9PSB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0X2ZpbGVfY29udGVudCA9IGZ1bmN0aW9uKGNvZGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZCA6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9maWxlcy8nICsgY29kZS5maWxlXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gc3VjY2Vzc0NhbGxiYWNrKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlLmNvbnRlbnQgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY29kZSk7XHJcbiAgICAgICAgICAgIH0sIHRoYXQuZXJyb3IpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7ICBcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXSk7IiwiQXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgW1xyXG5cdGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ0hvbWVDdHJsJyk7XHJcblx0fVxyXG5dKTsiLCJBcHAuY29udHJvbGxlcignUHJvamVjdEN0cmwnLCBbXHJcbiAgICAnJHNjb3BlJyxcclxuICAgICckdGltZW91dCcsXHJcbiAgICAnJHN0YXRlUGFyYW1zJyxcclxuICAgICdDT05GSUcnLFxyXG4gICAgJ3Byb2plY3RzJyxcclxuICAgICdjb2RlcycsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsJHN0YXRlUGFyYW1zLENPTkZJRyxwcm9qZWN0cyxjb2Rlcykge1xyXG5cclxuICAgICAgICAkc2NvcGUuYWZmaWNoZSA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5wcm9qZWN0ID0gcHJvamVjdHMuZ2V0X3Byb2plY3QoJHN0YXRlUGFyYW1zLnByb2plY3QpO1xyXG4gICAgICAgICRzY29wZS5jb2RlcyA9IFtdO1xyXG5cclxuICAgICAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0X2xhbmd1YWdlKENPTkZJRy5sYW5ndWFnZS5kZWZhdWx0KTtcclxuICAgICAgICAgICAgJHNjb3BlLmxvYWRfY29kZXMoKTtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWZmaWNoZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIENPTkZJRy5hbmltYXRpb24uc3RhcnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaHRtbCA9ICRzY29wZS5wcm9qZWN0LmdldF9odG1sKGxhbmd1YWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUubG9hZF9jb2RlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb2Rlcy5nZXQoJ3Byb2plY3QnLCAkc2NvcGUucHJvamVjdC5uYW1lLCBmdW5jdGlvbihjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29kZXMucHVzaChjb2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb2Rlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5hZGRfY29kZSA9IGZ1bmN0aW9uKGNvZGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY29kZSk7ICBcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbl0pOyIsIkFwcC5jb250cm9sbGVyKCdSZXN1bWVDdHJsJywgW1xyXG4gICAgJyRzY29wZScsXHJcbiAgICAnJHRpbWVvdXQnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsQ09ORklHKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UoQ09ORklHLmxhbmd1YWdlLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hZmZpY2hlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgQ09ORklHLmFuaW1hdGlvbi5zdGFydCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldF9sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJlbmNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25zIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRm9ybWF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ1RlbGVjb20gTGlsbGUsIFVuaXZlcnNpdMOpIExpbGxlIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE1LTIwMTgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdMaWxsZSwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnRXR1ZGVzIGVuIGluZm9ybWF0aXF1ZSwgcsOpc2VhdSwgdGjDqW9yaWUgZHUgc2lnbmFsIGV0IMOpY29ub21pZS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMeWPDqWUgQmVydGhvbGxldCwgQ2xhc3NlIFByw6lwYXJhdG9pcmUgYXV4IEdyYW5kZXMgRWNvbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxMyAtIDIwMTUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdBbm5lY3ksIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ01QU0kgLSBNUCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0x5Y8OpZSBFZG91YXJkIEhlcnJpb3QsIEJhY2NhbGF1csOpYXQgUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdWb2lyb24sIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ01lbnRpb24gVHLDqHMgQmllbi4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnU3RhZ2VzIGV0IFByb2pldHMgUGVyc29ubmVscycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdTdGFnZSBlbiB0YW50IHF1ZSBkw6l2ZWxvcHBldXIgV2ViIMOgIE15TWluaUZhY3RvcnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE2IC0gNCBtb2lzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnTG9uZHJlcywgQW5nbGV0ZXJyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ0Nyw6lhdGlvbiBkXFwndW5lIEFQSSBSRVNUIHBvdXIgdW5lIHBsYXRlZm9ybWUgZGUgY3LDqWF0aW9uIGRcXCdvYmpldHMgM0QuPGJyPkFtw6lsaW9yYXRpb24gZGUgbGEgcGxhdGVmb3JtZSBleGlzdGFudGUgYXZlYyBBbmd1bGFySlMgZXQgTm9kZS5KUy4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdDcsOpYXRpb24gZXQgZ2VzdGlvbm5haXJlIGRlIFp6emVscCAoaHR0cDovL3p6emVscC5mciknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDEzIC0gMjAxNicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ1BsYXRlZm9ybWUgZW4gbGlnbmUgdmlzYW50IMOgIGFtw6lsaW9yZXIgbFxcJ2V4cMOpcmllbmNlIHV0aWxpc2F0ZXVyIGR1IGpldSBlbiBsaWduZSBGb3VybWl6enouPGJyPkxlIHNpdGUgY29tcHRlIGFjdHVlbGxlbWVudCBwbHVzIGRlIDUgMDAwIHV0aWxpc2F0ZXVycyByw6lndWxpZXJzLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0V0dWRlIGRlIGxcXCdhbGdvcml0aG1lIGR1IFBhZ2VSYW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ0V0dWRlIG1hdGjDqW1hdGlxdWUgZHUgUGFnZVJhbmsgKGFsZ29yaXRobWUgaGlzdG9yaXF1ZSBkZSBHb29nbGUpLiBDYWxjdWwgZHUgUGFnZVJhbmsgZGUgV2lraXDDqWRpYSBGcmFuY2UuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaHRtbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhpcyBsYW5ndWFnZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLmh0bWwuc2tpbGxzID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRnJvbnQtZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdKYXZhU2NyaXB0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ0FuZ3VsYXJKUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdKcXVlcnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzLjVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdDU1MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzLjVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnQmFjay1lbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDogJ1BIUCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdEamFuZ28nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnTm9kZS5KUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdNeVNRTCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IDMuNVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbl0pOyIsIkFwcC5kaXJlY3RpdmUoXCJoZWFkZXJCYXJcIiwgW1xyXG5cdCckdGltZW91dCcsXHJcblx0J0NPTkZJRycsXHJcbiAgXHRmdW5jdGlvbigkdGltZW91dCxDT05GSUcpIHtcclxuICAgIFx0cmV0dXJuIHtcclxuXHQgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcblx0ICAgICAgICBzY29wZSA6IHRydWUsXHJcblx0ICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHQgICAgICAgIFx0c2NvcGUuYWZmaWNoZSA9IGZhbHNlO1xyXG5cclxuXHQgICAgICAgIFx0c2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICAgXHRcdFx0c2NvcGUuYWZmaWNoZSA9IHRydWU7XHJcblx0ICAgICAgICBcdFx0fSwgQ09ORklHLmFuaW1hdGlvbi5zdGFydCk7XHJcblx0ICAgICAgICBcdH07XHJcblxyXG5cdCAgICAgICAgXHRzY29wZS5pbml0KCk7XHJcblx0ICAgICAgIFx0fSxcclxuXHQgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaGVhZGVyLWJhci5odG1sJ1xyXG4gICAgXHR9O1xyXG4gIFx0fVxyXG5dKTtcclxuIiwiQXBwLmRpcmVjdGl2ZShcIm5hdkJhclwiLCBbXHJcbiAgICAnJHJvb3RTY29wZScsXHJcbiAgICAnJHRpbWVvdXQnLFxyXG4gICAgJyRzdGF0ZScsXHJcbiAgICAnQ09ORklHJyxcclxuICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsJHRpbWVvdXQsJHN0YXRlLENPTkZJRykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlIDogdHJ1ZSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZShDT05GSUcubGFuZ3VhZ2UuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmFmZmljaGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIENPTkZJRy5hbmltYXRpb24uc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5jaGFuZ2VfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlX2xhbmd1YWdlJywgbGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZShsYW5ndWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNldF9sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZyZW5jaCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaHRtbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAnRG9ubsOpZXMgcGVyc29ubmVsbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2UgICAgICAgICAgICAgOiAnYW5zJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICAgICAgICAgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bWUgICAgICAgICAgOiAnQ3VycmljdWx1bSBWaXRhZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdHNfdGl0bGUgIDogJ1Byb2pldHMgcsOpYWxpc8OpcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VzICAgICAgIDogJ0xhbmdhZ2VzIG1haXRyaXPDqXMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgICAgIDogJ1BlcnNvbmFsIGRhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZSAgICAgICAgICAgICA6ICd5bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSAgICAgICAgIDogJ0ZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdW1lICAgICAgICAgIDogJ1Jlc3VtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdHNfdGl0bGUgIDogJ1Byb2plY3RzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZXMgICAgICAgOiAnUHJvZ3JhbW1pbmcgbGFuZ3VhZ2VzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuc2hvd19yZXN1bWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Jlc3VtZScpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5pbml0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbmF2LWJhci5odG1sJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbl0pO1xyXG4iLCJBcHAuc2VydmljZSgncHJvamVjdHMnLCBbXHJcbiAgICAncHJvamVjdF96enplbHAnLFxyXG4gICAgJ3Byb2plY3RfcGFnZXJhbmsnLFxyXG4gICAgZnVuY3Rpb24ocHJvamVjdF96enplbHAsIHByb2plY3RfcGFnZXJhbmspIHtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRfcHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3Rfc3RyKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChwcm9qZWN0X3N0cikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnenp6ZWxwJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Rfenp6ZWxwO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnZXJhbmsnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdF9wYWdlcmFuaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgcHJvamVjdCBkb2VzblxcJ3QgZXhpc3QnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7IiwiQXBwLnNlcnZpY2UoJ3Byb2plY3RfcGFnZXJhbmsnLCBbXHJcbiAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy50aXRsZSA9ICdQYWdlUmFuayc7XHJcbiAgICB9XHJcbl0pOyIsIkFwcC5zZXJ2aWNlKCdwcm9qZWN0X3p6emVscCcsIFtcclxuICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSAnenp6ZWxwJztcclxuXHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgPSAgJzxwPlp6emVscCBlc3QgdW5lIHBsYXRlZm9ybWUgcGVybWV0dGFudCBkXFwnZW5yaWNoaXIgbFxcJ2V4cMOpcmllbmNlIHV0aWxpc2F0ZXVyIHN1ciBsZSBqZXUgZW4gbGlnbmUgRm91cm1penp6Ljxicj4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdJbCBtZXQgw6AgZGlzcG9zaXRpb24gZGVzIGpvdWV1cnMgdW5lIHPDqXJpZSBkXFwnb3V0aWxzIHZpc2FudCDDoCBsYSBmb2lzIMOgIGF1Z21lbnRlciBsZXVyIHByb2R1Y3Rpdml0w6kgZXQgw6AgcmVuZHJlIGxlIGpldSBwbHVzIGFncsOpYWJsZSBhdSBxdW90aWRpZW4uICc7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJ0xlIHNpdGUgY29tcG9ydGUgYWluc2kgZGVzIGFpZGVzIGRlIGpldSwgZGVzIGluZGljYXRldXJzIGRlIHBlcmZvcm1hbmNlIG91IGVuY29yZSBkZXMgb3V0aWxzIGRlIGdlc3Rpb24uPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPlVuZSBleHRlbnNpb24gQ2hyb21lIGV0IEZpcmVmb3ggZXN0IMOpZ2FsZW1lbnQgcHJvcG9zw6llIGV0IG9mZnJlIHRvdXQgdW4gZW5zZW1ibGUgZFxcJ2Ftw6lsaW9yYXRpb25zIGdyYXBoaXF1ZXMgZXQgZFxcJ2FuYWx5c2VzIGRlcyBkb25uw6llcyBkdSBqZXUuPC9wPic7XHJcbiAgICAgICAgdGhpcy5wcmVzZW50YXRpb25fZnIgKz0gJzxwPkxhIHBsYXRlZm9ybWUgZXN0IGVudGnDqHJlbWVudCBmaW5hbmPDqWUgcGFyIHNhIGNvbW11bmF1dMOpIGdyw6JjZSDDoCB1biBmaW5hbmNlbWVudCBwYXJ0aWNpcGF0aWYgYXlhbnQgcsOpY29sdMOpIDQ2NeKCrCDDoCBsYSBmaW4gZGUgbFxcJ2FubsOpZSAyMDE0LjwvcD4nO1xyXG4gICAgICAgIHRoaXMucHJlc2VudGF0aW9uX2ZyICs9ICdRdWVscXVlcyB2YWxldXJzIGNsw6llcyA6IDxicj48dWw+PGxpPn4gNCAwMDAgY29tcHRlcyBhY3RpZnM8L2xpPjxsaT5+IDQgMDAwIDAwMCBwYWdlcyB2dWVzIHBhciBtb2lzPC9saT48bGk+fiAzMCAwMDAgbGlnbmVzIGRlIGNvZGU8L2xpPjwvdWw+JztcclxuXHJcbiAgICAgICAgdGhpcy5nZXRfaHRtbCA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJlbmNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgICAgICAgIDogJ1p6emVscCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlbnRhdGlvbiAgICA6IHRoaXMucHJlc2VudGF0aW9uX2ZyXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6ICdaenplbHAnXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
