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
