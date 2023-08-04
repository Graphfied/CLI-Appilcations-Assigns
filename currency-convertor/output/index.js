#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
let currencyInfo, amount;
const askingCurrencyInfo = async () => {
    do {
        currencyInfo = await inquirer.prompt([
            {
                name: "fromCurrency",
                type: "input",
                message: "Enter the name of currency you want to change:",
            },
            {
                name: "toCurrency",
                type: "input",
                message: "Enter the name of currency in which you want to change:",
            },
        ]);
    } while ((currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.fromCurrency.length) < 3 ||
        (currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.toCurrency.length) < 3);
    do {
        amount = await inquirer.prompt([
            {
                name: "amountOfUnit",
                type: "number",
                message: `Enter the amount of "${currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.fromCurrency}" present in one "${currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.toCurrency}":`,
            },
            {
                name: "amountToConvert",
                type: "number",
                message: `Enter the amount of "${currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.fromCurrency}" you want to convert in "${currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.toCurrency}":`,
            },
        ]);
    } while (isNaN(Number(amount === null || amount === void 0 ? void 0 : amount.amountToConvert)) ||
        Number(amount === null || amount === void 0 ? void 0 : amount.amountToConvert) < 1 ||
        isNaN(Number(amount === null || amount === void 0 ? void 0 : amount.amountOfUnit)) ||
        Number(amount === null || amount === void 0 ? void 0 : amount.amountOfUnit) < 0);
    console.log(chalk.bgYellow.black(` ${Number(amount.amountOfUnit) < 1
        ? Number(amount.amountToConvert) * Number(amount.amountOfUnit)
        : Number(amount.amountToConvert) / Number(amount.amountOfUnit)} `));
};
askingCurrencyInfo();
