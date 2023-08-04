#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { logCalculator } from "./logCalculator.js";
import { simpleCalculator } from "./simpleCalculator.js";
import { trigonometricCalculator } from "./trigonometricCalculator.js";
// Prints Calculator in the console of blue color using # (hashes)
console.log(
  chalk.blue(
    "     ###         ##       ##         ###         ##     ##  ###########      ###        ########"
  )
);
console.log(
  chalk.blue(
    "  ##     ##    ## ##     ##       ##     ##     ##     ##       ##        ##     ##      ##     ##"
  )
);
console.log(
  chalk.blue(
    " ##           ##  ##    ##       ##            ##     ##       ##        ##      ##     ##   ##"
  )
);
console.log(
  chalk.blue(
    "##           #######   ##       ##            ##     ##       ##        ##      ##     #####"
  )
);
console.log(
  chalk.blue(
    " ##    ##   ##    ##  ##         ##    ##     ##    ##       ##          ##    ##     ##  ##   #"
  )
);
console.log(
  chalk.blue(
    "    ##     ##     ##  ########      ##          ###         ##             ###       ##     ##"
  )
);
// ----------------------------------------------------------------------
// Asking the user that which type of Calculator he/she wants

let calculatorType = await inquirer.prompt([
  {
    name: "type",
    type: "list",
    message: "Type of calculator you want to use:",
    choices: [
      "Simple (Only arithmetic operations can be performed)",
      "Trigonometric (Such as sin(x),cos(x) etc...)",
      "Logarithmic (Logarithm problems )",
      // "Mixed (To solve an expression having log,trigonometric ratios and arithmetic operations)",
    ],
  },
]);

switch (calculatorType.type) {
  case "Simple (Only arithmetic operations can be performed)":
    simpleCalculator();
    break;
  case "Trigonometric (Such as sin(x),cos(x) etc...)":
    trigonometricCalculator();
    break;
  case "Logarithmic (Logarithm problems )":
    logCalculator();
}
