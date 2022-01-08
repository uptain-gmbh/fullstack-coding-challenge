import sst from '@serverless-stack/resources';
import { CfnOutput } from '@aws-cdk/core';

/*
  Stack to define the DynamoDB table and export its name and arn
 */
export default class StorageStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const TABLE_NAME = 'notes';

    const table = new sst.Table(this, TABLE_NAME, {
      fields: {
        noteId: sst.TableFieldType.STRING,
        content: sst.TableFieldType.STRING,
        createdAt: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'noteId' },
    });

    const NOTES_APN_NAME = 'dynamodb-notes-table-arn';

    new CfnOutput(this, NOTES_APN_NAME, {
      value: table.tableArn,
      exportName: scope.logicalPrefixedName(NOTES_APN_NAME),
    });

    const NOTES_EXPORT_TABLE_NAME = 'dynamodb-notes-table-name';

    new CfnOutput(this, NOTES_EXPORT_TABLE_NAME, {
      value: table.tableName,
      exportName: scope.logicalPrefixedName(NOTES_EXPORT_TABLE_NAME),
    });
  }
}
