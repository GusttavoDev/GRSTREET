export default class Connection {
    constructor(
        private connectionUrl: string = 'https://api.grstreet.com/api/'
    ){}

    get(): string {
        return this.connectionUrl;
    }
}
