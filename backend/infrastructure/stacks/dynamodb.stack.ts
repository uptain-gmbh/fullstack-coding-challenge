import * as sst from '@serverless-stack/resources';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { CfnOutput } from '@aws-cdk/core';

export default class DynamoDbStack extends sst.Stack {
    constructor(app: sst.App, id: string, props?: sst.StackProps) {
        super(app, id, props);

        const booksTable = new dynamodb.Table(this, 'Books', {
            readCapacity: 1,
            writeCapacity: 1,
            partitionKey: { name: 'bookId', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'createdAt', type: dynamodb.AttributeType.NUMBER },
        });

        new CfnOutput(this, "dynamodb-books-table-arn", {
            value: booksTable.tableArn,
            exportName: app.logicalPrefixedName("dynamodb-books-table-arn")
        });

        new CfnOutput(this, "dynamodb-books-table-name", {
            value: booksTable.tableName,
            exportName: app.logicalPrefixedName("dynamodb-books-table-name")
        });
    }
}
