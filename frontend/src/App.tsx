import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {UserCreate} from "./UserCreate";
import {UserList} from "./UserList";
import {
    QueryClient, QueryClientProvider
} from 'react-query'

const queryClient = new QueryClient()

export default function App() {
    return (
        <Container maxWidth="sm">
            <Box sx={{my: 12}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Uptain Coding Challenge
                </Typography>
                <QueryClientProvider client={queryClient}>
                    <UserCreate/>
                    <UserList/>
                </QueryClientProvider>
            </Box>
        </Container>
    );
}
