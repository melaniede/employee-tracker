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
            type: "rawlist",
            message: "Please choose an option:",
            choices: [
                "Add Department",
                "Add Employee",
                "Add Role"
            ]
        }
    ]).then(function (answers) {
        switch (answers.listOptions){
            case "Add Department":
                addDepartment();
                break;
        }
    })
};

addDepartment = () => {
    inquirer.prompt({
        name: "addDepartment",
        type: "input",
        message: "What department would you like to add?"
    })
    .then(function(answers){
        connection.query("INSERT INTO department (name) VALUES (?)", answers.addDepartment, function (err, res){
            if (err) throw err;
            console.log("New department successfully added");
            userPropmt(connection);
        });
    })
}

userPropmt();