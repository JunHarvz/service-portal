import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ModalForm from './modals/ModalForm';

export const TicketContext = createContext();

export default function TicketsTable() {
    
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const { userData } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [modalMode, setModalMode] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [updateData, setUpdateData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleOpenModal = (mode, ticket) => {
        setUpdateData(ticket);
        setModalMode(mode);
        setModalIsOpen(true);
    }
    
    const handleDelete = async (ticket_no) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
        if(confirmDelete) {
            try {
                await axios.delete(`${API_URL}/api/tickets/${ticket_no}`);
                setTableData((previousData) => previousData.filter(ticket => ticket.ticket_no !==ticket_no));
                setModalIsOpen(false);
            } catch (error) {
                setError(error.message)
            }
        }
    }

    const fetchData = async () => {
        setIsLoading(true);
            try {
                const response = await axios.get(`${API_URL}/api/tickets`);
                setTableData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
    
    const filteredData = tableData.filter(ticket => 
        ticket.ticket_no.toLowerCase().includes(search.toLowerCase()) ||
        ticket.client_name.toLowerCase().includes(search.toLowerCase()) ||
        ticket.technician.toLowerCase().includes(search.toLowerCase())
    );


    useEffect (() => {
        fetchData();
    },[]);
    
    return (
    <TicketContext.Provider value= {{tableData, setTableData}}>
        <div className="p-6 space-y-6 bg-base-200 min-h-screen m-10 rounded-xl">
        <h1 className="text-2xl">Active Tickets</h1>
        <div className="divider my-2" />
        <div className="flex justify-end p-4">
            <input type="text" placeholder="Search" className="input input-sm m-2" onChange={handleSearchChange}/>
            <a className="btn btn-primary h-8 m-2" onClick={() => handleOpenModal('add')}>Add Ticket</a>
        </div>
        <table className="table pr-35">
            <thead>
            <tr>
                <th>ID</th>
                <th>Ticket Number</th>
                <th>Client</th>
                <th>Technician</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {isLoading ? (
                <tr>
                    <td colSpan="5" className="text-center py-4">
                        <div className="skeleton h-10 w-full my-2"></div>
                        <div className="skeleton h-10 w-full my-2"></div>
                        <div className="skeleton h-10 w-full my-2"></div>
                        <div className="skeleton h-10 w-full my-2"></div>
                        <div className="skeleton h-10 w-full my-2"></div>
                        <div className="skeleton h-10 w-full my-2"></div>
                    </td>
                </tr>
            ): (
                filteredData.map((ticket) => (
                <tr className='hover:bg-base-300' key={ticket.id}>
                    <th>{ticket.id}</th>
                    <td>{ticket.ticket_no}</td>
                    <td>{ticket.client_name}</td>
                    <td>{ticket.technician}</td>
                    <td className={`${ticket.status_name == "Open" ? "badge badge-primary my-4.5" : 
                                        ticket.status_name == "Close" ? "badge badge-success my-4.5":
                                        ticket.status_name == "In Progress" ? "badge badge-warning mt-4.5":
                                        ticket.status_name == null ? "badge badge-neutral mt-4.5": "badge neutral mt-4.5"}`}
                        value={ticket.status_name}> 
                                    {ticket.status_name != null ? ticket.status_name : "No status"}</td>
                    
                    <td className={userData.user_role === 'admin' || 'manager' ? " " : "hidden"}>
                        <button className="btn btn-outline btn-md" popoverTarget={`popover-${ticket.id}`} >
                        Actions
                        </button>

                        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                        popover="auto" id={`popover-${ticket.id}`} >
                            <li><button onClick={() => handleOpenModal('update', ticket)}>Update</button></li>
                            <li><button onClick={() => handleDelete(ticket.ticket_no)}>Delete</button></li>
                        </ul>
                    </td>
                </tr>
                ))
            )}
            
            </tbody>
        </table>

    <ModalForm modalIsOpen = {modalIsOpen}
                onModalClose ={() => setModalIsOpen(false)}
                mode = {modalMode}
                updateData = {updateData}
                tableData = {tableData}
                fetchData = {fetchData}/>
    </div>
    </TicketContext.Provider>
    
    );
}