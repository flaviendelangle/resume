App.service('codes', [
    '$http',
    function($http) {

        var that = this;

        this.list = [
            {
                title_fr        : 'Simplification des appels AJAX',
                title_en        : 'Simplification of the AJAX calls',
                description_fr  : 'Cette classe permet de simplifier les interactions entre l\'extension et le serveur en gérant par exemple automatiquement l\'authentification',
                description_en  : 'This class provide a set of tools that simplify the interactions between the extension and the server.',
                language        : 'JavaScript',
                year            : 2016,
                project         : 'Zzzelp',
                file            : 'ajax.js'
            }
        ];
        
        this.get = function(filter_type, value, callback) {
            var codes = that.filter(filter_type, value);
            for(var i=0; i<codes.length; i++) {
                that.get_file_content(codes[i], callback);
            }
        };

        this.filter = function(filter_type, value) {
            return that.list.filter(function(code){
                return (code[filter_type] == value);
            });
        };

        this.get_file_content = function(code, callback) {
            $http({
                method : 'GET',
                url : '/files/' + code.file
            }).then(function successCallback(response) {
                code.content = response.data;
                callback(code);
            }, that.error);            
        };

    }
]);