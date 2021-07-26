const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_manageDB",
});

connection.connect((err) => {
  if (err) throw err;
  userAction();
});

const userAction = () => {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add (Departments, roles, employees)",
          "View (Departments, roles, employees)",
          "Delete (Departments, roles, employees)",
          "View Budget of certain departments",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "Add (Departments, roles, employees)":
          addFunc();
          break;
        case "View (Departments, roles, employees)":
          viewFunc();
          break;
        case "Delete (Departments, roles, employees)":
          deleteFunc();
          break;
        case "View Budget of certain departments":
          viewBudgetFunc();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          console.log(
            `Invalid action: ${answer.action}. Please make another selection`
          );
          break;
      }
    });
};

const addFunc = () => {
  inquirer
    .prompt([
      {
        name: "toAdd",
        type: "list",
        message: "What would you like to add? (Department, role, employees)",
        choices: ["Department", "Role", "Employee"],
      },
    ])
    .then((answer) => {
      switch (answer.toAdd) {
        case "Department":
          addDept();
          break;
        case "Role":
          addRole();
          break;
        case "Employee":
          addEmployee();
          break;
        default:
          console.log(`Invalid Selection: ${answer.toAdd}`);
          break;
      }
    });
};

const addDept = async () => {
  try {
    const { name } = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add?",
      },
    ]);
    const query = "INSERT INTO department SET ?";
    connection.query(query, name, (err, department) => {
      if (err) throw err;
      console.log("Department Added:", department);
      connection.end();
    });
  } catch (e) {
    console.log(e);
    connection.end();
  }
};

// const addRole = () => {
//   inquirer
//     .prompt([
//       {
//         name: "role",
//         type: "input",
//         message: "What role would you like to add?",
//       },
//       {
//         name: "salary",
//         type: "input",
//         message: "What is the salary for this role within your organization?",
//       },
//     ])
//     .then((answer) => {
//       const query = "INSERT INTO role SET ?";
//       connection.query(query, answer.department, (err, res) => {
//         if (err) throw err;
//       });
//       userAction();
//     });
// };
