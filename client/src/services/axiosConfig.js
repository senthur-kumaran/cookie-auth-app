import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Logout function to clear the token and redirect to login
const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login'; // Assuming you have a login route
};

// Request interceptor to add accessToken to headers
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return Promise.reject(new Error('Try again after sometime later!'));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Attempt to refresh the token
                const response = await api.post('/api/refresh-token', {}, { withCredentials: true });

                const { accessToken } = response.data;

                // Save new accessToken in localStorage
                localStorage.setItem('accessToken', accessToken);

                // Update the Authorization header and retry the request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token error (e.g., redirect to login)
                console.error('Refresh token error', refreshError);
                logout(); // Redirect to login and clear the token
            }
        }

        return Promise.reject(error);
    }
);

export default api;
