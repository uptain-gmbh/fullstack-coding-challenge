import * as sst from "@serverless-stack/resources";
import { RemovalPolicy } from '@aws-cdk/core';
import CoreStack from './core.stack';
import DynamoDbStack from './dynamodb.stack';

export default function main(app: sst.App): void {

    // Remove all resources when the dev stage is removed
    if (app.stage === "dev") {
        app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
    }

    new DynamoDbStack(app, "dynamodb");
}
