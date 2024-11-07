import { Injectable, Logger, Inject, OnModuleInit } from "@nestjs/common";
import { timeStamp } from "console";
import { getContract, Hex, parseAbiItem, decodeEventLog } from "viem";
import { Transaction } from "viem/_types";
import { contractABi } from "./_abi/abi";
import { PostgresService } from "../_database/postgres/postgres.service";

@Injectable()
export class BlockchainService implements OnModuleInit {
    private logger = new Logger('providers/blockchainService')
    constructor(
        @Inject("VIEM_CLIENT") private readonly viemClient: any,
        private readonly pg: PostgresService
        // @InjectRepository(BlockData) private readonly blockDataRepository: Repository<BlockData>,
        // private dataSource: DataSource
    ) {
        this.logger.log("BlockchainService initialized");
    }

    onModuleInit() {

    }

    async getBlockNumber(): Promise<bigint> {
        const blockNumber = await this.viemClient.getBlockNumber();
        return blockNumber;
    }

    // sample tx: 0x333e5de12673fb4e12865d0f1afd6771c1927993aa449ef44d7e25bcce19f1e2
    async getTxData(txhash: any): Promise<Transaction> {
        console.log(">", txhash)
        if (typeof txhash === 'object' && 'txHash' in txhash) {
            txhash = txhash.txHash;
        }

        if (typeof txhash !== 'string') {
            txhash = txhash.toString();
        }

        console.log("Processed txhash:", txhash);

        try {
            const txData = await this.viemClient.getTransaction({ hash: txhash })

            const processedTxData = JSON.parse(JSON.stringify(txData, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
            console.log(processedTxData)
            return processedTxData;
        } catch (error) {
            this.logger.log('Error fetching transaction data:', error);
        }
    }

    async getTxEventLog(): Promise<any> {
        try {
            const logs = await this.viemClient.watchContractEvent({
                address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                abi: contractABi,
                eventName: 'Transfer',
                poll: true,
                fromBlock: await this.getBlockNumber() - 20n,
                onLogs: (logs: any) => this.logStore(logs)
                // onLogs: logs => console.log(logs)
            })
        } catch (error) {
            this.logger.log('Error fetching transaction data:', error);
        }
    }

    async showUserTxData(address: any): Promise<any> {
        try {
            const sender = await this.pg.models.DepositTransaction.findAndCountAll({
                where: {
                    from: address
                },
            })
            console.log('sender>', sender)
            return sender;
        } catch (error) {
            this.logger.error(error)
        }
    }

    async logStore(logs: any) {
        console.log("logs>>", logs);
        for (const log of logs) {
            console.log("1- log>>", log);
            console.log("2- log>>", log.args);
            const { transactionHash, blockNumber } = log;
            await this.decodeTheEvent(log);
            const { from, to, value } = log.args;
            console.log("now we are here:", from, to, value);
            try {
                await this.pg.models.DepositTransaction.create({
                    txhash: transactionHash,
                    from,
                    to,
                    amount: String(value),
                    blockNumber: String(blockNumber)
                    // createdAt: Date.now().toString()
                })
                console.log('Transaction data saved:', { from, to, value });
            } catch (dbError) {
                this.logger.log('Error saving transaction data:', dbError)
            }
        }
    }

    async decodeTheEvent(log: any) {
        const { data, topics } = log;
        console.log("3-decodeTheEvent>", log);
        const topic = decodeEventLog({
            abi: contractABi,
            data,
            topics
        })
        console.log("topic>>", topic);
        return topic;
    }

}

