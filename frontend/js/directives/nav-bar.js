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
