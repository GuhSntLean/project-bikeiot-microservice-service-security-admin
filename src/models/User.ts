import {
  Column,
  Entity,
  PrimaryColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column({ name:"user_name", type: "text", unique: true })
  userName: string;

  @Column({ name: "email", type: "text", unique: true })
  email: string;

  @Column({ name: "password", type: "text" })
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
