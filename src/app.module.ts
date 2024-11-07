import { Module, OnModuleInit } from "@nestjs/common";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from "@nestjs/config";

const db_url = 'postgres://postgres:bahador@localhost:5432/zipblock'

@Module({
    imports: [
        // ConfigModule.forRoot({ isGlobal: true }),
        BlockchainModule,
        // SequelizeModule.forRoot({
        //     uri: db_url,
        //     // uri: process.env.DB_URL,
        //     models: []
        // })
        // SequelizeModule.forRoot({
        //     dialect: 'postgres',
        //     host: 'localhost',
        //     port: 5432,
        //     username: 'test',
        //     password: 'test',
        //     database: 'nest',
        //     autoLoadModels: true,
        //     synchronize: true,
        // }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements OnModuleInit {
    onModuleInit() {
        console.log("AppModule initialized");
    }
}
