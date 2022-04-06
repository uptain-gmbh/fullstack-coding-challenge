import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";

const dynamoDB = new DynamoDB.DocumentClient();

interface requestParams {
    name: string;
    description: string;
};

const getErrorResponse = (errorMessage: string) => {
    return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({
            message: errorMessage,
        }),
    };
};

const getSuccessResponse = (data: any) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: data,
    };
};

export const createItem: APIGatewayProxyHandler = async (event, _context) => {

    const requestBody: requestParams = JSON.parse(event.body);
    const { name, description } = requestBody;

    try {
        const params = {
            TableName: process.env.DYNAMO_TABLE,
            Item: {
                id: uuid.v1(),
                name,
                description,
            },
        };
        await dynamoDB.put(params).promise();
        return getSuccessResponse(JSON.stringify(params.Item));
    } catch (err) {
        console.error(err);
        return getErrorResponse(err);
    }
};

export const getItems: APIGatewayProxyHandler = async (event, _context) => {
    const params = {
        TableName: process.env.DYNAMO_TABLE,
    };
    try {
        const data = await dynamoDB.scan(params).promise();
        return getSuccessResponse(JSON.stringify(data));
    } catch (err) {
        console.log(err);
        return getErrorResponse(err);
    }
};

export const deleteItem: APIGatewayProxyHandler = async (event, _context) => {
    const id: string = event.pathParameters.id;
    try {
        const params = {
            TableName: process.env.DYNAMO_TABLE,
            Key: {
                id
            }
        };
        await dynamoDB.delete(params).promise();
        return getSuccessResponse(JSON.stringify(id));
    } catch (err) {
        console.error(err);
        return getErrorResponse(err);
    }
};