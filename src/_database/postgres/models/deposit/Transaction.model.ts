import { DataType, Table, Column, Model } from "sequelize-typescript";

@Table({
    tableName: 'deposit_transactions',
    timestamps: true,
    paranoid: false,
    freezeTableName: true
})

export class DepositTransaction extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    txhash?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    from?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    to?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    amount?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: false,
    })
    blockNumber?: string

    // @Column({
    //     type: DataType.DATE,
    //     allowNull: false,
    // })
    // createdAt?: string;

    // @Column({
    //     type: DataType.DATE,
    //     allowNull: false,
    // })
    // createdAt?: string;

    // @Column({
    //     type: DataType.DATE,
    //     allowNull: false
    // })
    // updatedAt?: Date;
}
