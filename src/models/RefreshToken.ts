import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Admin } from "./Admin";

@Entity("refresh_token")
class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column({ name: "expire_in", type: "bigint" })
  expireIn: number;

  @ManyToOne(() => Admin, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  userId: Admin;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RefreshToken };
