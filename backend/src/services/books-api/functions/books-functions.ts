import 'reflect-metadata';

import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { BookService } from '../code/services/book.service';
import { BookCreateModel } from '../code/models/book.model';
import { plainToClass } from 'class-transformer';
import { tryExecute } from '../../../shared';
import Debug from "debug";

const debug = Debug("lambda:function");

export async function list(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {

    debug('List function start, event: %j, context: %j', event, context);

    return await tryExecute(async () => {

        const service = new BookService();
        const books = await service.list();

        debug('List function end, books: %O',books);

        return {
            statusCode: 200,
            body: JSON.stringify({
                items: books
            }),
        };
    });
}

export async function deleteBook(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {

    debug('Delete function start, event: %j, context: %j', event, context);

    return await tryExecute(async () => {

        const id = event.pathParameters?.id;

        debug('Extracted id: %s', id);

        const service = new BookService();
        await service.delete(id);

        debug('Delete function end');

        return {
            statusCode: 200,
            body: null
        };
    });
}

export async function create(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {

     debug('Create function start, event: %j, context: %j', event, context);

     return await tryExecute(async () => {
         // transform JSON input to class
         const input = JSON.parse(event.body);
         const bookCreateModel: BookCreateModel = plainToClass(BookCreateModel, input);

         debug('Input model parsed: %O', bookCreateModel);

         const service = new BookService();
         const book = await service.create(bookCreateModel);

         debug('Create function end, book: %O',book);

         return {
             statusCode: 200,
             body: JSON.stringify({
                 items: book
             }),
         };
     });
}
