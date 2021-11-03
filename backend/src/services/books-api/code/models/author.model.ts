/**
 * The author of the book.
 * Separate model is used only for better development experience, it's a flat structure in database.
 */
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class Author {

    /**
     * Author's first name
     */
    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    firstName: string;

    /**
     * Author's last name
     */
    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    lastName: string;
}
