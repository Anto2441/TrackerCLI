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
        message: 'Enter the code of the task you want to delete:',
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

export default async function deleteTask() {
  let spinner;

  try {
    const taskCode = await getTaskCode();

    await connectDB();

    spinner = ora('Finding and deleting task...').start();

    const response = await Tasks.deleteOne({ code: taskCode });

    spinner.stop();

    if (response.deletedCount === 0) {
      console.log(
        chalk.yellowBright(
          'No task found with the provided code. Deletion failed.'
        )
      );
    } else {
      console.log(chalk.greenBright('Task deleted successfully.'));
    }
  } catch (error) {
    if (spinner) spinner.fail(chalk.redBright('Failed to delete task.'));
    console.error(
      chalk.redBright('Error during task deletion:'),
      error.message
    );
  } finally {
    await disconnectDB();
  }
}
