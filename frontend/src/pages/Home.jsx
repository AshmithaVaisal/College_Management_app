import React, { useEffect, useState } from "react";
import api from "../api"; 
import "../styles/home.css"


export const Home = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect hook runs once when the component mounts to fetch student data
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Retrieve the token
                if (!token) {
                    throw new Error("No authentication token found. Please log in.");
                }
    
                const response = await api.get("/api/students/", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Bearer token to headers
                    },
                });
    
                setStudents(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.detail || "Failed to load student data. Please check your authentication."
                );
            } finally {
                setLoading(false);
            }
        };
    
        fetchStudents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-container">
            <h1>Student Details</h1>
            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Blood Group</th>

                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.dob}</td>
                                <td>{student.blood_group}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};


