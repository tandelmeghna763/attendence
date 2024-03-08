import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Record from '../record.json';

function Home() {
    const [userId, setUserId] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('UserId');
        if (loggedInUserId) {
            setUserId(loggedInUserId);
        }
        setAttendanceData(Record.filter(item => item.UserId === loggedInUserId));
    }, []);

    const cal = (userId, subjectName) => {
        const useratt = attendanceData.filter(data => data.UserId === userId && data.SubjectName === subjectName);
        if (!useratt.length) return 0;

        const totalDays = Object.keys(useratt[0]).filter(key => key !== 'UserId' && key !== 'Password' && key !== 'SubjectName').length;
        const attendedDays = Object.values(useratt[0]).filter(value => value === 'P').length;

        const attendancePercentage = (attendedDays / totalDays) * 100;
        return attendancePercentage.toFixed(2);
    }

    return (
        <div className='homepage'>
            <h1 className='hadding'>Student Attendance System</h1>
            <div className='flex'>
                <h3 className='h2'>Welcome {userId}</h3>
                <h3><Link to="/">LogOut</Link></h3>
                <h3><Link to="/pass">ChangePassword</Link></h3>
            </div>
            <h2 className='h1'>Attendance Information</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Subject Name</th>
                        <th>Attendance Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(data => (
                        <tr key={data.UserId + data.SubjectName}>
                            <td>{data.UserId}</td>
                            <td>{data.SubjectName}</td>
                            <td>{cal(data.UserId, data.SubjectName)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
