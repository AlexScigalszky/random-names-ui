var app = new Vue({
    el: '#app',
    data: {
        ready: false,
        nameData: null,
        classObject: ''
    },
    created: function () {
        this.fetchRandomName()
    },
    methods: {
        toGenre: function (genre) {
            switch (genre) {
                case 'M':
                    return 'Masculino';
                case 'A':
                    return 'Ambisex';
                case 'F':
                    return 'Femenino';
                default:
                    return '';
            }
        },
        fetchRandomName: async function () {
            var data = await fetch('https://random-names-api.herokuapp.com/random')
                .then(data => data.json());
            this.nameData = {
                ...data,
                body: {
                    ...data.body,
                    genre: this.toGenre(data.body.genre),
                }
            };
            switch (data.body.genre) {
                case 'M':
                    this.classObject = {'male': true};
                    break;
                case 'A':
                    this.classObject = {'ambi': true};
                    break;
                case 'F':
                    this.classObject = {'femme': true};
                    break;
                default:
                    this.classObject = {'': true};
                    break;
            }
            console.log('al', this.classObject);
            this.ready = true;
            console.log(this.nameData);
        }
    }
})
