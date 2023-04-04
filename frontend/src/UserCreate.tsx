import * as React from 'react';
import {useState} from "react";
import {Button, FormControl, TextField} from "@mui/material";
import {CustomModal} from "./components/Modal";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import {UserCreate as UserCreateType} from "./types";
import {
    useMutation,
    useQueryClient,
} from 'react-query'

export const UserCreate = () => {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<UserCreateType>();

    const {mutateAsync} = useMutation(createUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
            setOpen(false)
            reset()
        }
    })

    const onSubmit = (data: UserCreateType) => {
        mutateAsync(data)
    }

    return (
        <>
            <Button variant={'contained'} sx={{mb: 2}} onClick={() => setOpen(true)}>Create new User</Button>
            <CustomModal open={open} onClose={() => setOpen(false)}>
                <Typography variant="h5" component="h5" gutterBottom>
                    Create New User
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <TextField size={'small'} label={'User ID'} type="text" sx={{mt: 2, mb: 2}}
                                   variant='outlined' {...register("userId", {required: true})} />
                        {errors.userId && <span>This field is required</span>}
                        <TextField size={'small'} label={'Name'} type="text" sx={{mt: 2, mb: 2}}
                                   variant='outlined' {...register("name", {required: true})} />
                        {errors.name && <span>This field is required</span>}
                        <Button type="submit" variant={'contained'}>Save</Button>
                    </FormControl>
                </form>
            </CustomModal>
        </>
    );
}

const createUser = async (payload: UserCreateType) => {
    const url = process.env["REACT_APP_BACKEND_ENDPOINT"] + '/users'

    if (!url) {
        return null
    }

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    return res.json();
}
