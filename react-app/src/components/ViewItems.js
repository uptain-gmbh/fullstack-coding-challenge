import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Paper, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

import config from "../utils/config.json";
import axios from "axios";

export default function ViewItems() {

    const [items, setItems] = useState([]);

    const getItems = () => {
        axios.get(config.apiUrl + '/items')
            .then((response) => {
                if (response.status === 200) {
                    setItems(response.data.Items)
                } else {
                    toast(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        type: "error"
                    });
                }
            }).catch((error) => {
                toast(error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    type: "error"
                });
            });
    }
    const deleteItems = (id,index) => {
        axios.delete(config.apiUrl + '/items/' + id)
            .then((response) => {
                if (response.status === 200) {
                    setItems(prevState => {
                        const items = [...prevState]; // create new array based on current tasks
                        items.splice(index, 1); // remove task by index
                        return items; // return altered array
                    });
                } else {
                    toast(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        type: "error"
                    });
                }
            }).catch((error) => {
                toast(error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    type: "error"
                });
            });
    }
    useEffect(() => {
        getItems();
    }, []);

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <ToastContainer />
            <React.Fragment>
                <TableContainer component={Paper} sx={{ marginTop: 5 }}>
                    <Table sx={{ minWidth: 650, }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell >Description</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((value, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{value.name}</TableCell>
                                    <TableCell >{value.description}</TableCell>
                                    <TableCell>
                                        <Button size="small"
                                            onClick={() => deleteItems(value.id,index)}
                                            color="secondary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        </Container>
    );
}
