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
