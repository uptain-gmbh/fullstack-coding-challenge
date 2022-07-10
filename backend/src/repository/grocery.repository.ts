import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { GroceryModel } from "../models";
import { v4 as uuid } from "uuid";
import { transformDBItem } from "../utils/dbItemsTransformer";
import { NotFoundException } from "../exceptions";

class GroceryRepository {
  client: DynamoDBClient;
  tableName: string;

  constructor() {
    if (!process.env.GROCERY_TABLE) throw new Error("Missing Table name");
    if (!process.env.REGION) throw new Error("Missing Region");
    this.tableName = process.env.GROCERY_TABLE;
    this.client = new DynamoDBClient({ region: process.env.REGION });
  }

  async getItems() {
    const command = new ScanCommand({ TableName: this.tableName });
    const res = await this.client.send(command);
    return res.Items.map(transformDBItem);
  }

  async getItem(id: string) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { id: { S: id } },
    });
    const res = await this.client.send(command);
    if (!res.Item) throw new NotFoundException(`Item with id: ${id} not found`);
    return transformDBItem(res.Item);
  }

  async addItem(model: Omit<GroceryModel, "id">) {
    const id = uuid();

    const item = {
      id: { S: id },
      ingredients: { S: model.ingredients },
      name: { S: model.name },
      weight: { N: model.weight.toString() },
    };

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: item,
    });

    await this.client.send(command);
    return { id, ...model } as GroceryModel;
  }

  async updateItem(model: GroceryModel) {
    const item = {
      id: { S: model.id },
      ingredients: { S: model.ingredients },
      name: { S: model.name },
      weight: { N: model.weight.toString() },
    };

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: item,
    });

    await this.client.send(command);
    return model;
  }

  async deleteItem(id: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: { id: { S: id } },
    });
    const res = await this.getItem(id);
    if (!res) throw new NotFoundException(`Item with id: ${id} not found`);
    await this.client.send(command);
    return res;
  }
}

export const groceryRepository = Object.freeze(new GroceryRepository());
