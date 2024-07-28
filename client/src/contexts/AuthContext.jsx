import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if there is a token in localStorage when the app loads
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        // Handle login logic and set the authentication state
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Handle logout logic and clear authentication state
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
