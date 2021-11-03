# API
In this section I will prepare the API structure that should be implemented in solution.

## REST API Recap
Just a short recap of what I'm considering as REST API:

### Methods
- POST: the creation of an entity that doesn't exist
- GET: receiving a list or single existing entity
- DELETE: deletion of a single record

### Response codes
- 400: Bad request means that a data is incorrectly formatted or has validation errors (length, type of content)
- 401: User doesn't have access to the specific method or function (not used in this task)
- 403: User doesn't have permission to access a specific method or record (not used in this task)
- 404: Record not found in the database (or has a soft delete flag set)
- 409: Record has invalid state (is an async process operation), or transition can't be done due to workflow validation.
  I consider this also for the duplicated record, and code 400 can also be used for such options.
- 500: Surprise, surprise, you broke it.

## API Schema

- /book
    - POST /
      - Create a new Book record
      - Input: `Book`
      - Response: `Book` with id
      - Codes: 
        - 200 (Ok)
        - 400 (Validation)
        - 409 (Book with same title already exist)
    - DELETE /:id
      - Deletes an existing book
      - Input: none
      - Response: none
      - Codes:
        - 200 (Ok)
        - 404 (NotFound)
    - GET /
      - Receives all books
      - Input: none
      - Response: `Book[]`
      - Codes:
        - 200 (Ok)
      
