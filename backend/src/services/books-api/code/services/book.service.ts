import { BookCreateModel, BookModel } from '../models/book.model';
import { validate } from 'class-validator';
import { ConflictError, NotFoundError, ValidationError } from '@uptain/core';
import * as dynamoose from "dynamoose";
import { Book, BookEntity } from '../entities/book.entity';
import { classToPlain, plainToClass } from 'class-transformer';
import Debug from 'debug';
const debug = Debug("lambda:service:book");

export class BookService {

    /**
     * This constructor has a lot of db-related logic, I suggest to move it to separate abstract class with 2nd service.
     */
    constructor() {

        const stage = process.env.stage;
        const offline = process.env.IS_OFFLINE;
        const region = process.env.AWS_REGION;
        const traceDynamoDb = process.env.TRACE_DYNAMODB;

        debug('Book service has next env: stage = %s, region = %s, offline = %s, tracing: %s', stage, region, offline, traceDynamoDb);
        debug('Book table is set to %s', process.env.BOOKS_TABLE);

        // we are just adjusting the region of DynamoDb connection
        // the access is provided by IAM
        const ddb = new dynamoose.aws.sdk.DynamoDB({
            "region": region
        });
        dynamoose.aws.ddb.set(ddb);

        // we may need a tracing enabled to debug the queries
        if (traceDynamoDb) {
            dynamoose.logger.providers.add(console);
        }

        if (offline) {
            debug('Redirected to local DynamoDb');
            dynamoose.aws.ddb.local();
        }
    }

    async create(input: BookCreateModel): Promise<BookModel> {

        debug('Book create start');

        // verify that the input exist
        if (!input) {
            debug('Input model is not provided, exiting');
            throw new ValidationError();
        }

        // validate the input with class-validator
        const errors = await validate(input);
        if (errors.length > 0) {
            debug('Book creation has found validation errors: %O', errors);
            throw ValidationError.fromClassValidatorError(errors);
        }

        const book = new BookEntity(
            classToPlain(input)
        );

        const result = await book.save() as Book;

        debug('Book create end, result: %O', result);

        return result;
    }

    async delete(id: string): Promise<void> {

        debug('Book delete start');

        if (!id) {
            debug('Book id not provided, exiting');
            throw new ValidationError();
        }

        const lookup = await BookEntity.query("bookId").eq(id).exec();

        debug('Found next books for deletion: %O', lookup);

        if (lookup.length <= 0) {
            debug('Book with id %s not found', id);
            throw new NotFoundError(`Book with id ${id} not found.`);
        }

        if (lookup.length > 1) {
            debug('Found multiple books with same PK, impossible is possible now. Exiting to space.', id);
            throw new ConflictError(`Multiple records with same key found. Unrecoverable state of system.`)
        }

        const book = lookup[0];
        await book.delete();

        debug('Book delete end');
    }

    async list(): Promise<BookModel[]> {

        debug('Book lookup start');

        const books = await BookEntity.scan().exec();
        const results = books.map(b => plainToClass(BookModel, b.toJSON()));

        debug('Book lookup end, results: %O', results);

        return results;
    }

}
