App.service('codes', [
    '$http',
    function($http) {

        var that = this;

        this.list = [

            // Zzzelp
            {
                title_fr        : 'Simplification des appels AJAX',
                title_en        : 'Simplification of the AJAX calls',
                description_fr  : 'Cette classe permet de simplifier les interactions entre l\'extension et le serveur en gérant par exemple automatiquement l\'authentification',
                description_en  : 'This class provide a set of tools that simplify the interactions between the extension and the server.',
                language        : 'JavaScript',
                year            : 2016,
                project         : 'Zzzelp',
                file            : 'ajax.js'
            },
            {
                title_fr        : 'Attaques optimisées sur une cible',
                title_en        : 'Optimized attacks on a target',
                description_fr  : 'Cette classe permet de simplifier les interactions entre l\'extension et le serveur en gérant par exemple automatiquement l\'authentification',
                description_en  : 'This class provide a set of tools that simplify the interactions between the extension and the server.',
                language        : 'JavaScript',
                year            : 2014,
                project         : 'Zzzelp',
                file            : 'attack_computation.js'
            },
            {
                title_fr        : 'Répartition des ressources entre les membres d\'un groupe',
                title_en        : 'Repartition of the resources between the members of a group',
                description_fr  : 'Sur Fourmizzz, les ressources sont récoltées par un nombre réduit de joueurs qui vont ensuite devoir envoyer leur surplus aux autres membres. Il est alors important d\'optimiser ces envois de ressources afin de limiter au maximum les trajets de longue durée et de maximiser les envois à moins de 30 minutes qui sont particulièrement intéressant. Zzzelp comporte plusieurs algorithme visant à optimiser cette répartition, celui présenté ci-dessous tente de prendre en compte la capacité d\'envoi de chacun.',
                description_en  : 'On Antzzz, resources are collected by a small group of players who must send some part of it to the other members. It is then very important to choose carefully who gives his resources to who. Indeed it is vital to avoid long distance shipment and to have the maximum of shipment under 30 minutes which are very interesting. Zzzelp gives access to several algorithm aiming at optimizing this repartition, the one given here tries to take into account the sending capacity of each member.',
                language        : 'PHP',
                year            : 2014,
                project         : 'Zzzelp',
                file            : 'resources_optimization.php'
            },

            // PageRank
            {
                title_fr        : 'Calcul du PageRank de Wikipédia France',
                title_en        : 'Computation of the PageRank of Wikipedia France',
                description_fr  : 'Calcul le PageRank de chaque page sur Wikipédia France',
                description_en  : 'Compute the PageRank of every Web page in Wikipédia France.',
                language        : 'Python',
                year            : 2015,
                project         : 'PageRank',
                file            : 'pagerank.py'
            },

            // MyMiniFactory
            {
                title_fr        : 'Gestion des objets coté client',
                title_en        : 'Management of the objects on the frontend',
                description_fr  : 'Version simplifiée des fonctions servant à récupérer et à mettre à jour les objets créés par l\'utilisateur.',
                description_en  : 'Simplified version of the code aiming at retrieving and storing the objects created by the user',
                language        : 'JavaScript',
                year            : 2016,
                project         : 'MyMiniFactory',
                file            : 'object_storage.js'
            }
        ];
        
        this.get = function(filter_type, value, callback) {
            var codes = that.filter(filter_type, value);
            console.log(codes);
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