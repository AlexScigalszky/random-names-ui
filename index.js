var app = new Vue({
    el: '#app',
    data: {
        ready: false,
        nameData: null
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
            this.ready = true;
            console.log(this.nameData);
        }
    }
})
