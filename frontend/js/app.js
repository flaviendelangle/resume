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
