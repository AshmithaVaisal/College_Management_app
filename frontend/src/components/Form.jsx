import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"


function Form({ route, method }) {

  // State variables to manage form inputs and loading state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Determine form title based on the method ('login' or 'register')
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();// Prevent default form submission behavio

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                console.log("Login successful:", res.data);

                // On successful login, store access and refresh tokens in local storage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                // Provide user feedback and navigate to the home page
                alert("Login successful!");
                navigate("/");
                console.log("Navigating to home...");
            } else {
                // On successful registration, inform the user and navigate to the login page
                alert("Registration successful!");
                navigate("/login")
            }

         // Handle API errors gracefully, providing user feedback
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {/* {loading && <LoadingIndicator />} */}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form;


