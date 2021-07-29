# EmployeeManagementTrackerSQL [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Description

This application will help you create an HTML page on the fly within the command line! Quickly assemble an html page with information gathered to display your current team on a web page with working links. A manager of a project can assemble and gather information of their team from Engineers and Interns with just a few simple questions from the command line.

## Table of Contents

- ### [Installation](#installation)
- ### [Usage](#usage)
- ### [Contribution](#contribution)
- ### [Test Instructions](#testInstructions)
- ### [License](#License)

## Installation

Installation of this application will require one to transfer all files (JS & json) to a working directory on their computer. As well as the ability to acces the computer terminal, either through GitBash or VSCode. This applcation can be found on this GitHub repository:

[ProfileGeneratorforTeamsApp-GitHub Repository](https://github.com/azwethinkweizkd/ProfileGeneratorforTeams)

Once files have been save into a working directory a one more step will need to take place, and that is to install node_modules. The node_modules will include two important installation packages which are: inquirer & jest.

To install the node_modules properly one will need to type in the terminal under the current working directory for the application:

```bash
npm i inquirer
```

and to install jest properly type this command into the terminal:

```bash
npm i jest
```

These two node_modules will be resposible for asking the questions in the command line (inquirer) and testing the js files (jest).

Make sure that you are in the directory that these JS & json files have been saved to. Otherwise you will be installing the node_modules to the wrong directory, and thus will not allow the appliation to work.

To use this application successfully, locate the current directory that the application is saved in the terminal.

From there type:

```bash
node index
```

You will then be asked a series of questions pertaining to what information you would like to populate to your new _index.html_. Only one manager can be entered at the very beginning of the initialization of the application. Once the manager is filled out with the proper infomation, two different employee roles can be selected to add to the growing team. The user can choose to pick an Engineer or an Intern. You can choose how ever many Engineers or Interns you want to populate your team with their pertainate information, and when finished adding all the new team members you can choose to exit the applicaiton which will exit the command line application and generate the desired HTML. Every HTML saved will always have a standard name of _index.html_, and saved in the directory called _dist_ located within the cloned repository.

## Usage

Get your team assembled fast and simple! Use this application to display your employees roles and information to an HTML page in a few quick and easy steps. The main function will be to setup an HTML page with one manager and unlimited amount of either Engineers or Interns, based off the selections made within the command line.

![Team Profile Generator Application](assets/gif/applicationScreenshot.gif)

## Contribution

Kevin Devlin - Main Contributor

GitHub Username:

[azwethinkweizkd](https://github.com/azwethinkweizkd)

## Test Instructions

There are currently no test being used for this node command line application.

## License

    This project was created using GNU GPL v3
