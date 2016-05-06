App.service('projects', [
    'project_zzzelp',
    'project_pagerank',
    function(project_zzzelp, project_pagerank) {

        this.get_project = function(project_str) {
            switch(project_str) {
                case 'zzzelp' :
                    return project_zzzelp;
                case 'pagerank' :
                    return project_pagerank;
                default :
                    console.error('This project doesn\'t exist');
            }           
        };
    }
]);