# Task Manager CLI Tool

The Task Manager CLI Tool is an interactive command-line interface for managing your tasks. Built with **Node.js**, **Commander.js**, and **MongoDB**, it allows you to perform CRUD operations (Create, Read, Update, Delete) directly from your terminal.

---

## 🚀 Features

- **Create Tasks**: Add one or more tasks in a single command.
- **Read All Tasks**: View a list of all your tasks, including details (name, description, status, etc.).
- **Update a Task**: Modify the details of a specific task.
- **Delete a Task**: Remove a task from your database using its unique code.

---

## 🛠️ Installation and Configuration

### Step 1: Clone the Project

To set up this tool directly from this repository, you need to follow these steps:

- Clone the repository and navigate to its directory. Then, install all required dependencies by running: `npm install`
- Create a .env file in the root directory of the project. Inside the file, define the MONGO_URI variable and assign your MongoDB connection string to it: `MONGO_URI=YOUR_MONGODB_CONNECTION_STRING`
- Finally, install the tool globally on your system with the following command: `npm i -g .`
