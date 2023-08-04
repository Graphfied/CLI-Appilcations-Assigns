#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

console.log(
  "                   ::^^^:::^^^::.     :~!~^.     :^:::^^^:.          .^~!^.                         "
);
console.log(
  "                  !@@&&&@@@&&&@@G  :P@@&#&@@&?   J#@@@&&&@@&J.     J&@@&#&@@P.                      "
);
console.log(
  "                  ^#G   &@@.  Y&J 7@@B.    ~@@&.   @@&    ^&@@~  .&@@^    .B@@~                     "
);
console.log(
  "                        &@@.     .@@&       ~@@G   @@&      @@@  B@@^       &@@                     "
);
console.log(
  "                        &@@.     ~@@G       .@@&   @@&      B@@: @@@        B@@:                    "
);
console.log(
  "                        &@@.     .@@&       ^@@G   @@&      @@@. #@@:       &@@                     "
);
console.log(
  "                        &@@.      7@@G.    ^@@&.   @@&    ^&@@~  .&@&^    .B@@!                     "
);
console.log(
  "                      !B@@@#Y      :G@@&##&@&J   J#@@@&&&@@&Y.     Y&@&##&@@G.                      "
);
console.log(
  "                      .^^^^^:         :~!!^.     :^^^^^^^:.          .^!!~:                         "
);
interface Todo {
  title: string;
  description: string;
  timeAdded: Date;
  id: number;
}
let todos: Array<Todo> = [],
  newTodo: Todo,
  nextAction,
  todoNumber: { todoID: string };
const addTodo = async () => {
  do {
    newTodo = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the Todo: ",
      },
      {
        name: "description",
        type: "input",
        message: "Enter the description of the Todo: ",
      },
    ]);
  } while (newTodo?.title.length < 3 || newTodo?.description.length < 15);
  newTodo = { ...newTodo, timeAdded: new Date(), id: todos.length };
  todos.push(newTodo);
  console.log(chalk.green("New todo successfully added."));
};
const askUserForNextAction = async () => {
  nextAction = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      choices: ["Add new todo", "Delete a todo", "Read all todos"],
    },
  ]);
  const printAllTodos = () => {
    console.log(
      chalk.bgYellow.black("Printing all the todos you have added.\n")
    );

    todos.forEach((todo, index) => {
      console.log(
        chalk.bgYellow.black(index + 1 + ")"),
        `Title: ${todo.title}`
      );
      console.log("Description", `: ${todo.description}`);
    });
    console.log("\n");
  };
  const deleteTodo = async () => {
    printAllTodos();
    do {
      todoNumber = await inquirer.prompt([
        {
          name: "todoID",
          type: "number",
          message: "Enter the number of todo you want to delete.",
        },
      ]);
    } while (
      isNaN(Number(todoNumber?.todoID)) ||
      Number(todoNumber?.todoID) > todos.length
    );
    todos = todos.filter((todo) => todo.id !== Number(todoNumber?.todoID) - 1);
    console.log("Todo has successfully deleted.");
    console.log(todos);
  };
  switch (nextAction.action) {
    case "Add new todo":
      await addTodo();
      break;
    case "Read all todos":
      printAllTodos();
      break;
    case "Delete a todo":
      await deleteTodo();
      break;
    default:
      break;
  }
};
await addTodo();
do {
  await askUserForNextAction();
} while (true);
