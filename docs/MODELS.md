# Models
The input we manage is a single object with a flat structure,
so I've applied a little imagination here.

## The "item"
I decided to use a Book with authors and bookshelves (I took this from another task).
The one massive point regarding the model - it will be flat and straightforward, 
as there is no time to build fantastic relationships with disco balls.

## The Book Model
```typescript
/**
 * The Media Type of the book of it's file.
 */
enum MediaType {
    
    /**
     * Textual, pdf or etc.
     */
    TEXT = 'Text',

    /**
     * Audio, can be zipped also.
     */
    AUDIO = 'Audio'
}

/**
 * Format of book file which are registered in datbase.
 * I've reduced the number for simplicity.
 */
enum Format {
    
    /**
     * Default text for old-school guys.
     */
    TEXT_UTF8 = 'text/plain; charset=utf-8',

    /**
     * PDF, what we all needed.
     */
    PDF = 'application/pdf',

    /**
     * Ebook for your kindle.
     */
    EBOOK = 'application/epub+zip',

    /**
     * I guess there is an audio in zip, but who knows.
     */
    ZIP = 'application/zip'
}

/**
 * The author of the book.
 * Separate model is used only for better development experiance, it's a flat structure in database.
 */
type Author = {

    /**
     * Author's first name
     */
    first_name: string;

    /**
     * Author's last name
     */
    last_name: string;
}

type Book = {

    /**
     * The unique id of the book
     */
    @identity()
    bookId: number;

    /**
     * All subjects the book has
     */
    subjects: string[];

    /**
     * All authors of the book
     */
    authors: Author[];

    /**
     * The available languages of book
     */
    languages: string[];

    /**
     * Bookshelves? Guess it's just a category.
     */
    bookshelves: string[];

    /**
     * Available Formats of the book
     */
    formats: { [key in Format]: string };

    /**
     * Book media type
     */
    @enum(MediaType)
    media_type: MediaType;
    
    /** Number of total download of the book **/
    @number({ positive: true, default: 0 })
    download_count: number;
    
    /** The book title **/
    @length(2, 64)
    title: string;
    
    /** Flag that indicates that a book is published for everyone 
     * I don't think I need it here. 
     * However, if it would be the N-steps wizard, I will use the published state flag. 
     * It'll not be available for the public until this flag is set (or even with enum state so that 
     * async job can process it)
     * 
     * published: boolean;
     **/
}
```
