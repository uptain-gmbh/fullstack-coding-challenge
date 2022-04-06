import React, { useState } from 'react';
import {
    Box, CssBaseline, AppBar, Toolbar,
    Typography, Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddNewItem from './AddNewItem';
import ViewItems from './ViewItems';

const theme = createTheme();

function App() {
    const [currentWindow, setWindow] = useState(0);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Items
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', marginRight: 20 } }}>
                        <Button color="inherit" onClick={() => setWindow(0)}>Add New Item</Button>
                        <Button color="inherit" onClick={() => setWindow(1)}>View Items</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {currentWindow ? <ViewItems /> : <AddNewItem />}
        </ThemeProvider>
    );
}

export default App;
