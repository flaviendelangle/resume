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
