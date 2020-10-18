const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = require("./connection.js");


// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles


userPropmt = (connection) => {
    inquirer.prompt([
        {
            name: "listOptions",
            type: "rawList",
            message: "Please choose an option:",
            choices: [
                "Add Department",
                "Add Employee",
                "Add Role"
            ]
        }
    ])
};

userPropmt();