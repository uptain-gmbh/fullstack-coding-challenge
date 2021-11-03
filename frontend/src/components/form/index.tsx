import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import { Formik } from "formik";
import ChipInput from "material-ui-chip-input";
import { FC } from "react";
import { MediaType } from "../../shared";
import { AuthorInput } from "../authorInput";
import { FormatInput } from "../formatInput";
import {
  handleChipInputValueChange,
  handleFormValueChange,
  handleSelectChange,
  initialFormValues,
} from "./helpers";
import { FormaProps } from "./types";
import * as Yup from 'yup';
import { FormHelperText, styled } from '@mui/material';

export const Form: FC<FormaProps> = ({ handleSubmit }) => {

  const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(8, 'Title is too short')
            .max(128, 'Title is too long')
            .required('Title should be filled'),
        authors: Yup.array()
            .ensure()
            .min(1, 'At least 1 author should be added')
            .of(Yup.object().shape({
              firstName: Yup.string()
                  .min(2, 'Author name is too short')
                  .max(64, 'Author name is too long')
                  .required('Author name is required'),
                lastName: Yup.string()
                    .min(2, 'Author surname is too short')
                    .max(64, 'Author surname is too long')
                    .required('Author surname is required'),
            })),
      languages: Yup.array()
          .ensure()
          .min(1, 'At least 1 language should be added'),
      bookshelves: Yup.array()
          .ensure()
          .min(1, 'At least 1 bookshelf should be added'),
      subjects: Yup.array()
          .ensure()
          .min(1, 'At least 1 subject should be added')
      });

    const FormHelperErrorText = styled(FormHelperText)({
      color: '#f50057'
    });

    return (
    <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ handleSubmit, values, setFieldValue, errors, touched }) => {
        const {
          title,
          authors,
          bookshelves,
          formats,
          languages,
          mediaType,
          subjects,
        } = values;

        const handleValueChange = handleFormValueChange(setFieldValue);

        const handleSelectValueChange = handleSelectChange(setFieldValue);

        const { addChip, deleteChip } = handleChipInputValueChange(
          setFieldValue,
          values
        );

        const handleButtonSubmit = () => {
          handleSubmit();
        };

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 20px",
              flex: '2.5 1 0%',
              overflowY: "visible",
              overflowX: "hidden"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <FormControl error={!!errors.title}>
                <TextField
                  style={{ margin: "10px 0" }}
                  label="Book title"
                  variant="outlined"
                  value={title}
                  onChange={handleValueChange("title")}
                />
                {errors.title && touched.title ? (
                  <FormHelperErrorText>{errors.title}</FormHelperErrorText>
                ) : null}
              </FormControl>
              <FormControl error={!!errors.authors}>
                <AuthorInput
                  value={authors}
                  onAdd={addChip("authors")}
                  onDelete={deleteChip("authors")}
                />
                {errors.authors && touched.authors ? (
                    <FormHelperErrorText>{
                        typeof errors.authors == 'string' ? errors.authors : 'Authors name and surname should be filled'
                    }</FormHelperErrorText>
                ) : null}
              </FormControl>
              <FormControl error={!!errors.languages}>
                  <ChipInput
                    style={{ margin: "10px 0" }}
                    label="Languages"
                    variant="outlined"
                    value={languages}
                    onAdd={addChip("languages")}
                    onDelete={deleteChip("languages")}
                  />
                      {errors.languages && touched.languages ? (
                          <FormHelperErrorText>{errors.languages}</FormHelperErrorText>
                      ) : null}
              </FormControl>
              <FormControl error={!!errors.bookshelves}>
                  <ChipInput
                    style={{ margin: "10px 0" }}
                    label="Bookshelves"
                    variant="outlined"
                    value={bookshelves}
                    onAdd={addChip("bookshelves")}
                    onDelete={deleteChip("bookshelves")}
                  />
                  {errors.bookshelves && touched.bookshelves ? (
                      <FormHelperErrorText>{errors.bookshelves}</FormHelperErrorText>
                  ) : null}
              </FormControl>
              <FormControl error={!!errors.subjects}>
                  <ChipInput
                    style={{ margin: "10px 0" }}
                    label="Subjects"
                    variant="outlined"
                    value={subjects}
                    onAdd={addChip("subjects")}
                    onDelete={deleteChip("subjects")}
                  />
                  {errors.subjects && touched.subjects ? (
                      <FormHelperErrorText>{errors.subjects}</FormHelperErrorText>
                  ) : null}
              </FormControl>
              <FormControl variant="outlined" style={{ margin: "10px 0" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Media Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  variant="outlined"
                  value={mediaType}
                  onChange={handleSelectValueChange("mediaType")}
                  label="Media Type"
                >
                  <MenuItem value={MediaType.TEXT}>Text</MenuItem>
                  <MenuItem value={MediaType.AUDIO}>Audio</MenuItem>
                </Select>
              </FormControl>
              <FormatInput
                value={formats}
                onChange={(value) => setFieldValue("formats", value)}
              />
                {errors.formats}
            </div>
            <Button
              variant="contained"
              type="submit"
              onClick={handleButtonSubmit}
            >
              Add
            </Button>
          </div>
        );
      }}
    </Formik>
  );
};
