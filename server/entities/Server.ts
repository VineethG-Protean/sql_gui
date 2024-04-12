import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity()
export class Server {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, length: 50 })
  name!: string;

  @Column({ type: "varchar", nullable: false, length: 50 })
  protocol!: string;

  @Column({ type: "varchar", nullable: false, length: 250 })
  host!: string;

  @Column({ type: "integer", nullable: false })
  port!: number;

  @Column({ type: "varchar", nullable: false, length: 250 })
  username!: string;

  @Column({ type: "varchar", nullable: false, length: 250 })
  password!: string;

  @Column({ type: "varchar", nullable: false, length: 10, default: "mysql" })
  type!: string;

  @Column({
    type: "datetime",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: string;

  @Column({
    type: "datetime",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  modified_at!: string;
}
