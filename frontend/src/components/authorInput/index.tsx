import {
  Box,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { FC, useCallback, useState } from "react";
import { Author } from "../../shared";
import { AuthorInputProps } from "./types";

const useStyles = makeStyles({
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export const AuthorInput: FC<AuthorInputProps> = ({
  onAdd,
  onDelete,
  value,
}) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAdd = useCallback(() => {
    onAdd({ firstName, lastName });
    setFirstName("");
    setLastName("");
  }, [onAdd, firstName, lastName]);

  const handleDelete = useCallback(
    (value: Author, index: number) => {
      onDelete(value, index);
    },
    [onDelete]
  );

  return (
    <Box
      sx={{
        margin: "10px 0",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography className={classes.label} color="textSecondary">
        Authors
      </Typography>
      {value.map(({ firstName, lastName }, index) => (
        <Box
          key={index}
          sx={{ display: "flex", flexDirection: "row", margin: "5px 0" }}
        >
          <TextField
            style={{ flexGrow: 1 }}
            label="Name"
            variant="outlined"
            value={firstName}
            disabled
          />
          <TextField
            style={{ flexGrow: 1 }}
            label="Surname"
            variant="outlined"
            value={lastName}
            disabled
          />
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            style={{ display: "flex" }}
            onClick={() => handleDelete({ firstName, lastName }, index)}
          >
            X
          </Button>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "stretch",
        }}
      >
        <TextField
          style={{ flexGrow: 1 }}
          label="Name"
          variant="outlined"
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
        <TextField
          style={{ flexGrow: 1 }}
          label="Surname"
          variant="outlined"
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ display: "flex" }}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};
