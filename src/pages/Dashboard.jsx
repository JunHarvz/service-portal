import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard () {

    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const fetachData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:8080/api/dashboard', {
                    headers: {Authorization: `Beare ${token}`},f
                });
                setMessage(res.data.message);
            } catch (error) {
                setMessage('Unathorized');
            }
        };
        fetachData();
    })
    return(
        <>
    <div className="p-6 space-y-6 bg-base-200 min-h-screen m-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-2xl font-semibold">1,230</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Active Tickets</h2>
            <p className="text-2xl font-semibold">87</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue</h2>
            <p className="text-2xl font-semibold">$12,430</p>
          </div>
        </div>
      </div>
    </div>
  ;</>
    )
}

export default Dashboard