import inquirer from "inquirer";
import showBanner from "node-banner";
import { Teacher } from "./teacher.js";
let principal = {
    name: "Zia Khan",
    userName: "ziakhan",
    password: "1234",
    role: "principle",
};
let aliRazzaq = new Teacher("Ali Razzaq", 28, "aliRazzaq", "1234", "dummyID", "teacher");
let isAuthenticated = true;
let loggedInUser;
let teachers = [];
let students = [];
teachers.push(aliRazzaq);
// Printing welcome msg
const printWelcomeMsg = async () => {
    await (async () => {
        await showBanner("Uni .  of  Abu  Hurairah", "", "blue");
    })();
};
let loginData;
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
                loggedInUser = teachers.find((teacher) => teacher.UserName === loginData.userName);
                if (loggedInUser !== undefined) {
                    if (loggedInUser.Password === loginData.password) {
                        isAuthenticated = true;
                    }
                    else {
                        loggedInUser === undefined;
                        await login();
                    }
                }
                else {
                    await login();
                }
            }
            else {
                await login();
            }
            break;
        // Logging in STUDENT:
        case "Student":
            if (students.find((student) => student.UserName === loginData.userName)) {
                loggedInUser = students.find((student) => student.UserName === loginData.userName);
                if (loggedInUser !== undefined) {
                    if (loggedInUser.Password === loginData.password) {
                        isAuthenticated = true;
                    }
                    else {
                        loggedInUser === undefined;
                        await login();
                    }
                }
                else {
                    await login();
                }
            }
            else {
                await login();
            }
            break;
        // Logging in PRINCIPLE
        default:
            if (principal.userName === loginData.userName) {
                if (principal.password === loginData.password) {
                    loggedInUser = principal;
                    isAuthenticated = true;
                }
                else {
                    await login();
                }
            }
            else {
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
