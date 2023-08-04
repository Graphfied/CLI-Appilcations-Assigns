import { Human } from "./Human.js";
/* The Teacher class extends the Human class and adds an employeeID property. */

export class Teacher extends Human {
  constructor(
    name: string,
    age: number,
    userName: string,
    password: string,
    role: string,
    private employeeID: string
  ) {
    super(name, age, userName, password, role);
  }
  get UserName(): string {
    return this.userName;
  }
  get Password(): string {
    return this.password;
  }
}
