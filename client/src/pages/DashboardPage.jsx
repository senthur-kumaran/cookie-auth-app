import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../services/axiosConfig";

const DashboardPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getUsers = async () => {
        try {
            const response = await api.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.log("Fetching the user error!");
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleLogout = () => {
        navigate('/login');
        logout();
    };

    if (isLoading) {
        <Typography variant="h4" align="center">Loading......</Typography>
    }

    if (isError) {
        <Typography variant="h4" align="center">Oops! something went wrong.</Typography>
    }

    return (
        <>
            <Typography variant="h2">DashboardPage</Typography>
            {users?.map((user) => {
                return <Typography key={user._id}>{user.username}</Typography>;
            })}
            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default DashboardPage