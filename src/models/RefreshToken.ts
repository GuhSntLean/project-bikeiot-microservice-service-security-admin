import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("refresh_token")
class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column({ name: "expire_in", type: "bigint" })
  expireIn: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  userId: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RefreshToken };
