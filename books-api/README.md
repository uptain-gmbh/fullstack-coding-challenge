# Serverless REST API with DynamoDB

This application runs a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Books stored in a DynamoDB. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

In the project directory, run:

### `yarn install` or `npm install`

### `serverless dynamodb install`

### `serverless offline start`

Runs the app in the development mode.<br>
On [http://localhost:3000](http://localhost:3000)

### Create a Book

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/books --data '{ "title": "Serverless For Dummies", "isbn": "12345" }'
```

Example Result:

```bash
{"title":"Serverless For Dummies",
"isbn":"12345",
"id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,
"updatedAt":1479138570824}%
```

### List all Books

```bash
curl -H "Content-Type:application/json" http://localhost:3000/books
```

Example output:

```bash
[{"title":"Serverless For Dummies",
"isbn":"12345",
"id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,
"updatedAt":1479138570824},{"title":"AWS For Dummies",
"isbn":"67890",
"id":"ee6490d0-aa11e6-9ede-afdfa051af90","createdAt":1479138570824,
"updatedAt":1479138570824}]%
```
