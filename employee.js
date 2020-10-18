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
                "Add Role",
                "Exit"
            ]
        }
    ]).then(function (answers) {
        switch (answers.listOptions){
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Exit":
                connection.end();
        }
    })
};

addDepartment = () => {
    inquirer.prompt({
        name: "addDepartment",
        type: "input",
        message: "Which department would you like to add?"
    })
    .then(function(answers){
        connection.query("INSERT INTO department (name) VALUES (?)", answers.addDepartment, function (err, res){
            if (err) throw err;
            console.log("New department successfully added");
            userPropmt(connection);
        });
    })
}

addRole = () => {
    connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer.prompt([{
        name: "addRole",
        type: "input",
        message: "What role would you like to add?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
    },
    {
       name: "chooseDept",
       type: "rawlist",
       message: "Which department does this role belong in?",
       choices: res.map(function (role){
           return {
               name: role.name,
               value: role.id
           }
       })
    }]).then(function (answers){
        connection.query("INSERT INTO role SET ?", {
            title: answers.addRole, 
            salary: answers.salary, 
            department_id: answers.chooseDept
            }, 
            function (err, res){
                if (err) throw err;
                console.log("New role successfully added");
                userPropmt(connection);
            });
        });
    })
}

// first_name
// last_name
// role_id
// manager_id 

addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "What's the employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What's the employee's last name?"
    },
    // {
    //     name: "manager",
    //     type: "input",
    //     message: "Who is the manager for this role?"
    // },
    {
       name: "chooseRole",
       type: "rawlist",
       message: "What is the employee's role?",
       choices: res.map(function (employee){
           return {
               name: employee.title,
               value: employee.id
           }
       })
    }]).then(function (answers){
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName, 
            last_name: answers.lastName, 
            role_id: answers.chooseRole
            }, 
            function (err, res){
                if (err) throw err;
                console.log("New employee successfully added");
                userPropmt(connection);
            });
        });
    })
}


userPropmt();

