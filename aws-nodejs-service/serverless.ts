import type { AWS } from '@serverless/typescript';

const DYNAMO_TABLE = "items";
const REGION = 'us-east-1';

const serverlessConfiguration: AWS = {
  service: 'aws-nodejs-service',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack"],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: REGION,
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem"
            ],
            Resource: "arn:aws:dynamodb:" + REGION + ":*:*"
          }
        ]
      }
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DYNAMO_TABLE,
      REGION
    },
  },
  resources: {
    Resources: {
      ItemsDynamoTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: DYNAMO_TABLE,
        }
      }
    }
  },
  functions: {
    createItem: {
      handler: "src/handler.createItem",
      events: [
        {
          http: {
            method: "post",
            path: "items",
            cors: true
          }
        }
      ]
    },
    getItems: {
      handler: "src/handler.getItems",
      events: [
        {
          http: {
            method: "get",
            path: "items",
            cors: true
          }
        }
      ]
    },
    deleteItems: {
      handler: "src/handler.deleteItem",
      events: [
        {
          http: {
            method: "delete",
            path: "items/{id}",
            cors: true
          }
        }
      ]
    }
  },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
