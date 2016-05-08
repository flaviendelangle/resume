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
