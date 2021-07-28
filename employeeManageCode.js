const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
          "Update (Roles, employees, employee manager)",
          "Delete (Roles, employees)",
          "View Budget of departments",
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
        case "Update (Departments, roles, employees)":
          updateFunc();
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
        type: "list",
        message: "What department would you like to add?",
        choices: ["Sales", "Engineering", "Legal", "Finance", "HR"],
      },
    ]);
    const query = "INSERT INTO department SET ?";
    connection.query(query, { name }, (err, department) => {
      if (err) throw err;
      console.log("Department Added:", department);
      connection.end();
    });
  } catch (e) {
    console.log(e);
    connection.end();
  }
};

const addRole = async () => {
  try {
    const { title, salary } = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role within your organization?",
      },
    ]);
    const query = "INSERT INTO role SET ?";
    connection.query(query, { title, salary }, (err, role) => {
      if (err) throw err;
      console.log("Role Added:", role);
      connection.end();
    });
  } catch (e) {
    console.log(e);
    connection.end();
  }
};

const addEmployee = () => {
  connection.query("SELECT title, id FROM role", async (err, titles) => {
    try {
      const { role } = await inquirer.prompt([
        {
          name: "role",
          type: "list",
          message: "What is your employees role within your organization?",
          choices: titles.map(({ title }) => title),
        },
      ]);

      const { id: roleid } = titles.find((title) => {
        return title.title === role;
      });
      console.log(titles);
      const { first_name, last_name } = await inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is your employees first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is your employees last name?",
        },
      ]);
      const query =
        "INSERT INTO employee (first_name, last_name, roleid) VALUES (?,?,?)";
      connection.query(
        query,
        [first_name, last_name, roleid],
        (err, employee) => {
          if (err) throw err;
          console.log("Employee Added:", employee);
          connection.end();
        }
      );
    } catch (e) {
      console.log(e);
      connection.end();
    }
  });
};

const viewFunc = () => {
  inquirer
    .prompt([
      {
        name: "view",
        type: "list",
        message: "What would you like to view?",
        choices: [
          "View All Employees",
          "View All Employees by Manager",
          "View All Employees by Department",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.view) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Employees by Manager":
          viewByManager();
          break;
        case "View All Employees by Department":
          viewDept();
          break;
        default:
          console.log(`Invalid Selection: ${answer.view}`);
          break;
      }
    });
};

const viewEmployees = () => {
  connection.query(
    "SELECT employee.id, first_name, last_name, title, salary, department FROM employee JOIN role ON employee.id = role.id",
    (err, employees) => {
      if (err) throw err;
      console.table(employees);
    }
  );
};
