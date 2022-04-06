#  Uptain Full-Stack coding challenge

This is a simple serverless application for the user to create, delete and to view the items which are created.


[React JS ](https://reactjs.org/) is used to develop the user Interface.


[Serverless Framework](https://www.serverless.com/) is used to develop serverless application on [AWS Lambda](https://aws.amazon.com/lambda/), [API Gateway](https://aws.amazon.com/api-gateway/), [DynamoDB](https://aws.amazon.com/de/dynamodb/).

In order to structure the service, [aws-nodejs-typescript](https://www.serverless.com/framework/docs/providers/aws/cli-reference/create) templete is used.


Requirements
------------

 * [Node.js](https://nodejs.org/en/) version of either v12.14 or v14.15 +
 * [NPM](https://www.npmjs.com/) version of 8+
 * [Typescript](https://www.typescriptlang.org/)
 * [Serverless](https://www.serverless.com/)

## Setup Service

For installing NPM packages

#### Using NPM

- Run `npm i` to install the project dependencies

#### Using Yarn

- Run `yarn` to install the project dependencies


After that, use command given below for deploying the project

```bash
serverless deploy
```

## Setup React Project

For installing NPM packages

```bash
npm install
```
Setup Backend Service before running the project and update **API URL** in the **JSON** file which is existing in the folder
**/src/utils/config.json**

After that, use command given below for running the project

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.