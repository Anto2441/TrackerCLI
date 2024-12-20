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

To set up this tool directly from this repository, you need to follow these steps:

- Clone the repository and navigate to its directory. Then, install all required dependencies by running: `npm install`
- Create a .env file in the root directory of the project. Inside the file, define the MONGO_URI variable and assign your MongoDB connection string to it: `MONGO_URI=YOUR_MONGODB_CONNECTION_STRING`
- Finally, install the tool globally on your system with the following command: `npm i -g .`

## Supported Commands
You can create CRUD (Create, Read, Update and Delete) Operations using this cli tool. Here are a list of commands supported by the tool:
1. `task add` - To create one or multiple new task,
2. `task read` - To read all the existing tasks,
3. `task update` - To update a specific task, 
4. `task delete` - To delete a specific task.
5. `task` - See all commands.

## How to use the tool

![Capture d’écran 2024-12-20 à 14 35 51](https://github.com/user-attachments/assets/f7451188-2303-4a54-bb6d-ad78dbf3d66b)

![Capture d’écran 2024-12-20 à 14 36 29](https://github.com/user-attachments/assets/32387113-46fc-4a9d-9537-502aedd222c1)
