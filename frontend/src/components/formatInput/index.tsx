import { Box, TextField, Typography, makeStyles } from "@material-ui/core";
import { FC, useCallback } from "react";
import { Format } from "../../shared";
import { FormatFieldHandler, FormatInputProps } from "./types";

const useStyles = makeStyles({
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export const FormatInput: FC<FormatInputProps> = ({ onChange, value }) => {
  const classes = useStyles();

  const handleChange: FormatFieldHandler = useCallback(
    (field: Format) =>
      ({ target: { value: inputValue } }) => {
        onChange({
          ...value,
          [field]: inputValue,
        });
      },
    [onChange, value]
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
        Formats
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TextField
          style={{ margin: "5px 0" }}
          label="Pdf"
          variant="outlined"
          value={value[Format.PDF]}
          onChange={handleChange(Format.PDF)}
        />
        <TextField
          style={{ margin: "5px 0" }}
          label="EBook"
          variant="outlined"
          value={value[Format.EBOOK]}
          onChange={handleChange(Format.EBOOK)}
        />
        <TextField
          style={{ margin: "5px 0" }}
          label="Zip"
          variant="outlined"
          value={value[Format.ZIP]}
          onChange={handleChange(Format.ZIP)}
        />
        <TextField
          style={{ margin: "5px 0" }}
          label="Text file"
          variant="outlined"
          value={value[Format.TEXT_UTF8]}
          onChange={handleChange(Format.TEXT_UTF8)}
        />
      </Box>
    </Box>
  );
};
