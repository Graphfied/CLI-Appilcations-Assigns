import inquirer from "inquirer";
import chalk from "chalk";
/**
 * It asks the user to enter a math problem, then it evaluates the problem and prints the answer.
 */
const simpleCalculator = async () => {
    let values;
    do {
        values = await inquirer.prompt([
            {
                name: "question",
                message: "Enter the values you want to solve(e.g.: 6*9/3+4-2) = ",
            },
        ]);
    } while (values.question.length === 0 ||
        (!values.question.includes("+") &&
            !values.question.includes("-") &&
            !values.question.includes("*") &&
            !values.question.includes("/") &&
            !values.question.includes("%")) ||
        values.question.includes("a") ||
        values.question.includes("b") ||
        values.question.includes("c") ||
        values.question.includes("d") ||
        values.question.includes("e") ||
        values.question.includes("f") ||
        values.question.includes("g") ||
        values.question.includes("h") ||
        values.question.includes("i") ||
        values.question.includes("j") ||
        values.question.includes("k") ||
        values.question.includes("l") ||
        values.question.includes("m") ||
        values.question.includes("n") ||
        values.question.includes("o") ||
        values.question.includes("p") ||
        values.question.includes("q") ||
        values.question.includes("r") ||
        values.question.includes("s") ||
        values.question.includes("t") ||
        values.question.includes("u") ||
        values.question.includes("v") ||
        values.question.includes("x") ||
        values.question.includes("y") ||
        values.question.includes("z") ||
        isNaN(Number(values.question[values.question.length - 1])));
    console.log(chalk.white("Your answer is = "), chalk.bold.blue(eval(values.question)));
};
export { simpleCalculator };
