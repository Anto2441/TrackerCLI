import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';

import { connectDB, disconnectDB } from '../db/connectDB.js';
import Tasks from '../schema/TaskSchema.js';

async function input() {
  return await inquirer.prompt([
    {
      name: 'name',
      message: 'Enter name of the task:',
      type: 'input',
      validate: validateName,
    },
    {
      name: 'detail',
      message: 'Enter the details of the task:',
      type: 'input',
      validate: validateDetail,
    },
  ]);
}

function validateName(name) {
  if (!name || name.trim().length < 3) {
    return 'Task name must be at least 3 characters long.';
  }
  return true;
}

function validateDetail(detail) {
  if (!detail || detail.trim().length === 0) {
    return 'Task detail cannot be empty.';
  }
  return true;
}

async function askQuestions() {
  const tasksArray = [];
  let continueAdding = true;

  while (continueAdding) {
    const userResponse = await input();
    tasksArray.push(userResponse);
    const { confirm } = await inquirer.prompt([
      {
        name: 'confirm',
        message: 'Do you want to add more tasks?',
        type: 'confirm',
      },
    ]);
    continueAdding = confirm;
  }

  return tasksArray;
}

export default async function addTask() {
  let spinner;

  try {
    const tasks = await askQuestions();

    await connectDB();

    spinner = ora('Saving tasks to the database...').start();

    // Insert all tasks in one operation
    await Tasks.insertMany(tasks);

    spinner.succeed(
      chalk.greenBright('All tasks have been successfully created!')
    );

    await disconnectDB();
  } catch (error) {
    if (spinner) spinner.fail(chalk.redBright('Failed to save tasks.'));
    console.error(chalk.redBright('Error:'), error.message);
    process.exit(1);
  }
}
