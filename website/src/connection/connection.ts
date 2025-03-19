export default class Connection {
    constructor(
        private connectionUrl: string = 'https://grstreet.com/api/'
    ){}

    get(): string {
        return this.connectionUrl;
    }
}