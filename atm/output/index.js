#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
// dummy data and other variable initialization
let bankRecord = [
    { username: "ziaKhan", pin: "1234", balance: 122000000 },
    { username: "daniyalNagori", pin: "1234", balance: 14000000 },
    { username: "aliRazzaq", pin: "1234", balance: 1000000 },
    { username: "abuhurairah", pin: "1234", balance: 1270000000000000 },
    { username: "ahmadJajja", pin: "1234", balance: 17000000 },
    { username: "jawadAhmad", pin: "1234", balance: 187000000 },
];
let userInfo, user = { username: "", pin: "", balance: 0 }, amountToBeWithDraw, isRepeat, operation;
//   printing welcome message
console.log("  ......  ...   ....  ...........  ......       .......     .......    .....       .....  ............  ");
console.log("  .....  .....  ..... ..........   .....      ..........   ..........  ......     ......  .......... ");
console.log("    ...  ......  ...  ...          ...       ....     ... ...      ... ......     ......  ...  ");
console.log("    ... ... ... ...   ........     ...      ....          ...      ... ... ...   ... ...  ......... ");
console.log("     .....  .....     ...          ...       .....     .. ...     ...  ...   .....   ...  ...  ");
console.log("     .....   .....    ..........   .......... ..........   ..........  ....  .....  ....  .......... ");
console.log("      ...     ...     ...........  ..........   ........    ........   ...... ...  .....  ........... \n");
//function to ask user info
const atm = async () => {
    do {
        userInfo = await inquirer.prompt([
            {
                name: "username",
                type: "input",
                message: "Enter your user ID: ",
            },
            {
                name: "pin",
                type: "password",
                message: "Enter your 4 digit pin: ",
            },
        ]);
    } while ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.pin.length) !== 4 || (userInfo === null || userInfo === void 0 ? void 0 : userInfo.username.length) < 3);
    //   checking user's credentials if it is true or not
    if (bankRecord.find((data) => data.username === userInfo.username)) {
        if (bankRecord.find((data) => data.pin === userInfo.pin)) {
            user = bankRecord.find((data) => data.username === userInfo.username);
            console.log("Your account balance is", chalk.yellow(user === null || user === void 0 ? void 0 : user.balance));
        }
        else {
            console.log(chalk.red("You have entered your pin wrong.Please retry!"));
        }
    }
    else {
        console.log(chalk.red("You have entered wrong user name.Please retry!"));
    }
    operation = await inquirer.prompt([
        {
            name: "operationToBePerformed",
            type: "list",
            choices: ["Withdraw Money", "Transfer Money"],
        },
    ]);
    switch (operation.operationToBePerformed) {
        case "Withdraw Money":
            //   asking to how much money customer wants to with draw
            do {
                amountToBeWithDraw = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "How much money you want to withdraw?",
                    },
                ]);
            } while (isNaN(Number(amountToBeWithDraw === null || amountToBeWithDraw === void 0 ? void 0 : amountToBeWithDraw.amount)));
            //checking if the user has sufficient balance or not
            if (user === null || user === void 0 ? void 0 : user.balance) {
                if (user.balance >= Number(amountToBeWithDraw.amount)) {
                    console.log(`The remaining amount is ${(user.balance =
                        user.balance - Number(amountToBeWithDraw.amount))}`);
                }
                else {
                    console.log(chalk.bgRed("You have in sufficient balance."));
                }
            }
            break;
        case "Transfer Money":
            let listOfBanks = [
                "UBL",
                "ABL",
                "HBL",
                "MCB",
                "NBP",
                "Meezan Bank",
            ];
            let selectedBank = await inquirer.prompt([
                {
                    name: "bank",
                    type: "list",
                    choices: listOfBanks,
                },
            ]);
            break;
    }
    let bankAccountInfo;
    do {
        bankAccountInfo = await inquirer.prompt([
            {
                name: "accountHolderName",
                type: "input",
                message: "Enter account holder name:",
            },
            {
                name: "accountNo",
                type: "number",
                message: "Enter account no.:",
            },
        ]);
    } while (bankAccountInfo.accountHolderName.length < 3 ||
        isNaN(Number(bankAccountInfo.accountNo)));
    let amountToBeSent;
    do {
        amountToBeSent = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: `Enter the amount of money you want to send to ${bankAccountInfo.accountHolderName}`,
            },
        ]);
    } while (isNaN(Number(amountToBeSent.amount)));
    if (user === null || user === void 0 ? void 0 : user.balance) {
        if (user.balance >= Number(amountToBeSent.amount)) {
            console.log(`The remaining amount is ${(user.balance =
                user.balance - Number(amountToBeSent.amount))}`);
        }
        else {
            console.log(chalk.bgRed("You have in sufficient balance."));
        }
    }
    isRepeat = await inquirer.prompt([
        {
            name: "repeat",
            type: "confirm",
            message: "Do want another operation?",
        },
    ]);
    while (isRepeat.repeat) {
        await atm();
    }
};
await atm();
