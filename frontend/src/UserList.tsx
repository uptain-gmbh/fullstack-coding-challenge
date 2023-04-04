import * as React from 'react';
import {CustomTable} from "./components/CustomTable";
import {
    useQuery,
} from 'react-query'
import {User} from "./types";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

export const UserList = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'UserId',
                accessor: 'userId',
            },
            {
                Header: 'Name',
                accessor: 'name',

            },
        ],
        []
    )

    const {data, isLoading} = useQuery('users', getUsers)


    if (isLoading) {
        return <Box><CircularProgress/></Box>
    }

    return (
        <CustomTable columns={columns} data={data || []}/>
    );
}


const getUsers = async (): Promise<User[] | null> => {
    const url = process.env["REACT_APP_BACKEND_ENDPOINT"] + '/users'

    if (!url) {
        return null
    }

    const res = await fetch(url, {
        mode: "cors",
        credentials: "same-origin",
    });
    return res.json();
}
