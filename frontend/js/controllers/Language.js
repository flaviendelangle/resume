App.controller('LanguageCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$stateParams',
    '$window',
    'CONFIG',
    'projects',
    'codes',
    function($scope,$rootScope,$timeout,$stateParams,$window,CONFIG,projects,codes) {

        $scope.affiche = false;
        $scope.codes = [];
        $scope.language = $stateParams.language;

        $scope.init = function() {
            $scope.set_language(CONFIG.language.default);
            $scope.load_codes();
            $timeout(function() {
                $scope.affiche = true;
            }, CONFIG.animation.start);
        };

        $scope.set_language = function(language) {
            $scope.html = {
                language : $scope.language
            };
        };

        $scope.load_codes = function() {
            codes.get('language', $scope.language, function(code) {
                $scope.codes.push(code);
            });
        };

        $scope.init();

        $rootScope.$on('change_language', function(event, language) {
            $scope.set_language(language);
        });

    }
]);