App.service('codes', [
    '$http',
    function($http) {

        var that = this;

        this.list = [
            {
                language    : 'JavaScript',
                date        : 2016,
                project     : 'zzzelp',
                file        : 'ajax.js'
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

        this.error = function(response) {
            console.log(response);  
        };

    }
]);