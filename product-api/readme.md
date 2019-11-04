# Products API

## Description

This serverless application provides a restful API.  
Each data item in the corresponding DynamoDB table contains  
a **random generated uuid** and a **product name**.

I have already deployed the application on my private AWS account  
so you can access the API directly with curl.

## API Usage [curl](https://github.com/curl/curl)

#### Get all products

```
curl -L https://cl9mptrtz2.execute-api.eu-central-1.amazonaws.com/dev/products
```
#### Create and post a new product to the database

Simply pass the `productName` property and its value.

```
curl -H "Content-Type: application/json" -d "{\"productName\":\"rainbow pullover\"}" -X POST https://cl9mptrtz2.execute-api.eu-central-1.amazonaws.com/dev/products
```
