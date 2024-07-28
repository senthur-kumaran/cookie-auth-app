import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

import { LoginSchema } from '../schemas/loginSchema';
import { zodToFormikValidate } from '../utils/validation';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: zodToFormikValidate(LoginSchema),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, values, {
                    withCredentials: true  // Important for sending and receiving cookies
                });
                const { accessToken } = response.data;

                login(accessToken);  // Update context with login

                navigate('/login');
            } catch (error) {
                console.error('Login error', error);
                // Handle login error
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
