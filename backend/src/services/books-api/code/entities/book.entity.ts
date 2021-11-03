import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { Format } from '../enums/format.enum';
import { MediaType } from '../enums/media-type.enum';
import { v4 as uuid } from 'uuid';

export class Book extends Document {
    bookId: string;
    title: string;
    subjects: string[];
    authors: { firstName: string, lastName: string }[];
    languages: string[];
    bookshelves: string[];
    formats: { [key in Format]?: string };
    mediaType: MediaType;
    downloadCount: number;
    createdAt: number;
}

export const BookSchema = new dynamoose.Schema({
    bookId: {
        type: String,
        default: () => uuid(),
        hashKey: true
    },
    title: String,
    subjects: {
        type: Array,
        schema: [String]
    },
    authors: {
        type: Array,
        schema: [{
            type: Object,
            schema: {
                firstName: String,
                lastName: String
            }
        }]
    },
    languages: {
        type: Array,
        schema: [String]
    },
    bookshelves: {
        type: Array,
        schema: [String]
    },
    formats: {
        type: Object
    },
    mediaType: {
        type: String,
        enum: Object.values(MediaType)
    },
    downloadCount: Number,
    createdAt: {
        type: Number,
        rangeKey: true,
        default: () => Date.now()
    }
}, {
    saveUnknown: [ "formats.*" ]
});

const tableName = process.env.IS_OFFLINE ? "Books" : process.env.BOOKS_TABLE;

export const BookEntity = dynamoose.model<Book>(tableName, BookSchema, {
    // create new tables locally, but not in cloud
    create: process.env.IS_OFFLINE ? undefined : false,
    waitForActive: process.env.IS_OFFLINE ? undefined : false
});

