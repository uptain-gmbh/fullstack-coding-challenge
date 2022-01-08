import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ValidationError } from 'yup';
import React from 'react';
import { FormProps } from './interfaces';
import { contentSchema } from './validationSchemas';

export const Form = (props: FormProps) => {
  const { onSubmit } = props;

  const [content, setContent] = React.useState('');
  const [validationError, setError] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setContent(event.target.value);
  };

  const onClick = () => {
    try {
      contentSchema.validateSync(content);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.message);

        return;
      }
    }

    onSubmit(content);

    setContent('');
  };

  const showButton = !!content.trim().length;

  return (
    <Box sx={{ padding: '20px', color: 'white', flexDirection: 'column', alignItems: 'flex-end', display: 'flex' }}>
      <TextField
        id="standard-multiline-flexible"
        label="Take a note..."
        multiline
        maxRows={4}
        value={content}
        onChange={handleChange}
        variant="standard"
        error={!!validationError}
        helperText={validationError}
        sx={{
          width: '100%',
          marginBottom: '10px',
        }}
      />
      {showButton && (
        <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
          Save
        </Button>
      )}
    </Box>
  );
};
