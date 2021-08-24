var app = new Vue({
    el: '#app',
    data: {
        ready: false,
        nameData: null,
        classObject: '',
        history: [],
        current: 0
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
        fetchRandomName: async function (event) {
            let showBefore = false;
            if (event) {
                console.log('left', event.clientX);
                console.log('width', event.target.clientWidth);
                showBefore = event.clientX < (event.target.clientWidth / 3) && this.history[this.current] !== undefined;
                console.log('before', showBefore);
            }
            if (showBefore) {
                this.nameData = this.history[this.current--];
                this.setClassObject(this.nameData);
            } else {
                var data = await fetch('https://random-names-api.herokuapp.com/random')
                    .then(data => data.json());
                this.history = [...this.history, this.nameData].filter(x => !!x);
                this.current = this.history.length - 1;
                this.nameData = {
                    ...data,
                    body: {
                        ...data.body,
                        genre: this.toGenre(data.body.genre),
                    }
                };
            }
            this.setClassObject(this.nameData);
            this.ready = true;
            console.log(this.nameData);
        },
        setClassObject: function (data) {
            switch (data.body.genre) {
                case 'Masculino':
                    this.classObject = { 'male': true };
                    break;
                case 'M':
                    this.classObject = { 'male': true };
                    break;
                case 'Ambisex':
                    this.classObject = { 'ambi': true };
                    break;
                case 'A':
                    this.classObject = { 'ambi': true };
                    break;
                case 'Femenino':
                    this.classObject = { 'femme': true };
                    break;
                case 'F':
                    this.classObject = { 'femme': true };
                    break;
                default:
                    this.classObject = { '': true };
                    break;
            }
            console.log('al', this.classObject);
        }
    }
})
