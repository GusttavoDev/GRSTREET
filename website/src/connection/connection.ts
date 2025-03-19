export default class Connection {
    constructor(
        private connectionUrl: string = 'https://grstreet.com/Server/api/'
    ){}

    get(): string {
        return this.connectionUrl;
    }
}