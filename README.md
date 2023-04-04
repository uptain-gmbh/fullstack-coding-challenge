# uptain Fullstack Coding Challenge

Seems like you're trying out for a position at
[Uptain](https://uptain.de) or you've found this and would like to
apply.  Fork this repo and go at it ;)

Your goal is to set up a full serverless application stack, where users will be able to add items to a list and view this list. Once you are done with the challenge, please fire up a
Pull Request and we will get in touch.

## Brief

I am a user of the app and I want to create an item object and view
previously provided items. The form should can be simple but should enable me to:

1.  View all the items stored in backend
2.  Add a new item


## Technologie selection

It is up to you to select your stack. We provide two options below. Feel free to select that one that enables you to complete the challenge in time.

## Requirements

*   You can use whatever libraries, task runners, databases and build processes you
    like. The tools named in the options are the only requirements. You can write in JavaScript, but TypeScript is encouraged (no CoffeeScript, etc). 



*   Setup a [serverless](https://serverless.com/) application. A minimum a backend and a frontend is required. 
    For the frontend part you should use [React](https://reactjs.org/) and for the you can select from services of the [AWS Cloud](https://aws.amazon.com) for storing items and handling requests. The frontend file can be hosted locally, so you dont need to upload to anywhere.
    

### Suggested order of completion

This depends on how much time you were given to accomplish the task.
Ideally you would provide a solution for each of the outlined steps
unless they are marked as optional.

1.  Building the Backend.
2.  Form for listing and adding items
3.  (optional) if using a database, orchestrate services with Docker or some differnt technologie.


### How to run
Used node version: `v18.13.0`

1. Install `serverless`, `docker` and `docker-compose`
2. Run `npm install` in both directories `frontend` and `backend`

#### Run locally 
3. Run `docker-compose up` in `backend` directory to spin up DynamoDB and a DynamoDB Admin Interface (http://localhost:8001/)
4. Run `serverless offline` in `backend` directory. Take the endpoint after the offline deployment and supply that one in the `.env` file of the `frontend` directory. It will be most likely http://localhost:3000/
5. Run `npm start` in `frontend` directory

#### Run on AWS
3. Setup AWS Credentials if you want to deploy the backend to AWS 
4. Run `serverless deploy` in the `backend` directory. Take the endpoint after the deployment and supply that one in the `.env` file of the `frontend` directory.
5. Run `npm start` in `frontend` directory

#### Endpoints
List Users:

```
curl --location 'http://localhost:3000/users'
```

Create User:
```
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "1",
    "name": "test"
}'
```
