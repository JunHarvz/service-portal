import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard () {

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [userCount, setUserCount] = useState('');
  const [ticketCount, setTicketCount] = useState('');

  const fetchUserCount = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users`);
            setUserCount(response.data.length);
        } catch (error) {
            console.log(error)
        }
        
  }

  const fetchTicketCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/tickets`);
        setTicketCount(response.data.length);
    } catch (error) {
        setError(error.message);
    }
  }

  useEffect(() => {
      fetchUserCount();
      fetchTicketCount();
  }, []);
    
    return(
        <>
    <div className="p-6 space-y-6 bg-base-200 min-h-screen m-10 rounded-xl">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="divider my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-2xl font-semibold">{userCount}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Tickets</h2>
            <p className="text-2xl font-semibold">{ticketCount}</p>
          </div>
        </div>

        {/* <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue</h2>
            <p className="text-2xl font-semibold">$12,430</p>
          </div>
        </div> */}
      </div>
    </div>
  </>
    )
}

export default Dashboard