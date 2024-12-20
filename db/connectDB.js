import dotenv from 'dotenv';
import chalk from 'chalk';
import mongoose from 'mongoose';
import ora from 'ora';

dotenv.config();

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log(chalk.yellowBright('Already connected to the database.'));
    return;
  }

  const spinner = ora('Connecting to the database...').start();
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    spinner.succeed('Successfully connected to the database!');
  } catch (error) {
    spinner.fail('Failed to connect to the database.');
    console.error(chalk.redBright('Error:'), error.message);
    process.exit(1);
  }
}

export async function disconnectDB() {
  if (!isConnected) {
    console.log(
      chalk.yellowBright('No active database connection to disconnect.')
    );
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log(chalk.greenBright('Disconnected from the database.'));
  } catch (error) {
    console.error(chalk.redBright('Error while disconnecting:'), error.message);
    process.exit(1);
  }
}
