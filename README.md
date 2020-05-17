# serverless-simple-api

The purpose of this repository is to develop a basic/clean serverless API using the same concepts as standards frameworks. (.net, laravel, nestJs, etc)

## Motivation:point_up:

Web APIs developed using Laravel, .NET, NodeJs, etc use many concepts, including:

- Dependency Injection (IOC)
- Domain Layer (Services: Business Roles)
- Repository Layer - IO/Database operations
- Declarative Routes (Decorators - ts, attributes - .NET, etc)
- Cache
- Middlewares, Interceptors.
- Request Validations
- Authentication & Authorization
- Mappers, DTOs.

Should be easy and simple to develop, test and deploy a serverless API that has all these features and more

## Goal? :runner:

Set up a testable serverless web api on AWS Serverless environment that can be deployed easily and have all the basic concepts above available.

Show how serverless environments are flexible and simple to use, test and deploy.

## Stack :rocket:

- **Serverless Framework**: Deploy and run the API locally.
- **Docker**: Database Local container.
- **Webpack**: Generate all bundles for serverless functions.
- **Prisma**: SQL Database client
- **Inversify**: IOC Container
- **Github Actions**: CI/CD

## Running/using it:

1. Run `yarn` to install dependencies
2. Run `docker-compose up -d` to create the database container. (Note: The .env file is committed to this repository but in production apps
   you should not push .env in your github repository. You can use instead CI/CD tools to set your secrets or a service like AWS Secrets Manager.
3. Run `yarn migrate` to create your database tables. Note: that is experimental according to [Prisma documentation](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate)
4. Run `yarn generate` to generate prisma client.
5. Run `yarn dev` to run it locally.
6. You can use tools as postman or [insomnia](https://insomnia.rest/) to make easier to test the api. If you prefer to use the second option just import the file `insomnia.json` available on the project root folder.

## Folder/structure

- `core/api`: All core components for api: container, middlewares, providers.
- `http`: All API Resources & Methods.
- `domain`: Domain Layer
- `db`: DB Service provider

## Coming Next

I'll try to add many more features to this sample:

- Tests and TDD.
- Deployment, CI/CD on AWS (Github actions, secret manager)
- Event Driven Architecture (Introduce event bridge)
- Authentication & Authorization (AWS Cognito)
- Cache (Redis)
- Request validations/dto parsing.
- GraphQL Api using Apollo Server and nexus-prisma.
