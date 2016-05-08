App.service('project_pagerank', [
    function() {

        this.name = 'PageRank';

        this.presentation_fr =  '<p>Dans le cadre des <i>Concours aux Grandes Ecoles</i>, j\'ai présenté l\'épreuve de <i>TIPE</i> ';
        this.presentation_fr += '(Travail d\'initiative personnelle encadré). Etant particulièrement intéressé par tout ce qui touche à Internet, ';
        this.presentation_fr += 'je me suis orienté vers un sujet traitant des moteurs de recherche.</p>';
        this.presentation_fr += '<p>Ce projet m\'a permit mettre en relation mes connaissances informatiques et une partie de ce ';
        this.presentation_fr += 'que j\'avais appris en Mathématiques pendant mes deux années de Classe Préparatoire.';
        this.presentation_fr += '<ul><li><a target="_BLANK" href="https://docs.google.com/document/d/13uvqbV9SPfbMD30CcD19Da5LzvwRChDKyoR-8aGVwQ0/edit?usp=sharing">';
        this.presentation_fr += 'Support de présentation orale</a></li>';
        this.presentation_fr += '<li><a href="http://zzzelp.fr/Examples/PageRank.py">Sources complètes</a></li></ul>';

		this.presentation_en = '<p>During the examinations leading to my engineer school, I had to achieve a project in a science subject. ';
		this.presentation_en += 'Beeing fascinated by everything arround the Internet, ';
		this.presentation_en += 'I decided to do something related to search engines.</p>';
		this.presentation_en += '<p>This project helped me to understand how Mathematics (more precisely Algebra) can be useful in Computer Science.</p>';
		this.presentation_en += '<ul><li><a target="_BLANK" href="https://docs.google.com/document/d/13uvqbV9SPfbMD30CcD19Da5LzvwRChDKyoR-8aGVwQ0/edit?usp=sharing">';
		this.presentation_en += 'Oral medium of presentation (in french)</a></li>';
		this.presentation_en += '<li><a href="http://zzzelp.fr/Examples/PageRank.py">Complete source code</a></li></ul>';

        this.get_html = function(language) {
            switch(language) {
                case 'french' :
                    return {
                        title           : 'PageRank',
                        presentation    : this.presentation_fr
                    };
                case 'english' :
                    return {
                        title : 'Zzzelp',
                        presentation    : this.presentation_en
                    };
                default :
                    console.error('This language is not yet implemented');
            }            
        };
    }
]);




