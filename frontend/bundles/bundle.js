var App = angular.module('App', ['ui.router']);

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
	'CONFIG',
  	function($rootScope,$timeout,CONFIG) {
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
	        					title 		: 'Données personnelles',
	        					age 		: 'ans',
	        					country 	: '',
	        					resume 		: 'Curriculum Vitae',
	        					projects 	: 'Projets réalisés',
	        					languages	: 'Lnagages maitrisés'
	        				};
	        				break;
	        			case 'english' :
	        				scope.html = {
	        					title 		: 'Personal data',
	        					age 		: 'yo',
	        					country 	: 'France',
	        					resume		: 'Resume',
	        					projects	: 'Projects',
	        					languages	: 'Programming languages'
	        				};
	        				break;
	        			default :
	        				console.error('This language is not yet implemented');
	        		}
	        	};

	        	scope.init();
	       	},
	        templateUrl: 'partials/nav-bar.html'
    	};
  	}
]);

App.controller('HomeCtrl', [
	function() {
		console.log('HomeCtrl');
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
                                        details : 'Création d\'une API REST pour une plateforme de création d\'objets 3D. Amélioration de la plateforme existante avec AngularJS et Node.JS.'
                                    },{
                                        title   : 'Création et gestionnaire de Zzzelp (http://zzzelp.fr)',
                                        year    : '2013 - 2016',
                                        place   : '',
                                        details : 'Plateforme en ligne visant à améliorer l\'expérience utilisateur du jeu en ligne Fourmizzz. Le site compte actuellement plus de 5 000 utilisateurs réguliers.'
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
                    scope.html = {
                    };
                    break;
                default :
                    console.error('This language is not yet implemented');
            }
        };


        $scope.init();

    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRpcmVjdGl2ZXMvaGVhZGVyLWJhci5qcyIsImRpcmVjdGl2ZXMvbmF2LWJhci5qcyIsImNvbnRyb2xsZXJzL0hvbWUuanMiLCJjb250cm9sbGVycy9SZXN1bWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBLFFBQUEsT0FBQSxPQUFBLENBQUE7O0FBRUEsSUFBQSxPQUFBO0lBQ0E7SUFDQSxTQUFBLGdCQUFBO1FBQ0E7U0FDQSxPQUFBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsYUFBQTtZQUNBLFlBQUE7O1NBRUEsT0FBQSxTQUFBO1lBQ0EsS0FBQTtZQUNBLGFBQUE7WUFDQSxZQUFBOzs7OztBQUtBLElBQUEsSUFBQTtJQUNBO0lBQ0EsU0FBQSxRQUFBO1FBQ0EsR0FBQSxPQUFBLFFBQUEsT0FBQSxLQUFBO1lBQ0EsT0FBQSxHQUFBOzs7OztBQUtBLElBQUEsU0FBQSxVQUFBO0lBQ0EsV0FBQTtRQUNBLFVBQUE7O0lBRUEsWUFBQTtRQUNBLFFBQUE7Ozs7QUNqQ0EsSUFBQSxVQUFBLGFBQUE7Q0FDQTtDQUNBO0dBQ0EsU0FBQSxTQUFBLFFBQUE7S0FDQSxPQUFBO1NBQ0EsVUFBQTtTQUNBLFFBQUE7U0FDQSxNQUFBLFNBQUEsT0FBQSxTQUFBLE9BQUE7VUFDQSxNQUFBLFVBQUE7O1VBRUEsTUFBQSxPQUFBLFdBQUE7V0FDQSxTQUFBLFdBQUE7WUFDQSxNQUFBLFVBQUE7Y0FDQSxPQUFBLFVBQUE7OztVQUdBLE1BQUE7O1NBRUEsYUFBQTs7Ozs7QUNsQkEsSUFBQSxVQUFBLFVBQUE7Q0FDQTtDQUNBO0NBQ0E7R0FDQSxTQUFBLFdBQUEsU0FBQSxRQUFBO0tBQ0EsT0FBQTtTQUNBLFVBQUE7U0FDQSxRQUFBO1NBQ0EsTUFBQSxTQUFBLE9BQUEsU0FBQSxPQUFBO1VBQ0EsTUFBQSxVQUFBOztVQUVBLE1BQUEsT0FBQSxXQUFBO1dBQ0EsTUFBQSxhQUFBLE9BQUEsU0FBQTtXQUNBLFNBQUEsV0FBQTtZQUNBLE1BQUEsVUFBQTtjQUNBLE9BQUEsVUFBQTs7O1VBR0EsTUFBQSxrQkFBQSxTQUFBLFVBQUE7V0FDQSxXQUFBLFdBQUEsbUJBQUE7V0FDQSxNQUFBLGFBQUE7OztVQUdBLE1BQUEsZUFBQSxTQUFBLFVBQUE7V0FDQSxPQUFBO1lBQ0EsS0FBQTthQUNBLE1BQUEsT0FBQTtjQUNBLFVBQUE7Y0FDQSxRQUFBO2NBQ0EsV0FBQTtjQUNBLFdBQUE7Y0FDQSxZQUFBO2NBQ0EsWUFBQTs7YUFFQTtZQUNBLEtBQUE7YUFDQSxNQUFBLE9BQUE7Y0FDQSxVQUFBO2NBQ0EsUUFBQTtjQUNBLFdBQUE7Y0FDQSxVQUFBO2NBQ0EsV0FBQTtjQUNBLFlBQUE7O2FBRUE7WUFDQTthQUNBLFFBQUEsTUFBQTs7OztVQUlBLE1BQUE7O1NBRUEsYUFBQTs7Ozs7QUNwREEsSUFBQSxXQUFBLFlBQUE7Q0FDQSxXQUFBO0VBQ0EsUUFBQSxJQUFBOzs7QUNGQSxJQUFBLFdBQUEsY0FBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFNBQUEsT0FBQSxTQUFBLFFBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLE9BQUEsT0FBQSxXQUFBO1lBQ0EsT0FBQSxhQUFBLE9BQUEsU0FBQTtZQUNBLFNBQUEsV0FBQTtnQkFDQSxPQUFBLFVBQUE7ZUFDQSxPQUFBLFVBQUE7OztRQUdBLE9BQUEsZUFBQSxTQUFBLFVBQUE7WUFDQSxPQUFBO2dCQUNBLEtBQUE7b0JBQ0EsT0FBQSxPQUFBO3dCQUNBLFdBQUE7NEJBQ0E7Z0NBQ0EsVUFBQTtnQ0FDQSxVQUFBO29DQUNBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7c0NBQ0E7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTtzQ0FDQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBOzs7OzRCQUlBO2dDQUNBLFVBQUE7Z0NBQ0EsVUFBQTtvQ0FDQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3NDQUNBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7c0NBQ0E7d0NBQ0EsVUFBQTt3Q0FDQSxVQUFBO3dDQUNBLFVBQUE7d0NBQ0EsVUFBQTs7Ozs7O29CQU1BO2dCQUNBLEtBQUE7b0JBQ0EsTUFBQSxPQUFBOztvQkFFQTtnQkFDQTtvQkFDQSxRQUFBLE1BQUE7Ozs7O1FBS0EsT0FBQTs7O0dBR0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdBcHAnLCBbJ3VpLnJvdXRlciddKTtcclxuXHJcbkFwcC5jb25maWcoW1xyXG4gICAgJyRzdGF0ZVByb3ZpZGVyJyxcclxuICAgIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUgKCdob21lJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9ob21lJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUgKCdyZXN1bWUnLHtcclxuICAgICAgICAgICAgdXJsOiAnL3Jlc3VtZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcmVzdW1lLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUmVzdW1lQ3RybCdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXSk7XHJcblxyXG5BcHAucnVuKFtcclxuICAgICckc3RhdGUnLFxyXG4gICAgZnVuY3Rpb24oJHN0YXRlKSB7XHJcbiAgICAgICAgaWYoJHN0YXRlLmN1cnJlbnQudXJsID09ICdeJykge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbl0pO1xyXG5cclxuQXBwLmNvbnN0YW50KCdDT05GSUcnLCB7XHJcbiAgICBsYW5ndWFnZSA6IHtcclxuICAgICAgICBkZWZhdWx0IDogJ2ZyZW5jaCdcclxuICAgIH0sXHJcbiAgICBhbmltYXRpb24gOiB7XHJcbiAgICAgICAgc3RhcnQgOiAxMDAwXHJcbiAgICB9IFxyXG59KTtcclxuIiwiQXBwLmRpcmVjdGl2ZShcImhlYWRlckJhclwiLCBbXHJcblx0JyR0aW1lb3V0JyxcclxuXHQnQ09ORklHJyxcclxuICBcdGZ1bmN0aW9uKCR0aW1lb3V0LENPTkZJRykge1xyXG4gICAgXHRyZXR1cm4ge1xyXG5cdCAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuXHQgICAgICAgIHNjb3BlIDogdHJ1ZSxcclxuXHQgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG5cdCAgICAgICAgXHRzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcblxyXG5cdCAgICAgICAgXHRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0ICAgICAgICBcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0ICAgICAgICBcdFx0XHRzY29wZS5hZmZpY2hlID0gdHJ1ZTtcclxuXHQgICAgICAgIFx0XHR9LCBDT05GSUcuYW5pbWF0aW9uLnN0YXJ0KTtcclxuXHQgICAgICAgIFx0fTtcclxuXHJcblx0ICAgICAgICBcdHNjb3BlLmluaXQoKTtcclxuXHQgICAgICAgXHR9LFxyXG5cdCAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9oZWFkZXItYmFyLmh0bWwnXHJcbiAgICBcdH07XHJcbiAgXHR9XHJcbl0pO1xyXG4iLCJBcHAuZGlyZWN0aXZlKFwibmF2QmFyXCIsIFtcclxuXHQnJHJvb3RTY29wZScsXHJcblx0JyR0aW1lb3V0JyxcclxuXHQnQ09ORklHJyxcclxuICBcdGZ1bmN0aW9uKCRyb290U2NvcGUsJHRpbWVvdXQsQ09ORklHKSB7XHJcbiAgICBcdHJldHVybiB7XHJcblx0ICAgICAgICByZXN0cmljdDogJ0UnLFxyXG5cdCAgICAgICAgc2NvcGUgOiB0cnVlLFxyXG5cdCAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblx0ICAgICAgICBcdHNjb3BlLmFmZmljaGUgPSBmYWxzZTtcclxuXHJcblx0ICAgICAgICBcdHNjb3BlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHQgICAgICAgIFx0XHRzY29wZS5zZXRfbGFuZ3VhZ2UoQ09ORklHLmxhbmd1YWdlLmRlZmF1bHQpO1xyXG5cdCAgICAgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICAgXHRcdFx0c2NvcGUuYWZmaWNoZSA9IHRydWU7XHJcblx0ICAgICAgICBcdFx0fSwgQ09ORklHLmFuaW1hdGlvbi5zdGFydCk7XHJcblx0ICAgICAgICBcdH07XHJcblxyXG5cdCAgICAgICAgXHRzY29wZS5jaGFuZ2VfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG5cdCAgICAgICAgXHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlX2xhbmd1YWdlJywgbGFuZ3VhZ2UpO1xyXG5cdCAgICAgICAgXHRcdHNjb3BlLnNldF9sYW5ndWFnZShsYW5ndWFnZSk7XHJcblx0ICAgICAgICBcdH07XHJcblxyXG5cdCAgICAgICAgXHRzY29wZS5zZXRfbGFuZ3VhZ2UgPSBmdW5jdGlvbihsYW5ndWFnZSkge1xyXG5cdCAgICAgICAgXHRcdHN3aXRjaChsYW5ndWFnZSkge1xyXG5cdCAgICAgICAgXHRcdFx0Y2FzZSAnZnJlbmNoJyA6XHJcblx0ICAgICAgICBcdFx0XHRcdHNjb3BlLmh0bWwgPSB7XHJcblx0ICAgICAgICBcdFx0XHRcdFx0dGl0bGUgXHRcdDogJ0Rvbm7DqWVzIHBlcnNvbm5lbGxlcycsXHJcblx0ICAgICAgICBcdFx0XHRcdFx0YWdlIFx0XHQ6ICdhbnMnLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdGNvdW50cnkgXHQ6ICcnLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdHJlc3VtZSBcdFx0OiAnQ3VycmljdWx1bSBWaXRhZScsXHJcblx0ICAgICAgICBcdFx0XHRcdFx0cHJvamVjdHMgXHQ6ICdQcm9qZXRzIHLDqWFsaXPDqXMnLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdGxhbmd1YWdlc1x0OiAnTG5hZ2FnZXMgbWFpdHJpc8OpcydcclxuXHQgICAgICAgIFx0XHRcdFx0fTtcclxuXHQgICAgICAgIFx0XHRcdFx0YnJlYWs7XHJcblx0ICAgICAgICBcdFx0XHRjYXNlICdlbmdsaXNoJyA6XHJcblx0ICAgICAgICBcdFx0XHRcdHNjb3BlLmh0bWwgPSB7XHJcblx0ICAgICAgICBcdFx0XHRcdFx0dGl0bGUgXHRcdDogJ1BlcnNvbmFsIGRhdGEnLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdGFnZSBcdFx0OiAneW8nLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdGNvdW50cnkgXHQ6ICdGcmFuY2UnLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdHJlc3VtZVx0XHQ6ICdSZXN1bWUnLFxyXG5cdCAgICAgICAgXHRcdFx0XHRcdHByb2plY3RzXHQ6ICdQcm9qZWN0cycsXHJcblx0ICAgICAgICBcdFx0XHRcdFx0bGFuZ3VhZ2VzXHQ6ICdQcm9ncmFtbWluZyBsYW5ndWFnZXMnXHJcblx0ICAgICAgICBcdFx0XHRcdH07XHJcblx0ICAgICAgICBcdFx0XHRcdGJyZWFrO1xyXG5cdCAgICAgICAgXHRcdFx0ZGVmYXVsdCA6XHJcblx0ICAgICAgICBcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1RoaXMgbGFuZ3VhZ2UgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG5cdCAgICAgICAgXHRcdH1cclxuXHQgICAgICAgIFx0fTtcclxuXHJcblx0ICAgICAgICBcdHNjb3BlLmluaXQoKTtcclxuXHQgICAgICAgXHR9LFxyXG5cdCAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9uYXYtYmFyLmh0bWwnXHJcbiAgICBcdH07XHJcbiAgXHR9XHJcbl0pO1xyXG4iLCJBcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBbXHJcblx0ZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygnSG9tZUN0cmwnKTtcclxuXHR9XHJcbl0pOyIsIkFwcC5jb250cm9sbGVyKCdSZXN1bWVDdHJsJywgW1xyXG4gICAgJyRzY29wZScsXHJcbiAgICAnJHRpbWVvdXQnLFxyXG4gICAgJ0NPTkZJRycsXHJcbiAgICBmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsQ09ORklHKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5hZmZpY2hlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRfbGFuZ3VhZ2UoQ09ORklHLmxhbmd1YWdlLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hZmZpY2hlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgQ09ORklHLmFuaW1hdGlvbi5zdGFydCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldF9sYW5ndWFnZSA9IGZ1bmN0aW9uKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJlbmNoJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmh0bWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25zIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnRm9ybWF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ1RlbGVjb20gTGlsbGUsIFVuaXZlcnNpdMOpIExpbGxlIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE1LTIwMTgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdMaWxsZSwgRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHMgOiAnRXR1ZGVzIGVuIGluZm9ybWF0aXF1ZSwgcsOpc2VhdSwgdGjDqW9yaWUgZHUgc2lnbmFsIGV0IMOpY29ub21pZS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdMeWPDqWUgQmVydGhvbGxldCwgQ2xhc3NlIFByw6lwYXJhdG9pcmUgYXV4IEdyYW5kZXMgRWNvbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxMyAtIDIwMTUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdBbm5lY3ksIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ01QU0kgLSBNUCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0x5Y8OpZSBFZG91YXJkIEhlcnJpb3QsIEJhY2NhbGF1csOpYXQgUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgIDogJzIwMTMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgICA6ICdWb2lyb24sIEZyYW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ01lbnRpb24gVHLDqHMgQmllbi4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICAgOiAnU3RhZ2VzIGV0IFByb2pldHMgUGVyc29ubmVscycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdTdGFnZSBlbiB0YW50IHF1ZSBkw6l2ZWxvcHBldXIgV2ViIMOgIE15TWluaUZhY3RvcnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDE2IC0gNCBtb2lzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlICAgOiAnTG9uZHJlcywgQW5nbGV0ZXJyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ0Nyw6lhdGlvbiBkXFwndW5lIEFQSSBSRVNUIHBvdXIgdW5lIHBsYXRlZm9ybWUgZGUgY3LDqWF0aW9uIGRcXCdvYmpldHMgM0QuIEFtw6lsaW9yYXRpb24gZGUgbGEgcGxhdGVmb3JtZSBleGlzdGFudGUgYXZlYyBBbmd1bGFySlMgZXQgTm9kZS5KUy4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgICA6ICdDcsOpYXRpb24gZXQgZ2VzdGlvbm5haXJlIGRlIFp6emVscCAoaHR0cDovL3p6emVscC5mciknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciAgICA6ICcyMDEzIC0gMjAxNicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ1BsYXRlZm9ybWUgZW4gbGlnbmUgdmlzYW50IMOgIGFtw6lsaW9yZXIgbFxcJ2V4cMOpcmllbmNlIHV0aWxpc2F0ZXVyIGR1IGpldSBlbiBsaWduZSBGb3VybWl6enouIExlIHNpdGUgY29tcHRlIGFjdHVlbGxlbWVudCBwbHVzIGRlIDUgMDAwIHV0aWxpc2F0ZXVycyByw6lndWxpZXJzLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSAgIDogJ0V0dWRlIGRlIGxcXCdhbGdvcml0aG1lIGR1IFBhZ2VSYW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgICAgOiAnMjAxNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzIDogJ0V0dWRlIG1hdGjDqW1hdGlxdWUgZHUgUGFnZVJhbmsgKGFsZ29yaXRobWUgaGlzdG9yaXF1ZSBkZSBHb29nbGUpLiBDYWxjdWwgZHUgUGFnZVJhbmsgZGUgV2lraXDDqWRpYSBGcmFuY2UuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZ2xpc2gnIDpcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5odG1sID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGlzIGxhbmd1YWdlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUuaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
