import React, { useState } from 'react';
import {
    Container,
    Typography, Grid, Button, TextField, Paper
} from '@mui/material';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../utils/config.json"

function AddNewItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [active, setStatus] = useState(false);

    const handleChange = (event) => {
        if (event.target.name === "name")
            setName(event.target.value);
        else
            setDescription(event.target.value);
    }
    const onSubmit = () => {
        setStatus(true);
        axios.post(config.apiUrl + "/items", { name, description }).then((response) => {
            if (response.status === 200) {
                setStatus(false);
                setName("");
                setDescription("");
                toast("Item has added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    type: "success"
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

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <ToastContainer />
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Add New Items
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                variant="standard"
                                value={name}
                                onChange={(event) => handleChange(event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                fullWidth
                                value={description}
                                variant="standard"
                                onChange={(event) => handleChange(event)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={() => onSubmit()} disabled={active}>Sumbit</Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Paper>
        </Container>
    );
}

export default AddNewItem;
