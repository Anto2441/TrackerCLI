import chalk from 'chalk';
import ora from 'ora';

import { connectDB, disconnectDB } from '../db/connectDB.js';
import Tasks from '../schema/TaskSchema.js';

export default async function readTask() {
  let spinner;
  try {
    await connectDB();

    spinner = ora('Fetching all tasks...').start();

    const tasks = await Tasks.find({});
    spinner.succeed('Tasks fetched successfully!');

    if (tasks.length === 0) {
      console.log(chalk.blueBright('No tasks found.'));
    } else {
      tasks.forEach((task) => {
        console.log(
          chalk.cyanBright('Task Code: ') +
            task.code +
            '\n' +
            chalk.blueBright('Name: ') +
            task.name +
            '\n' +
            chalk.yellowBright('Description: ') +
            task.detail +
            '\n' +
            chalk.greenBright('Status: ') +
            task.status +
            '\n'
        );
      });
    }
  } catch (error) {
    if (spinner) spinner.fail('Failed to fetch tasks.');
    console.error(chalk.redBright('Error:'), error.message);
  } finally {
    await disconnectDB();
  }
}
