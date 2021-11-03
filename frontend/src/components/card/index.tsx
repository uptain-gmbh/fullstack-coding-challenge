import DeleteIcon from '@mui/icons-material/Delete';
import LoadingOverlay from 'react-loading-overlay';
import { FC, useCallback, useState } from "react";
import { CardProps } from "./types";
import {
  Card as MaterialCard,
  CardContent, IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Format } from "../../shared";
import { deleteBook } from "../../api/client";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    flexBasis: 250,
    margin: "5px 10px",
    position: "relative"
  },
  title: {
    fontSize: 21,
    fontFamily: 'Helvetica,Arial,sans-serif',
    fontWeight: 600,
    color: '#31b9b5',
    marginBottom: 10
  },
  description: {
    fontSize: 12,
  },
  author: {
    fontSize: 16,
  },
  info: {
    fontSize: 14,
  },
});

export const Card: FC<CardProps> = ({
  bookId,
  title,
  authors,
  languages,
  bookshelves,
  subjects,
  formats,
  mediaType,
  setListState,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const renderAuthors = () =>
    authors.map(({ firstName, lastName }, index) => (
      <Typography key={index} className={classes.author} color="textPrimary">
        {`${firstName} ${lastName}`}
      </Typography>
    ));

  const renderFormats = () =>
    Object.entries(formats).map(([key, value], index) => {
      const name =
        Object.keys(Format)[Object.values(Format).indexOf(key as Format)];

      return (
        <Typography key={index} className={classes.info} color="textPrimary">
          {`${name}: ${value}`}
        </Typography>
      );
    });

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await deleteBook(bookId);
      setListState(bookId);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [bookId, setListState]);

  return (
      <LoadingOverlay
          active={loading}
          spinner
          text='Deleting book...'
      >
        <MaterialCard className={classes.root}>
          <IconButton
            type="submit"
            color="secondary"
            size="small"
            style={{ position: "absolute", top: 15, right: 10 }}
            onClick={handleDelete}
          >
              <DeleteIcon />
          </IconButton>
          <CardContent>
            <Typography className={classes.title} color="primary">
              {title}
            </Typography>
            <Typography className={classes.description} color="textSecondary">
              Authors
            </Typography>
            {renderAuthors()}
            <Typography className={classes.description} color="textSecondary">
              Languages
            </Typography>
            <Typography className={classes.info} color="textPrimary">
              {languages.length > 1 ? languages.join(", ") : languages[0]}
            </Typography>
            <Typography className={classes.description} color="textSecondary">
              Bookshelves
            </Typography>
            <Typography className={classes.info} color="textPrimary">
              {bookshelves.length > 1 ? bookshelves.join(", ") : bookshelves[0]}
            </Typography>
            <Typography className={classes.description} color="textSecondary">
              Subjects
            </Typography>
            <Typography className={classes.info} color="textPrimary">
              {subjects.length > 1 ? subjects.join(", ") : subjects[0]}
            </Typography>
            <Typography className={classes.description} color="textSecondary">
              Formats
            </Typography>
            {renderFormats()}
            <Typography className={classes.description} color="textSecondary">
              Media type
            </Typography>
            <Typography className={classes.info} color="textPrimary">
              {mediaType}
            </Typography>
          </CardContent>
        </MaterialCard>
      </LoadingOverlay>
  );
};
