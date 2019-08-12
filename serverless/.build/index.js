"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverless = require("serverless-http");
var bodyParser = require("body-parser");
var express = require("express");
var aws_sdk_1 = require("aws-sdk");
var uuid = require("uuid");
var app = express();
// config({ path: './.env' });
var ITEMS_TABLE = process.env.ITEMS_TABLE || "items-dev";
var IS_OFFLINE = process.env.IS_OFFLINE || true;
var dynamoDb = IS_OFFLINE === 'true' ?
    new aws_sdk_1.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    }) :
    new aws_sdk_1.DynamoDB.DocumentClient();
app.use(bodyParser.json({ strict: false }));
// Get request for items
app.get('/items', function (req, res) {
    var params = {
        TableName: ITEMS_TABLE
    };
    dynamoDb.scan(params, function (error, result) {
        if (error) {
            return res.status(400).json({ error: 'Error retrieving Items' });
        }
        var items = result.Items;
        res.json({ items: items });
    });
});
app.post('/items', function (req, res) {
    var _a = req.body, title = _a.title, _b = _a.done, done = _b === void 0 ? false : _b;
    console.log(title, done);
    var itemId = uuid.v4();
    var params = {
        TableName: ITEMS_TABLE,
        Item: {
            itemId: itemId,
            title: title,
            done: done,
        },
    };
    dynamoDb.put(params, function (error) {
        if (error) {
            console.log('Error creating item: ', error);
            return res.status(400).json({ error: 'Could not create item' });
        }
        res.json({ itemId: itemId, title: title, done: done });
    });
});
app.get('/items/:itemId', function (req, res) {
    var itemId = req.params.itemId;
    var params = {
        TableName: ITEMS_TABLE,
        Key: {
            itemId: itemId,
        },
    };
    dynamoDb.get(params, function (error, result) {
        if (error) {
            res.status(400).json({ error: 'Error retrieving Item' });
        }
        if (result.Item) {
            var _a = result.Item, itemId_1 = _a.itemId, title = _a.title, done = _a.done;
            res.json({ itemId: itemId_1, title: title, done: done });
        }
        else {
            res.status(404).json({ error: "Item with id: " + itemId + " not found" });
        }
    });
});
app.put('/items', function (req, res) {
    var _a = req.body, itemId = _a.itemId, title = _a.title, done = _a.done;
    var params = {
        TableName: ITEMS_TABLE,
        Key: { itemId: itemId },
        UpdateExpression: 'set #a = :title, #b = :done',
        ExpressionAttributeNames: { '#a': 'title', '#b': 'done' },
        ExpressionAttributeValues: { ':title': title, ':done': done },
    };
    dynamoDb.update(params, function (error) {
        if (error) {
            console.log("Error updating Item with id " + itemId + ": ", error);
            res.status(400).json({ error: 'Could not update Item' });
        }
        res.json({ itemId: itemId, title: title, done: done });
    });
});
app.delete('/items/:itemId', function (req, res) {
    var itemId = req.params.itemId;
    var params = {
        TableName: ITEMS_TABLE,
        Key: {
            itemId: itemId,
        },
    };
    dynamoDb.delete(params, function (error) {
        if (error) {
            console.log("Error updating Item with id " + itemId, error);
            res.status(400).json({ error: 'Could not delete Item' });
        }
        res.json({ success: true });
    });
});
module.exports.handler = serverless(app);
//# sourceMappingURL=index.js.map