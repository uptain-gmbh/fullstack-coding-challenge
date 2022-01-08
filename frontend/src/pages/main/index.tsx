import { Alert, Grid, SnackbarCloseReason } from '@mui/material';
import React, { SyntheticEvent, useEffect } from 'react';
import { Form } from '../../components/form';
import { List } from '../../components/list';
import { apiService } from '../../api/api.service';
import Snackbar from '@mui/material/Snackbar';

export const MainPage = () => {
  const [notes, setNotes] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>('');

  const onFormSubmit = async (formContent: string): Promise<void> => {
    const res = await apiService.createNote({
      content: formContent,
    });

    if (!res.success) {
      setError('Server error.');

      return;
    }

    await refreshNotes();
  };

  const refreshNotes = async () => {
    const res = await apiService.getNotesList();

    if (!res.success) {
      setError('Server error.');

      return;
    }

    const content = res.data?.map((note) => note.content) || [];

    setNotes(content);
  };

  const handleClose = (event?: Event | SyntheticEvent<unknown, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError('');
  };

  useEffect(() => {
    refreshNotes();
  }, []);

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
          {error}
        </Alert>
      </Snackbar>
      <Grid
        container
        sx={{
          padding: '20px',
          height: '100vh',
          alignItems: 'stretch',
          justifyContent: 'space-around',
          maxWidth: '1024px',
          margin: '0 auto',
        }}
      >
        <Grid item xs={4} sm={3} sx={{ maxHeight: '20%' }}>
          <Form onSubmit={onFormSubmit} />
        </Grid>
        <Grid item xs={8} sm={7}>
          <List items={notes} />
        </Grid>
      </Grid>
    </>
  );
};
