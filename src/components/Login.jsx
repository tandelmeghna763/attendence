import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

    const [formData, setFormData] = useState({
        UserId: "",
        Password: "",
    });;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", formData);
        login();
    };

    const login = async () => {
        if (!formData.UserId || !formData.Password) {
            alert("Please fill in all fields");
            return;
        }
        console.log("Login Function Executed", formData);
        let responseData;

        await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => (responseData = data));

        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            localStorage.setItem("UserId", formData.UserId);
            window.location.replace("/home");
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='UserId'
                    name="UserId"
                    placeholder='User Id'
                    value={formData.UserId}
                    onChange={handleChange}
                    required
                /><br />
                <input
                    type='Password'
                    name="Password"
                    placeholder='Password'
                    value={formData.Password}
                    onChange={handleChange}
                    required
                /><br />
                <button className='btn'>Submit</button>
            </form>
            <br />
            <Link to="/pass">Forget Password</Link>
        </div>
    );
}

export default Login;
