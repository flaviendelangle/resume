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
