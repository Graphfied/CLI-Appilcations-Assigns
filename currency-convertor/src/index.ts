#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

type CurrencyInfo = {
  fromCurrency: string;
  toCurrency: string;
};
type CurrencyQuantity = {
  amountToConvert: number | string;
  amountOfUnit: string | number;
};
let currencyInfo: CurrencyInfo, amount: CurrencyQuantity;
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
  } while (
    currencyInfo?.fromCurrency.length < 3 ||
    currencyInfo?.toCurrency.length < 3
  );
  do {
    amount = await inquirer.prompt([
      {
        name: "amountOfUnit",
        type: "number",
        message: `Enter the amount of "${currencyInfo?.fromCurrency}" present in one "${currencyInfo?.toCurrency}":`,
      },
      {
        name: "amountToConvert",
        type: "number",
        message: `Enter the amount of "${currencyInfo?.fromCurrency}" you want to convert in "${currencyInfo?.toCurrency}":`,
      },
    ]);
  } while (
    isNaN(Number(amount?.amountToConvert)) ||
    Number(amount?.amountToConvert) < 1 ||
    isNaN(Number(amount?.amountOfUnit)) ||
    Number(amount?.amountOfUnit) < 0
  );
  console.log(
    chalk.bgYellow.black(
      ` ${
        Number(amount.amountOfUnit) < 1
          ? Number(amount.amountToConvert) * Number(amount.amountOfUnit)
          : Number(amount.amountToConvert) / Number(amount.amountOfUnit)
      } `
    )
  );
};
askingCurrencyInfo();
