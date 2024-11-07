import { Module } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { BlockchainController } from "./blockchain.controller";
import { ViemClientProvider } from "./providers/viemClient.provider";
import { PostgresService } from "src/_database/postgres/postgres.service";

@Module({
  imports: [],
  controllers: [BlockchainController],
  providers: [ViemClientProvider, BlockchainService, PostgresService],
})
export class BlockchainModule { }
