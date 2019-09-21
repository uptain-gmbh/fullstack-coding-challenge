import httpService from "./httpService";
import config from "../config/config.json";

export async function getBooks() {
  const { data } = await httpService.get(`${config.API_ENDPOINT}books/`);
  return data.books;
}

export async function saveBook(book) {
  let newBook = {};
  newBook.title = book.title;
  newBook.isbn = book.isbn;
  await httpService.post(`${config.API_ENDPOINT}books/`, newBook);
}
