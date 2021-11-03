import { Author } from './author.model';
import { Format } from '../enums/format.enum';
import { MediaType } from '../enums/media-type.enum';
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNotEmptyObject,
    IsOptional,
    IsString,
    Length,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidationCode } from '@uptain/core';

export class BookCreateModel {

    /**
     * All subjects the book has
     */
    @IsArray({ message: ValidationCode.ARRAY_VALUE_SHOULD_BE_AN_ARRAY })
    @ArrayMinSize(1, { message: ValidationCode.ARRAY_AT_LEAST_ONE_ELEMENT_MUST_BE_PROVIDED })
    subjects: string[];
    //
    // /**
    //  * All authors of the book
    //  */
    @IsArray({ message: ValidationCode.ARRAY_VALUE_SHOULD_BE_AN_ARRAY })
    @ArrayMinSize(1, { message: ValidationCode.ARRAY_AT_LEAST_ONE_ELEMENT_MUST_BE_PROVIDED })
    @ValidateNested()
    @Type(() => Author)
    authors: Author[];

    /**
     * The available languages of book
     */
    @IsArray({ message: ValidationCode.ARRAY_VALUE_SHOULD_BE_AN_ARRAY })
    @ArrayMinSize(1, { message: ValidationCode.ARRAY_AT_LEAST_ONE_ELEMENT_MUST_BE_PROVIDED })
    languages: string[];

    /**
     * Bookshelves? Guess it's just a category.
     */
    @ArrayNotEmpty({ message: ValidationCode.ARRAY_VALUE_SHOULD_BE_AN_ARRAY })
    @ArrayMinSize(1, { message: ValidationCode.ARRAY_AT_LEAST_ONE_ELEMENT_MUST_BE_PROVIDED })
    bookshelves: string[];

    /**
     * Available Formats of the book
     */
    @IsNotEmpty({ message: ValidationCode.VALUE_SHOULD_NOT_BE_EMPTY })
    @IsNotEmptyObject(null, { message: ValidationCode.VALUE_SHOULD_NOT_BE_EMPTY })
    formats: { [key in Format]?: string };

    /**
     * Book media type
     */
    @IsNotEmpty({ message: ValidationCode.VALUE_SHOULD_NOT_BE_EMPTY })
    @IsEnum(MediaType, { message: ValidationCode.VALUE_INVALID_ENUM_OPTION })
    mediaType: MediaType;

    /**
     * The book title
     */
    @IsNotEmpty({ message: ValidationCode.VALUE_SHOULD_NOT_BE_EMPTY })
    @IsString({ message: ValidationCode.VALUE_INVALID_FORMAT })
    @Length(8, 128, { message: ValidationCode.VALUE_INVALID_LENGTH })
    title: string;
}

export class BookUpdateModel {

    /**
     * The unique id of the book
     */
    bookId: number;

    /**
     * All subjects the book has
     */
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    subjects?: string[];

    /**
     * All authors of the book
     */
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    authors?: Author[];

    /**
     * The available languages of book
     */
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    languages?: string[];

    /**
     * Bookshelves? Guess it's just a category.
     */
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    bookshelves?: string[];

    /**
     * Available Formats of the book
     */
    @IsOptional()
    @IsNotEmpty()
    @IsString({ each: true })
    formats?: Map<Format, string>;

    /**
     * Book media type
     */
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(MediaType)
    mediaType?: MediaType;

    /**
     * The book title
     */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    title?: string;
}

export class BookModel extends BookCreateModel {

    /**
     * The unique id of the book
     */
    bookId: string;

    /** Number of total download of the book **/
    downloadCount: number;
}
