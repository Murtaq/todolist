# Todolist

### About

This project contains a sample application for managing a todo list to confirm my full-stack programming skills.
It was developed during 05/2023 for the [feynsinn](https://www.feynsinn.de/) brand of the EDAG Production Solutions GmbH & Co. KG.

### Stack

This project contains the two code-based components of a three component setup.
The three components are an Angular-based front-end, a single Quarkus microservice as back-end and a PostgreSQL database.
The front-end accepts user input for management of a todo list and communicates via REST with the microservice.
The microservice provides CRUD functionality for the front-end by connecting with the the database.

### Executing

To execute the project first install the dependencies via terminal using `npm install` or `yarn install`.
Afterwards you can start the apps via the command line.
In two terminals start

- the Angular front-end using `nx serve todolist` and
- the Quarkus back-end using `nx serve todolist-backend`.

Afterwards you can access

- the Angular front-end on [https://localhost:4200](https://localhost:4200)
- the Quarkus back-end on [https://localhost:8080](https://localhost:8080)
- the back-end development ui on [http://localhost:8080/q/dev-ui](http://localhost:8080/q/dev-ui)
- the back-end API documentation on [http://localhost:8080/q/swagger-ui/](http://localhost:8080/q/swagger-ui/)

Please note the following:

- The ports 4200 and 8080 have to be available.
- A PostgreSQL database has to be accessible at [localhost:5432](localhost:5432) with the user `postgres` using the password `postgres`.
  - If the database instance has different properties, these values can be changed in the `application.properties` file available at `apps\todolist-backend\src\main\resources`.
