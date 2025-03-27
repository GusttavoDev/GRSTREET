export default class Connection {
    constructor(
        // private connectionUrl: string = 'https://api.grstreet.com/api/'
        private connectionUrl: string = 'http://localhost:5000/api/'
    ){}

    get(): string {
        return this.connectionUrl;
    }
}
