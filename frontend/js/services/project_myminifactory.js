App.service('project_myminifactory', [
    function() {

        this.name = 'MyMiniFactory';

        this.presentation_fr =  '<p>MyMiniFactory est une entreprise proposant un ensemble de solutions en rapport avec l\'univers de l\'impression 3D. ';
        this.presentation_fr += 'J\'ai pour ma part intégré l\'équipe en charge du projet <i>WeDesign.live</i> qui a pour but de rendre la création et le ';
        this.presentation_fr += 'partage d\'objets imprimés en 3D accessible à tous. Dans le cadre de ce stage, j\'ai aidé à la réalisation d\'une API REST ';
        this.presentation_fr += 'et à son intégration dans une application web développée avec AngularJS. Une présentation plus détaillée du projet est disponible ';
        this.presentation_fr += 'dans mon <a href="/files/stage3INGE1fdelangle.pdf">rapport de stage</a>.</p>';

        this.presentation_en =  '<p>MyMiniFactory is a company offering a set of solutions in relation with the world of 3D printing. ';
        this.presentation_en += 'During my internship, I\'ve worked with the team in charge of the <i>WeDesign.live</i> project that aim at making creation and ';
        this.presentation_en += 'and sharking of 3D printable objets accessible to all. To do that, I participated to the creation of a REST API and to its intergration ';
        this.presentation_en += 'in a web application developped with AngularJS. A more detailled presentation is available in my ';
        this.presentation_en += '<a href="/files/stage3INGE1fdelangle.pdf">internship report (in french)</a>.</p>';


        this.get_html = function(language) {
            switch(language) {
                case 'french' :
                    return {
                        title           : 'Stage chez MyMiniFactory',
                        presentation    : this.presentation_fr
                    };
                case 'english' :
                    return {
                        title : 'Internship at MyMiniFactory',
                        presentation    : this.presentation_en
                    };
                default :
                    console.error('This language is not yet implemented');
            }            
        };
    }
]);