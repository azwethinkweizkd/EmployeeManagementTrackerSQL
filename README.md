# EmployeeManagementTrackerSQL [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Description

Create and store information about your organization with this application. Answer a few questions to build your database with all the information you need about the departments, the employees in that department and the roles they have within your organization. There are features of this application allow you to view your database with the current information stored, as well as delete or update information that you see fit.

## Table of Contents

- ### [Installation](#installation)
- ### [Usage](#usage)
- ### [Contribution](#contribution)
- ### [Test Instructions](#testInstructions)
- ### [License](#License)

## Installation

Installation of this application will require one to transfer all files (JS & json) to a working directory on their computer. As well as the ability to acces the computer terminal, either through GitBash, VSCode, or Windows Powershell. This applcation can be found on this GitHub repository:

[EmployeeManagementTrackerSQL-GitHub Repository](https://github.com/azwethinkweizkd/EmployeeManagementTrackerSQL)

Once files have been save into a working directory a one more step will need to take place, and that is to install node_modules. The node_modules will include three important installation packages which are: inquirer, console.table, & mysql.

To install the node_modules properly one will need to type in the terminal under the current working directory for the application:

```bash
npm i
```

Doing this will make sure that all node_modules that were used to create this application are installed on your machine

Make sure that you are in the directory that these JS & json files have been saved to. Otherwise you will be installing the node_modules to the wrong directory, and thus will not allow the appliation to work.

To use this application successfully, locate the current directory that the application is saved in the terminal.

From there type:

```bash
mpm start
```

You will then be asked a series of questions pertaining to what information you would like to populate into your SQL database. Begin by populating the departs you will have in your company, followed by the roles within that department, and finally the employees you hire to fill those roles. If the employee leaves the company or changes position within the company there are options to do that as well. Currently some functions (View Employee by Manager and View Budget of Departments) are not fully operational but will be with further versions of the application.

## Usage

Get your blossoming organization assembled fast and simple! Use this application to store information about your companies departments, employees, and their roles. See below for an operational video to help get started:

![EmployeeManagementTrackerSQL](assets/gif/12-SQL-screenshot)

## Contribution

Kevin Devlin - Main Contributor

GitHub Username:

[azwethinkweizkd](https://github.com/azwethinkweizkd)

## Test Instructions

There are currently no test being used for this node command line application.

## License

    This project was created using GNU GPL v3
