import {
    DynamoDBDocumentClient,
    PutCommand,
} from "@aws-sdk/lib-dynamodb"
import express, {Express, NextFunction, Request, Response} from 'express';
import {
    CreateTableCommand, CreateTableCommandInput,
    DescribeTableCommand,
    DynamoDBClient,
    DynamoDBClientConfig,
    ResourceNotFoundException,
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import serverlessHttp from 'serverless-http';
import ServerlessHttp from "serverless-http";
import cors from "cors";
import {UserCreate} from "./types";
import {DescribeTableCommandInput} from "@aws-sdk/client-dynamodb/dist-types/commands/DescribeTableCommand";

const USERS_TABLE = process.env.USERS_TABLE;
const REGION = process.env.REGION;
const IS_OFFLINE = process.env.IS_OFFLINE;

const ddbConfiguration: DynamoDBClientConfig = {
    region: REGION,
    endpoint: `https://dynamodb.${REGION}.amazonaws.com`
}

if (IS_OFFLINE) {
    ddbConfiguration.endpoint = 'http://localhost:8000'
}

const app: Express = express();
const client: DynamoDBClient = new DynamoDBClient(ddbConfiguration);
const dynamoDbClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client);

app.use(cors())

app.use(express.json());

app.get("/users", async (req: Request<{}, {}, {}>, res: Response) => {
    const params = {
        TableName: USERS_TABLE,
    }

    try {
        await createTableIfNotExists()

        const {Items} = await dynamoDbClient.send(new ScanCommand(params));

        if (Items) {
            res.json(Items.map(item => ({userId: item.userId.S, name: item.name.S})));
        } else {
            res
                .status(404)
                .json({error: 'Could not find user with provided "userId"'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Could not retrieve user"});
    }


});

app.post("/users", async (req: Request<{}, {}, UserCreate>, res: Response) => {
    const {userId, name} = req.body;

    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
        },
    };

    try {
        await createTableIfNotExists()
        await dynamoDbClient.send(new PutCommand(params));
        res.json({userId, name});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Could not create user"});
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

const createTableIfNotExists = async () => {
    if (!IS_OFFLINE) {
        // if we are deploying to AWS there will be a table created by serverless. only when running locally offline there might be no table
        return
    }

    const params: DescribeTableCommandInput = {
        TableName: USERS_TABLE,
    }

    try {
        await dynamoDbClient.send(new DescribeTableCommand(params))
    } catch (error) {
        if (error instanceof ResourceNotFoundException) {
            const createTableParams: CreateTableCommandInput = {
                TableName: USERS_TABLE,
                BillingMode: "PAY_PER_REQUEST",
                AttributeDefinitions: [
                    {
                        AttributeName: "userId",
                        AttributeType: "S",
                    }
                ],
                KeySchema: [
                    {
                        KeyType: "HASH",
                        AttributeName: "userId"
                    }
                ]
            }
            await dynamoDbClient.send(new CreateTableCommand(createTableParams))
            return
        }

        throw error
    }
}

export const handler: ServerlessHttp.Handler = serverlessHttp(app);
