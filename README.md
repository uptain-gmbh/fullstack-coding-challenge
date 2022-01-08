## Uptain Fullstack Coding Challenge

The goal is to set up a full serverless application stack, where users will be able to add items to a list and view this list.

### Brief

I am a user of the app, and I want to create a note object and view
previously provided notes. The form is able to:

1.  View all the notes stored in the backend
2.  Add a new note

### Technologies selection

- NodeJS
- Typescript
- ReactJS
- AWS DynamoDB
- Serverless

### Solution structure

The solution consists of three applications:
- backend - the web API server, written on NodeJS and deployed using the serverless framework, and uses DynamoDB as storage;
- infrastructure - the app that defines all required infrastructural resources using SST framework (DynamoDB);
- frontend - the web client application, written with ReactJS.

### Set up order

Please, follow the provided order to avoid project start-up issues.

1) Deploy the Infrastructure using the [README](infrastructure/README.md)
2) Deploy Backend using the [README](backend/README.md)
3) Start Frontend application locally using the [README](frontend/README.md)
