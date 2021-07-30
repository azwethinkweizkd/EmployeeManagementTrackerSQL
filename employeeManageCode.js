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
          "Update (Roles, employee manager)",
          "Delete (Department, Roles, employees)",
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
        case "Delete (Department, Roles, employees)":
          deleteFunc();
          break;
        case "Update (Roles, employee manager)":
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
          userAction();
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
      userAction();
    });
  } catch (e) {
    console.log(e);
    userAction();
  }
};

const addRole = () => {
  connection.query(
    "SELECT id, name FROM department",
    async (err, departments) => {
      try {
        const { department } = await inquirer.prompt([
          {
            message: "What department will this role be in?",
            name: "department",
            type: "list",
            choices: departments.map(({ name }) => name),
          },
        ]);

        const { id: departmentid } = departments.find((name) => {
          return name.name === department;
        });

        const { title, salary } = await inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What role would you like to add?",
          },
          {
            name: "salary",
            type: "input",
            message:
              "What is the salary for this role within your organization?",
          },
        ]);

        const query = "INSERT INTO role SET ?";
        connection.query(
          query,
          { title, salary, departmentid },
          (err, role) => {
            if (err) throw err;
            console.log("Role Added:", role);
            userAction();
          }
        );
      } catch (e) {
        console.log(e);
        userAction();
      }
    }
  );
};

const addEmployee = () => {
  connection.query("SELECT title, id FROM role", async (err, titles) => {
    if (err) throw err;
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
      console.log(roleid);
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
          userAction();
        }
      );
    } catch (e) {
      console.log(e);
      userAction();
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
    "SELECT employee.id, first_name, last_name, title, department.name, salary FROM employee LEFT JOIN role ON employee.roleid = role.id LEFT JOIN department ON role.departmentid = department.id",
    (err, employees) => {
      if (err) throw err;
      console.table(employees);
      userAction();
    }
  );
};

const viewByManager = () => {};

const viewDept = () => {
  connection.query("SELECT name FROM department", async (err, departments) => {
    if (err) throw err;
    try {
      const { name } = await inquirer.prompt([
        {
          message: "Which departments staff would you like to view?",
          name: "name",
          type: "list",
          choices: departments.map(({ name }) => name),
        },
      ]);

      const query =
        "SELECT employee.id, first_name, last_name, title, ? FROM employee LEFT JOIN role ON employee.roleid = role.id LEFT JOIN department ON role.departmentid = department.id WHERE name = ?";

      connection.query(query, [name, name], (err, res) => {
        if (err) throw err;
        console.table(res);
        userAction();
      });
    } catch (e) {
      console.log(e);
      userAction();
    }
  });
};

const deleteFunc = () => {
  inquirer
    .prompt([
      {
        name: "delete",
        type: "list",
        message: "What would you like to delete?",
        choices: ["Delete Employee", "Delete Role", "Delete Department"],
      },
    ])
    .then((answer) => {
      switch (answer.delete) {
        case "Delete Employee":
          delEmployee();
          break;
        case "Delete Role":
          delRole();
          break;
        case "Delete Department":
          delDept();
          break;
        default:
          console.log(`Invalid Selection: ${answer.view}`);
          break;
      }
    });
};

const delEmployee = () => {
  connection.query("SELECT * FROM employee", async (err, employees) => {
    if (err) throw err;
    try {
      const employeeToDelete = await inquirer.prompt([
        {
          message: "Which employee would you like to delete?",
          name: "employee",
          type: "list",
          choices: employees.map(
            (employee) => employee.first_name + " " + employee.last_name
          ),
        },
      ]);
      connection.query(
        "DELETE FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?",
        employeeToDelete.employee,
        (err, employee) => {
          if (err) throw err;
          console.log("Employee Deleted:", employee);
          userAction();
        }
      );
    } catch (e) {
      console.log(e);
      connection.end();
    }
  });
};

const delRole = () => {
  connection.query("SELECT * FROM role", async (err, roles) => {
    if (err) throw err;
    console.log(roles);
    try {
      const roleToDelete = await inquirer.prompt([
        {
          message: "Which role would you like to delete?",
          name: "title",
          type: "list",
          choices: roles.map(({ title }) => title),
        },
      ]);
      console.log(roleToDelete);
      connection.query(
        "DELETE FROM role WHERE title = ?",
        roleToDelete.title,
        (err, role) => {
          if (err) throw err;
          console.log("Role Deleted:", role);
          userAction();
        }
      );
    } catch (e) {
      console.log(e);
      connection.end();
    }
  });
};

const delDept = () => {
  connection.query("SELECT * FROM department", async (err, departments) => {
    if (err) throw err;

    try {
      const deptToDelete = await inquirer.prompt([
        {
          message: "Which department would you like to delete?",
          name: "name",
          type: "list",
          choices: departments.map(({ name }) => name),
        },
      ]);
      console.log(name);
      connection.query(
        "DELETE FROM role WHERE title = ?",
        deptToDelete.name,
        (err, department) => {
          if (err) throw err;
          console.log("Department Deleted:", department);
          userAction();
        }
      );
    } catch (e) {
      console.log(e);
      connection.end();
    }
  });
};

const viewBudgetFunc = () => {
  connection.query("SELECT name FROM department", async (err, departments) => {
    if (err) throw err;
    try {
      const { name } = await inquirer.prompt([
        {
          message: "Which departments staff would you like to view?",
          name: "name",
          type: "list",
          choices: departments.map(({ name }) => name),
        },
      ]);

      const query =
        "SELECT ? AS department_name, SUM(salary) AS department_budget FROM department RIGHT JOIN role ON role.departmentid = department.id RIGHT JOIN employee ON employee.roleid = role.id";

      connection.query(query, [name], (err, res) => {
        if (err) throw err;
        console.table(res);
        userAction();
      });
    } catch (e) {
      console.log(e);
      userAction();
    }
  });
};

const updateFunc = () => {
  inquirer
    .prompt([
      {
        name: "toUpdate",
        type: "list",
        message:
          "What would you like to Update? (Employee Role, Employee Manager)",
        choices: ["Employee Role", "Employee Manager"],
      },
    ])
    .then((answer) => {
      switch (answer.toUpdate) {
        case "Employee Role":
          updateRole();
          break;
        case "Employee Manager":
          updateManager();
          break;
        default:
          console.log(`Invalid Selection: ${answer.toAdd}`);
          break;
      }
    });
};

const updateRole = async () => {
  connection.query(
    "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee, id FROM employee",
    (err, employees) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            message: "Which employee would you like to update?",
            name: "employee",
            type: "list",
            choices: employees.map(({ employee }) => employee),
          },
        ])
        .then(function (res) {
          connection.query("SELECT * FROM role", (err, roles) => {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  message:
                    "Which role would you like to update the employee to? (Make sure to add the new role before selecting a new role for your employee)",
                  name: "title",
                  type: "list",
                  choices: roles.map(({ title }) => title),
                },
              ])
              .then(function (rol) {
                const newRole = roles.find((role) => role.title === rol.title);
                const { employee } = res;
                connection.query(
                  "UPDATE employee SET roleid = ? WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?",
                  [newRole.id, employee],
                  (err, role) => {
                    if (err) throw err;
                    console.log("Role Updated:", role);
                    userAction();
                  }
                );
              });
          });
        });
    }
  );
};
