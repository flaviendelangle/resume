App.controller('ProjectCtrl', [
    '$scope',
    '$timeout',
    '$stateParams',
    '$window',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$timeout,$stateParams,$window,CONFIG,projects,codes) {

        $scope.affiche = false;
        $scope.project = projects.get_project($stateParams.project);
        $scope.codes = [];

        $scope.init = function() {
            $scope.set_language(CONFIG.language.default);
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

        $scope.add_code = function(code) {
            console.log(code);  
        };


        $scope.init();

    }
]);