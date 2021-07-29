DROP DATABASE IF EXISTS employee_manageDB;
CREATE DATABASE employee_manageDB;

USE employee_manageDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `role` (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(50,2) NOT NULL,
    departmentid INT,
    PRIMARY KEY (id),
    FOREIGN KEY (departmentid) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roleid INT,
    manageid INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manageid) REFERENCES employee(id),
    FOREIGN KEY (roleid) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES ('Engineering'),
("Legal"),
("Sales Team");

SELECT * FROM department;

INSERT INTO role (title, salary, departmentid)
VALUES ("Engineer", 100000, 1),
("Lawyer", 120000, 2),
("Sales", 80000, 3),
("Manager", 95000, 1);

SELECT title, name FROM role
LEFT JOIN department
ON role.departmentid = department.id
WHERE name = "Engineering";

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, roleid, manageid)
VALUES ("Jane", "Doe", 4, null),
("John", "Doe", 1, 1),

("Adam", "Warlock", 2, null);

SELECT * FROM employee;


SELECT employee.id, first_name, last_name, title, department.name, salary FROM employee 
LEFT JOIN role 
ON employee.roleid = role.id 
LEFT JOIN department 
ON role.departmentid = department.id;
