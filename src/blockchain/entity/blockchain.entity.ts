import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BlockData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    txHash: string

    @Column()
    from: string

    @Column()
    to: string

    @Column()
    amount: string
}