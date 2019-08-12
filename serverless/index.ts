import * as serverless from 'serverless-http';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
import { config } from 'dotenv';

const app = express();
// config({ path: './.env' });

const ITEMS_TABLE = process.env.ITEMS_TABLE || "items-dev";
const IS_OFFLINE = process.env.IS_OFFLINE || true;

const dynamoDb = IS_OFFLINE === 'true' ?
    new DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    }) :
    new DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

// Get request for items
app.get('/items', (req, res) => {
    const params = {
        TableName: ITEMS_TABLE
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error retrieving Items' });
        }

        const { Items: items } = result;
        res.json({ items });
    });

});

app.post('/items', (req, res) => {
    const { title, done = false} = req.body;

    console.log(title, done)
    const itemId = uuid.v4();

    const params = {
        TableName: ITEMS_TABLE,
        Item: {
          itemId,
          title,
          done,
        },
      };

      dynamoDb.put(params, (error) => {
        if (error) {
          console.log('Error creating item: ', error);
          return res.status(400).json({ error: 'Could not create item' });
        }
    
        res.json({ itemId, title, done });
      });

});

app.get('/items/:itemId', (req, res) => {
    const {itemId} = req.params;
    const params = {
        TableName: ITEMS_TABLE,
        Key: {
          itemId,
        },
      };
    
      dynamoDb.get(params, (error, result) => {
        if (error) {
          res.status(400).json({ error: 'Error retrieving Item' });
        }
    
        if (result.Item) {
          const { itemId , title, done } = result.Item;
          res.json({ itemId, title, done });
        } else {
          res.status(404).json({ error: `Item with id: ${itemId} not found` });
        }
      });
});

app.put('/items', (req, res) => {
    const { itemId, title, done } = req.body;
  
    var params = {
      TableName : ITEMS_TABLE,
      Key: { itemId },
      UpdateExpression : 'set #a = :title, #b = :done',
      ExpressionAttributeNames: { '#a' : 'title', '#b': 'done' },
      ExpressionAttributeValues : { ':title' : title, ':done': done },
    };
  
    dynamoDb.update(params, (error) => {
      if (error) {
        console.log(`Error updating Item with id ${itemId}: `, error);
        res.status(400).json({ error: 'Could not update Item' });
      }
  
      res.json({ itemId, title, done });
    })
  });
  
  app.delete('/items/:itemId', (req, res) => {
    const { itemId } = req.params;
  
    const params = {
      TableName: ITEMS_TABLE,
      Key: {
        itemId,
      },
    };
  
    dynamoDb.delete(params, (error) => {
      if (error) {
        console.log(`Error updating Item with id ${itemId}`, error);
        res.status(400).json({ error: 'Could not delete Item' });
      }
  
      res.json({ success: true });
    });
  });

module.exports.handler = serverless(app);
