#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
// Variable Declarations
type UserGuess = {
  userGuessedNumber?: number | string;
};
let userGuess: UserGuess = {},
  numberToBeGuessed: number = 0,
  numberToBeGuessedExtension: string,
  score: number = -1,
  stage: number = 0;
// Welcome message
console.log(
  "  ......  ...   ....  ...........  ......       .......     .......    .....       .....  ............  "
);
console.log(
  "  .....  .....  ..... ..........   .....      ..........   ..........  ......     ......  .......... "
);
console.log(
  "    ...  ......  ...  ...          ...       ....     ... ...      ... ......     ......  ...  "
);
console.log(
  "    ... ... ... ...   ........     ...      ....          ...      ... ... ...   ... ...  ......... "
);
console.log(
  "     .....  .....     ...          ...       .....     .. ...     ...  ...   .....   ...  ...  "
);
console.log(
  "     .....   .....    ..........   .......... ..........   ..........  ....  .....  ....  .......... "
);
console.log(
  "      ...     ...     ...........  ..........   ........    ........   ...... ...  .....  ........... "
);

const askANumber = async () => {
  //   Logic to increase the difficulty level of the game
  numberToBeGuessedExtension = "1";
  for (let i = 0; i < stage; i++) {
    numberToBeGuessedExtension = numberToBeGuessedExtension.concat("0");
  }
  numberToBeGuessed = Math.random() * Number(numberToBeGuessedExtension);
  numberToBeGuessed = Number(numberToBeGuessed.toFixed());
  // Asking user the number to be guessed
  do {
    if (
      userGuess.userGuessedNumber === "H" ||
      userGuess.userGuessedNumber === "h"
    ) {
      console.log(
        chalk.magenta("HINT: "),
        chalk.green(
          `The number you have to guess is between ${
            numberToBeGuessed - 15
          } and ${numberToBeGuessed + 15}`
        )
      );
    }
    userGuess = await inquirer.prompt([
      {
        name: "userGuessedNumber",
        type: "input",
        message: `Guess a number or write 'h' for hint :`,
      },
    ]);
  } while (
    isNaN(Number(userGuess.userGuessedNumber)) ||
    userGuess.userGuessedNumber === "" ||
    userGuess.userGuessedNumber === "h" ||
    userGuess.userGuessedNumber === "H"
  );
};
//Logic to increase level and score if the user guesses the right number
do {
  stage++, score++;
  console.log(chalk.yellow("Stage: ", stage, "\t", "Score: ", score));
  await askANumber();
  if (Number(userGuess?.userGuessedNumber) === numberToBeGuessed) {
    console.log(chalk.yellow(`\n-------------------------------------- `));
    console.log(
      chalk.bgYellow.black(` Hurrah! You have cleared stage no. ${stage} `)
    );
    console.log(chalk.yellow(`-------------------------------------- \n`));
    console.log(chalk.yellow(`Now play stage no. ${stage + 1}`));
  } else {
    console.log(chalk.red(`\n---------------------------------- `));
    console.log(
      chalk.bgRed(` Oops! You lost. The number was ${numberToBeGuessed} `)
    );
    console.log(chalk.red(`---------------------------------- \n`));
  }
} while (Number(userGuess?.userGuessedNumber) === numberToBeGuessed);
