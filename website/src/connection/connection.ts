export default class Connection {
    constructor(
        private connectionUrl: string = 'http://localhost:3001/api/'
    ){}

    get(): string {
        return this.connectionUrl;
    }
}