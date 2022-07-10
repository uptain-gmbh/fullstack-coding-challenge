# Endpoints

- GET /groceries - return the list of created groceries
- GET /groceries/{id} - return specific grocery object
- POST /groceries - creates a grocery with provided values
- PUT /groceries - updated a grocery with provided values
- DELETE /groceries/{id} - deletes a grocery from database

Also you can use [insomnia JSON](/backend/Insomnia_API_Methods.json) to check API

## Requirements

- NodeJS v14.x
- Serverless framework installed
- yarn 1.22.x

## Set up

First install dependencies by calling `yarn` inside [backend](/) folder.

```bash
$ yarn
```

After that simply run `yarn run deploy`

```bash
$ yarn run deploy
```

This command will build your app and deploy it to AWS.

You can see deployed endpoints in serverless logs.
