# Todolist

### About

This project contains a sample application for managing a todo list to confirm my full-stack programming skills.
It was developed during 05/2023 for the [feynsinn](https://www.feynsinn.de/) brand of the EDAG Production Solutions GmbH & Co. KG.

### Stack

This project contains the two code-based components of a three component setup.
The three components are an Angular-based front-end, a single Quarkus microservice as back-end and a PostgreSQL database.
The front-end serves accepts user input for management of a todo list and communicates via REST with the microservice.
The microservice provides CRUD functionality for the front-end by connecting with the the database.
