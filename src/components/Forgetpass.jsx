import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgetpass.css';

function Pass() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        UserId: '',
        OldPassword: '',
        NewPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/forgetpassword", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded", // or "multipart/form-data" depending on your server setup
                },
                body: new URLSearchParams(formData).toString(),
            });
            const data = await response.json();
            if (response.ok) {
                // Password reset successful
                alert("Password changed successfully!");
                navigate('/home');
            } else {
                // Password reset failed
                alert(data.message || "Password reset failed");
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error
            alert("An error occurred while processing your request. Please try again later.");
        }
    };

    return (
        <div className='pass'>
            <h1>Forget Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text' // Change type to 'text'
                    placeholder='User Id'
                    name='UserId'
                    value={formData.UserId}
                    onChange={handleChange}
                    required
                />
                <input
                    type='password'
                    placeholder='Old Password'
                    name='OldPassword'
                    value={formData.OldPassword}
                    onChange={handleChange}
                    required
                />
                <input
                    type='password'
                    placeholder='New Password'
                    name='NewPassword'
                    value={formData.NewPassword}
                    onChange={handleChange}
                    required
                />
                <button className='btn' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Pass;
