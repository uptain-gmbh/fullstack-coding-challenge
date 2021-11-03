# Backend project
The project is built with yarn workspaces, and they help split code between different services and extract it into packages.
Also, yarn workspaces help us to control packages in a single place and reference packages locally.

## How to run
- Make sure you have a `yarn 3` installed in system
- Run yarn in the root of workspace, so it can download everything
- if you want to make a test on `AWS`:
  - jump to infrastructure folder
  - change the stage variable, if you need another stage prefix, and execute `yarn deploy:dev`
  - this may take a while, as AWS will allocate all resources
  - after initial allocation is done, navigate to `src/services/books-api` folder
  - execute there a command `yarn deploy:dev`, and wait until serverless show the endpoints of gateway
- if you want to execute it `locally`:
  - make sure you have docker & compose installed on your environment
  - jump to `src/services/books-api`, and run `yarn dev:dynamodb`
  - verify that dynamodb is running in docker (`docker ps` command can do it in terminal)
  - run `yarn dev:dynamodbview`, and open url provided. This is a DynamoDb administrative UI.
  - run `yarn start` to run local version of backend, usually it takes localhost:3000 endpoint.

## Few manual tests
There is a `tests` folder in `src/services/books-api` which contains a json file for `Insomnia` application. This can 
be used to perform some basic tests of API.

## Description

`infrastructure` folder contains the deployment of core or static, rarely-changed things to AWS with CDK & SST.
CloudFormation outputs can be referenced in any service by ImportValue with correct references. This is made by sharing
the name prefixes between CDK and Serverless.
Each stack can be built separately in their folder in the infrastructure project.

`src` folder contains three different entries:
- `packages`, which can be published to private NPM repository, and used locally in project
- `services`, which contains our functions and their logic
- `shared`, which is the place where shared utilities can be put

`books-api` is a project that has three lambda functions for creation, listing, and deletion. The project utilizes
a Dynamoose DynamoDB library uses a class-validator with class-transformers for declarative validation,
and has a debug library for logging.
The solution also has an abstraction level over lambda functions and in case of migration to Kubernetes,
it will not be such a pain to extract the logic.
