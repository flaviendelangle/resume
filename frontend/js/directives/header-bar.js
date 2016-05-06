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
