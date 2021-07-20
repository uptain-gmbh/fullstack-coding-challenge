// handler.js

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const cors = require('cors');

const ITEMS_TABLE = process.env.ITEMS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(express.json());
app.use(cors());

// just the homepage
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// endpoint for getting an item by id (currently not used in the frontend)
app.get('/items/:itemId', function (req, res) {
  const params = {
    TableName: ITEMS_TABLE,
    Key: {
      itemId: req.params.itemId,
    },
  }
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get item' });
    }
    if (result.Item) {
      const { itemId, name } = result.Item;
      res.json({ itemId, name });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });
})

// endpoint for adding an item to the db
app.post('/items', function (req, res) {
  const { itemId, name } = req.body;
  if (typeof itemId !== 'string') {
    res.status(400).json({ error: '"itemId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: ITEMS_TABLE,
    Item: {
      itemId: itemId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create item' });
    }
    res.json({ itemId, name });
  });
})

// endpoint for getting all items from the DB
app.get('/allitems', function (req, res) {
  const params = {
    TableName: ITEMS_TABLE,
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get items' });
    } else {
      res.json(result);
    }
    
    // if (result.Items) {
    //   // const {itemId, name} = result.Item;
    //   res.json({ result });
    // } else {
    //   // res.status(404).json({ error: "Item not found" });
    //   res.json(result);
    // }
  });
})

// endpoint for deleting an item
app.get('/deleteitem/:itemId', function (req, res) {
  const params = {
    TableName: ITEMS_TABLE,
    Key: {
      itemId: req.params.itemId,
    },
  }

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get item' });
    }
    // if (result.Item) {
    //   // const { itemId, name } = result.Item;
    //   // res.json({ itemId, name });
    // } else {
      res.json(result);
    // }
  });
})

// create a uuid - could be used for creating real uniqe identifiers (currently the user can choose the id in the frontend)
function getUuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

module.exports.handler = serverless(app);