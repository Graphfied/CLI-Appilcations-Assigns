import { Human } from "./Human.js";
/* The Student class extends the Human class and adds a rollNo and course property to it. */
export class Student extends Human {
    constructor(name, age, userName, password, role, rollNo, course) {
        super(name, age, userName, password, role);
        this.rollNo = rollNo;
        this.course = course;
    }
    get UserName() {
        return this.userName;
    }
    get Password() {
        return this.password;
    }
}
