import AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

/*
  Abstract class for interaction with DynamoDB
 */
export abstract class BaseRepository {
  private readonly dynamoClient = new AWS.DynamoDB.DocumentClient();

  protected readonly TABLE_NAME: string;

  protected constructor(tableName: string) {
    this.TABLE_NAME = tableName;
  }

  protected async put(item: unknown): Promise<void> {
    console.log('Repository put', { item });

    await this.dynamoClient
      .put({
        Item: item,
        TableName: this.TABLE_NAME,
      })
      .promise();
  }

  protected async getList(): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.ScanOutput, AWS.AWSError>> {
    return this.dynamoClient
      .scan({
        TableName: this.TABLE_NAME,
      })
      .promise();
  }
}
