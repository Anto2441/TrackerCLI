#!/usr/bin/env node

import { Command } from 'commander';

import addTask from './commands/addTask.js';
import deleteTask from './commands/deleteTask.js';
import readTask from './commands/readTask.js';
import updateTask from './commands/updateTask.js';

const program = new Command();

program.name('task').description('Task Tracker CLI').version('1.0.0');

program
  .command('read')
  .description('Read all tasks')
  .action(async () => {
    try {
      await readTask();
    } catch (error) {
      console.error('Failed to read tasks:', error.message);
    }
  });

program
  .command('add')
  .description('Add a new task')
  .action(async () => {
    try {
      await addTask();
    } catch (error) {
      console.error('Failed to add task:', error.message);
    }
  });

program
  .command('update')
  .description('Update a task')
  .action(async () => {
    try {
      await updateTask();
    } catch (error) {
      console.error('Failed to update task:', error.message);
    }
  });

program
  .command('delete')
  .description('Delete a task')
  .action(async () => {
    try {
      await deleteTask();
    } catch (error) {
      console.error('Failed to delete task:', error.message);
    }
  });

program.parse();
