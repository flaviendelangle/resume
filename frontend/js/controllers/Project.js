App.controller('ProjectCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$stateParams',
    '$window',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$rootScope,$timeout,$stateParams,$window,CONFIG,projects,codes) {
        console.log($stateParams.project);
        $scope.affiche = false;
        $scope.project = projects.get_project($stateParams.project);
        $scope.codes = [];

        $scope.init = function() {
            $scope.set_language(localStorage.getItem('language'));
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
            });
        };

        $scope.init();

        $rootScope.$on('change_language', function(event, language) {
            $scope.set_language(language);
        });

    }
]);