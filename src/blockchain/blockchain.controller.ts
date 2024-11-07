import { Controller, Get, Param, Post } from "@nestjs/common";
import { Hex } from "viem";
import { Transaction } from "viem/_types";
import { BlockchainService } from "./blockchain.service";

@Controller()
export class BlockchainController {
    constructor(private readonly blockchainService: BlockchainService) {
        console.log("BlockchainController has been instantiated");
    }

    // @Get()
    // async getBlockNumber(): Promise<bigint> {
    //     return this.blockchainService.getBlockNumber();
    // }

    @Get()
    async getTxEventLog(): Promise<any> {
        return this.blockchainService.getTxEventLog();
    }

    @Get(":address")
    async showUserTxData(@Param() address: any): Promise<any> {
        console.log(address);
        console.log(typeof address.address);
        return this.blockchainService.showUserTxData(address.address);
    }

    // @Get(":txHash")
    // async getTxData(@Param() txHash: any): Promise<Transaction> {
    //     return this.blockchainService.getTxData(txHash);
    // }
}
