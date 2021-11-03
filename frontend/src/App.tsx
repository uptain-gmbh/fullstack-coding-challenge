import { CardProps } from "./components/card/types";
import { Form, Grid } from "./components";
import React, { useCallback, useEffect, useState } from "react";
import { addBook, getBooks } from "./api/client";
import { FormValues } from "./components/form/types";
import { FormikHelpers } from "formik";
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar, Typography } from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function App() {
    const [books, setBooks] = useState<CardProps[]>([]);

    const theme = createTheme({
        palette: {
            type: 'dark',
        }
    });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const {
          data: { items },
        } = await getBooks();
        setBooks(items);
      } catch (e) {
        console.error(e);
        toast.error(`Something went wrong while loading books.`);
      }
    };

    fetchBooks();
  }, []);

  const handleForm = useCallback(
    async (value: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      try {
        const {
          data: { items },
        } = await addBook(value);
        setBooks((state) => [...state, items]);
       toast.info(`Book ${value.title} created.`);
      } catch (e) {
        console.error(e);
        toast.error(`Something went wrong while saving you book.`);
      } finally {
        resetForm();
      }
    },
    []
  );

  const handleBookDelete = useCallback((deletedBookId: string) => {
    setBooks((state) => state.filter(({ bookId }) => deletedBookId !== bookId));
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <AppBar position="relative" style={{ backgroundColor: '#31b9b5' }}>
            <Toolbar>
                <AssignmentIndIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" component="div">
                    Books Interview App
                </Typography>
            </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row"
          }}
        >
          <Form handleSubmit={handleForm} />
          <Grid values={books} setListState={handleBookDelete} />
        </div>
      </ThemeProvider>
  );
}

export default App;
