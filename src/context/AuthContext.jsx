import { createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isVerifying, setIsVerifying] = useState(true);

     useEffect(() => {
        const verifyAndFetchProfile = async () => {
            if (!token) {
                setIsVerifying(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    setToken(null);
                    setUserData(null);
                } else {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (err) {
                console.error("Error verifying token:", err);
                localStorage.removeItem('token');
                setToken(null);
                setUserData(null);
            } finally {
                setIsVerifying(false);
            }
        };

        verifyAndFetchProfile();
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{userData, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}