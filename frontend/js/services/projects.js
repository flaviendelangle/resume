App.service('projects', [
    'project_zzzelp',
    'project_pagerank',
    'project_myminifactory',
    function(project_zzzelp, project_pagerank,project_myminifactory) {

        this.get_project = function(project_str) {
            switch(project_str) {
                case 'Zzzelp' :
                    return project_zzzelp;
                case 'PageRank' :
                    return project_pagerank;
                case 'MyMiniFactory' :
                    return project_myminifactory;
                default :
                    console.error('This project doesn\'t exist');
            }           
        };
    }
]);