import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode";
import api from "../api"
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../constants"
import {useEffect, useState} from "react"

// This component ensures that only authorized users can access certain routes.

function ProtectedRoute({ children }) {
     // Tracks whether the user is authorized
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (!token) {
                    // No token, user is unauthorized
                    setIsAuthorized(false); 
                    return;
                }

                const decoded = jwtDecode(token);// Decode the JWT token
                const tokenExpiration = decoded.exp; // Extract the expiration time
                const now = Date.now() / 1000; // Current time in seconds

                if (tokenExpiration < now) {
                    // Token expired, try refreshing
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                    if (!refreshToken) {
                        setIsAuthorized(false);
                        return;
                    }

                    const res = await api.post("/api/token/refresh/", {
                        refresh: refreshToken,
                    });
                    if (res.status === 200) {
                        localStorage.setItem(ACCESS_TOKEN, res.data.access);
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    // Token is valid
                    setIsAuthorized(true);
                }
            } catch (error) {
                // Handle errors during token verification or refreshing
                console.error("Error during authentication:", error);
                setIsAuthorized(false);
            }
        })();
    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Show a loading state while verifying
    }
    // Render the children if authorized; otherwise, redirect to the login page
    return isAuthorized ? children : <Navigate to="/login" />;
}
export default ProtectedRoute; 