import axios from 'axios';
import config from '../config/api.json';
import { BookParams } from './types';
import { toast } from "react-toastify";

axios.interceptors.response.use(undefined, err => {
  const hasError = err.response && err.response.status >= 400;
  if (hasError)
    toast.error("Server error. Please try again later. ");
  return Promise.reject(err);
});

export const getBooks = async () => {
  return axios.get(config.API_URL ?? '');
}

export const addBook = async (data: BookParams) => {
  return axios.post(config.API_URL ?? '', data);
}

export const deleteBook = async (id: string) => {
  return axios.delete(`${config.API_URL}/${id}` ?? '');
}
