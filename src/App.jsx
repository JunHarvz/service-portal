import { useState, useEffect } from 'react'
import './App.css'
import SideNav from './components/SideNav';
import NavBar from './components/NavBar'
import TicketsTable from './components/TicketsTable'
import ModalForm from './components/ModalForm';
import axios from 'axios';
import Footer from './components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [btnName, setBtnName] = useState();
  const [btnDisable, setBtnDisable] = useState(true);
  const [ticketData, setTicketData] = useState(null);
  const [tableData, setTableData] = useState([])
  
  const handleOpen = (mode, ticket) => {
    setModalMode(mode);
    setTicketData(ticket);
    setIsOpen(true);
  };

  useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`);
                setTableData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    },[]);

  const handleSubmit = async (newTicketData) => {
    let mode = modalMode;
    switch (mode) {
      case "add" :
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`, newTicketData);
          setTableData(previousData => [...previousData, response.data]);
        } catch (error) {
          console.error('Error',error)
        }
        break;
      case "update":
        try {
          const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/${ticketData.id}`,newTicketData);
          console.log(ticketData.id);
          console.log('Ticket updated:', response.data);
          setTableData((previousData) => previousData.map((ticket) => (ticket.id === ticketData.id ? response.data : ticket))
                      );
        } catch (error) {
          console.log('Error updating ticket:', error);
        }
        break;
    }
  };

 return (
    <>
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Main content */}
        <NavBar  />
        <label htmlFor="my-drawer" className="btn btn-neutral m-4 drawer-button">
          ☰
        </label>
        <TicketsTable onOpen={() => handleOpen('add')} tableData={tableData} handleOpen={handleOpen} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {/* ✅ Use your SideNav component here */}
        <SideNav />
      </div>
    </div>

    <ModalForm isOpen={isOpen} 
                OnSubmit={handleSubmit} 
                onClose={() => setIsOpen(false)}
                mode={modalMode}
                ticketData={ticketData} 
                />
    <Footer />            
    </>
  )
}
export default App
