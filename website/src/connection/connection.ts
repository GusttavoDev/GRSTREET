export default class Connection {
    constructor(
        private connectionUrl: string = 'https://grstreet.com/server/api/'
    ){}

    get(): string {
        return this.connectionUrl;
    }
}