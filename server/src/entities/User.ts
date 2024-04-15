import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import moment from "moment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false, length: 250 })
  email!: string;

  @Column({ type: "varchar", nullable: false, length: 20 })
  username!: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  password!: string;

  @Column({ type: "varchar", nullable: true, length: 20 })
  name!: string;

  @Column({ type: "varchar", nullable: true, default: "user_l2" })
  role!: "admin" | "server_admin" | "database_admin" | "user_l1" | "user_l2";

  @Column({ type: "boolean", nullable: true })
  is_verified!: boolean;

  @Column({ type: "boolean", nullable: true })
  is_active!: boolean;

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
