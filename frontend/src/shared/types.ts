export interface Author {
  firstName: string;
  lastName: string;
}

export enum Format {
  TEXT_UTF8 = 'text/plain; charset=utf-8',
  PDF = 'application/pdf',
  EBOOK = 'application/epub+zip',
  ZIP = 'application/zip'
}

export enum MediaType {
  TEXT = 'Text',
  AUDIO = 'Audio'
}

export type FormatsData = { [key in Format]?: string };
