export default class Snowflake {
    private readonly EPOCH = 1420070400000;
    private readonly WORKER_ID_BITS = 5;
    private readonly PROCESS_ID_BITS = 5;
    private readonly SEQUENCE_BITS = 12;

    private readonly MAX_WORKER_ID = (1 << this.WORKER_ID_BITS) - 1;
    private readonly MAX_PROCESS_ID = (1 << this.PROCESS_ID_BITS) - 1;
    private readonly MAX_SEQUENCE = (1 << this.SEQUENCE_BITS) - 1;

    private workerId: number;
    private processId: number;
    private sequence: number;

    constructor(workerId: number, processId: number) {
        if (workerId > this.MAX_WORKER_ID || workerId < 0) {
            throw new Error(`Worker ID deve ser entre 0 e ${this.MAX_WORKER_ID}`);
        }
        if (processId > this.MAX_PROCESS_ID || processId < 0) {
            throw new Error(`Process ID deve ser entre 0 e ${this.MAX_PROCESS_ID}`);
        }

        this.workerId = workerId;
        this.processId = processId;
        this.sequence = 0;
    }

    public generate(): string {
        let timestamp = Date.now() - this.EPOCH;

        if (timestamp < 0 || timestamp > 0xFFFFFFFFFFFF) {
            throw new Error('Timestamp fora do intervalo');
        }

        let snowflake =
            ((BigInt(timestamp) << BigInt(this.WORKER_ID_BITS + this.PROCESS_ID_BITS + this.SEQUENCE_BITS)) |
            (BigInt(this.workerId) << BigInt(this.PROCESS_ID_BITS + this.SEQUENCE_BITS)) |
            (BigInt(this.processId) << BigInt(this.SEQUENCE_BITS)) |
            BigInt(this.sequence));

        this.sequence = (this.sequence + 1) & this.MAX_SEQUENCE;

        return snowflake.toString();
    }
}
