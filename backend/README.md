## Overview

API for Uptain challenge

Consists of endpoints:
- POST /notes - creates a note with provided content
- GET /notes - returns a list of all previously created notes stored in DynamoDB

# Requirements

- NodeJS v14.x
- Serverless framework installed

# Commands

### `npm run deploy`

Builds your app and deploys it to AWS.

Generates CloudFormation templates in `.serverless` folder.
