export default class Connection {
    constructor(
<<<<<<< HEAD
        private connectionUrl: string = 'https://api.grstreet.com/api/'
=======
        private connectionUrl: string = 'http://localhost:5000/api/'
>>>>>>> 74f57be (mercado pago)
    ){}

    get(): string {
        return this.connectionUrl;
    }
}
