import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

import sequelize from "sequelize";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import * as models from './models'

const dbConfig: SequelizeOptions = {
    "sync": {
        "force": false,
        "alter": false
    },
    "database": "zipblock",
    "username": "postgres",
    "password": "bahador",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres",
    "logging": false,
    "define": {
        "charset": "utf8",
        "collate": "utf8_general_ci"
    },
    "pool": {
        "max": 80,
        "min": 0,
        "acquire": 30000,
        "idle": 1000
    }
}
@Injectable()
export class PostgresService implements OnModuleInit {
    private logger = new Logger('_database/postgress/postgres.service');
    public connection: Sequelize = null;

    async onModuleInit() {
        const sequelizeInstance = new Sequelize(dbConfig)
        sequelizeInstance.addModels(Object.values(models));

        try {
            await sequelizeInstance.sync(dbConfig.sync);
        } catch (e) {
            this.logger.debug(e);
            this.logger.fatal('Syncing error');
            this.logger.fatal(e);
            process.exit(1);
        }

        this.logger.verbose('Postgres database is connected!');
        this.connection = sequelizeInstance;
    }

    constructor() { }

    public sequelize = sequelize;
    public models = models;
}