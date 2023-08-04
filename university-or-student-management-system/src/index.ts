import chalk from "chalk";
import inquirer from "inquirer";
import showBanner from "node-banner";
import { Student } from "./student.js";
import { Teacher } from "./teacher.js";

/* Creating an object with the name principal and assigning it the values of name, userName and
password. */
interface Principal {
  name: "Zia Khan";
  userName: "ziakhan";
  password: "1234";
  role: "principle";
}
let principal: Principal = {
  name: "Zia Khan",
  userName: "ziakhan",
  password: "1234",
  role: "principle",
};
let aliRazzaq: Teacher = new Teacher(
  "Ali Razzaq",
  28,
  "aliRazzaq",
  "1234",
  "dummyID",
  "teacher"
);
let isAuthenticated: boolean = true;
let loggedInUser: undefined | Teacher | Student | Principal;
let teachers: Teacher[] = [];
let students: Student[] = [];
teachers.push(aliRazzaq);
// Printing welcome msg
const printWelcomeMsg = async () => {
  await (async () => {
    await showBanner("Uni .  of  Abu  Hurairah", "", "blue");
  })();
};
let loginData: { loginAs: string; userName: string; password: string };

/**
 * It takes in user input and checks if the user exists in the database. If the user exists, it checks
 * if the password is correct. If the password is correct, it sets the loggedInUser variable to the
 * user object. If the password is incorrect, it calls the login function again. If the user doesn't
 * exist, it calls the login function again.
 */
const login = async () => {
  do {
    loginData = await inquirer.prompt([
      {
        name: "loginAs",
        type: "list",
        message: "Do you want to login as:",
        choices: ["Student", "Teacher", "Principle"],
      },
      {
        name: "userName",
        type: "input",
        message: "Enter your username assigned by the institute:",
      },
      {
        name: "password",
        type: "password",
        mask: true,
        message: "Enter your 4 digit password assigned by the institute:",
      },
    ]);
  } while (loginData.userName.length < 3 || loginData.password.length !== 4);
  switch (loginData.loginAs) {
    // Logging in TEACHER:
    case "Teacher":
      if (teachers.find((teacher) => teacher.UserName === loginData.userName)) {
        loggedInUser = teachers.find(
          (teacher) => teacher.UserName === loginData.userName
        );
        if (loggedInUser !== undefined) {
          if (loggedInUser.Password === loginData.password) {
            isAuthenticated = true;
          } else {
            loggedInUser === undefined;
            await login();
          }
        } else {
          await login();
        }
      } else {
        await login();
      }
      break;
    // Logging in STUDENT:
    case "Student":
      if (students.find((student) => student.UserName === loginData.userName)) {
        loggedInUser = students.find(
          (student) => student.UserName === loginData.userName
        );
        if (loggedInUser !== undefined) {
          if (loggedInUser.Password === loginData.password) {
            isAuthenticated = true;
          } else {
            loggedInUser === undefined;
            await login();
          }
        } else {
          await login();
        }
      } else {
        await login();
      }
      break;
    // Logging in PRINCIPLE
    default:
      if (principal.userName === loginData.userName) {
        if (principal.password === loginData.password) {
          loggedInUser = principal;
          isAuthenticated = true;
        } else {
          await login();
        }
      } else {
        await login();
      }
      break;
  }
};
const completeProcedure = async () => {
  await printWelcomeMsg();
  await login();
};
completeProcedure();
