import { UserRole } from "../models/Admin";

class AdminProvider {
  emailValidation(email: string) {
    let regexValidation = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (regexValidation.test(email)) {
      return true;
    }
    return false;
  }

  passwordValidation(password: string) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (password.length >= 8) {
      if (regex.test(password)) {
        return true;
      }
    }
    return false;
  }

  roleValidation(role: string){
    switch(role) {
      case "admin":
        return UserRole.ADMIN
      case "editor":
        return UserRole.EDITOR
      default:
        return false
    }
  }
}

export { AdminProvider };
