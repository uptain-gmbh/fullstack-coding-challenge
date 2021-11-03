/**
 * Format of book file which are registered in database.
 */
export enum Format {

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
