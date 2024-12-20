import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';

import { connectDB, disconnectDB } from '../db/connectDB.js';
import Tasks from '../schema/TaskSchema.js';

export async function getTaskCode() {
  try {
    const { code } = await inquirer.prompt([
      {
        name: 'code',
        message: 'Enter the code of the task you want to update:',
        type: 'input',
        validate: (input) =>
          input.trim() !== '' || 'Task code cannot be empty.',
      },
    ]);

    return code.trim();
  } catch (error) {
    console.error(
      chalk.redBright('Error while getting task code:'),
      error.message
    );
    process.exit(1);
  }
}

async function askUpdateQuestions(task) {
  try {
    const updates = await inquirer.prompt([
      {
        name: 'name',
        message: 'Update the name:',
        type: 'input',
        default: task.name,
      },
      {
        name: 'detail',
        message: 'Update the description:',
        type: 'input',
        default: task.detail,
      },
      {
        name: 'status',
        message: 'Update the status:',
        type: 'list',
        choices: ['pending', 'completed'],
        default: task.status,
      },
    ]);

    return updates;
  } catch (error) {
    console.error(
      chalk.redBright('Error while asking update questions:'),
      error.message
    );
    process.exit(1);
  }
}

export default async function updateTask() {
  let spinner;

  try {
    const taskCode = await getTaskCode();

    await connectDB();

    spinner = ora('Finding the task...').start();

    const task = await Tasks.findOne({ code: taskCode });

    spinner.stop();

    if (!task) {
      console.log(chalk.redBright('Task not found.'));
      return;
    }

    console.log(chalk.greenBright('Task found successfully!'));

    const updates = await askUpdateQuestions(task);

    spinner = ora('Updating the task...').start();

    await Tasks.updateOne({ code: taskCode }, updates);

    spinner.succeed(chalk.greenBright('Task updated successfully!'));
  } catch (error) {
    if (spinner) spinner.fail(chalk.redBright('Failed to update task.'));
    console.error(chalk.redBright('Error during task update:'), error.message);
  } finally {
    await disconnectDB();
  }
}
