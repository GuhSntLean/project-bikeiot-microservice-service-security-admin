import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
}

@Entity("users")
class Admin {
  @PrimaryColumn()
  id: string;

  @Column({ name: "user_name", type: "text", unique: true })
  userName: string;

  @Column({ name: "email", type: "text", unique: true })
  email: string;

  @Column({ name: "password", type: "text" })
  password: string;

  @Column({ name: "role", enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Admin, UserRole };
