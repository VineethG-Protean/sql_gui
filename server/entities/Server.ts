import moment from 'moment';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Server {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    protocol!: string

    @Column({ type: 'varchar', nullable: false, length: 250 })
    host!: string

    @Column({ type: 'integer', nullable: false })
    port!: number

    @Column({ type: 'varchar', nullable: false, length: 250 })
    username!: string

    @Column({ type: 'varchar', nullable: false, length: 250 })
    password!: string

    @Column({ type: 'varchar', nullable: false, length: 10, default: 'mysql' })
    type!: string

    @Column({ type: 'datetime', nullable: false, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    created_at!: Date;

    @Column({ type: 'datetime', nullable: false, default: moment().format('YYYY-MM-DD HH:mm:ss') })
    modified_at!: Date;

}