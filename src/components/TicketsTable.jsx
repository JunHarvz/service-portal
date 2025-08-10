import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ModalForm from './modals/ModalForm';


export default function TicketsTable() {

    const { userData } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [modalMode, setModalMode] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [updateData, setUpdateData] = useState(null);

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
                await axios.delete(`http://localhost:8080/api/tickets/${ticket_no}`);
                setTableData((previousData) => previousData.filter(ticket => ticket.ticket_no !==ticket_no));
                setModalIsOpen(false);
            } catch (error) {
                setError(error.message)
            }
        }
    }
    
    const filteredData = tableData.filter(ticket => 
        ticket.ticket_no.toLowerCase().includes(search.toLowerCase()) ||
        ticket.client_name.toLowerCase().includes(search.toLowerCase()) ||
        ticket.technician.toLowerCase().includes(search.toLowerCase())
    );

    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tickets`);
                setTableData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    },[]);
    
    return (
    <div className="p-6 space-y-6 bg-base-200 min-h-screen m-10">
        <h1 className="text-3xl font-bold">Active Tickets</h1>
        <div className="flex justify-end p-4">
            <input type="text" placeholder="Search" className="input input-md m-2" onChange={handleSearchChange}/>
            <a className="btn btn-primary m-2" onClick={() => handleOpenModal('add')}>Add Ticket</a>
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
            {filteredData.map((ticket) => (
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
            ))}
            </tbody>
        </table>

    <ModalForm modalIsOpen = {modalIsOpen}
                onModalClose ={() => setModalIsOpen(false)}
                mode = {modalMode}
                updateData = {updateData}
                tableData = {tableData}/>
    </div>
    
    );
}