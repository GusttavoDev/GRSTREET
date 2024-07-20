import Snowflake from "../snowflake/Snowflake";

export default class UserRepository {
    private snowflake: Snowflake;

    constructor() {
        this.snowflake = new Snowflake(1, 1);
    }

    async create(): Promise<void> {
        const id = this.snowflake.generate();
        console.log(id);
    }
}
