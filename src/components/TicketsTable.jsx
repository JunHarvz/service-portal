import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TicketsTable({handleOpen, tableData, setTableData, onOpen}) {

    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }
    
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
        if(confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/tickets/${id}`);
                setTableData((previousData) => previousData.filter(ticket => ticket.id !==id));
                setIsOpen(false);
            } catch (error) {
                setError(error.message)
            }
        }
    }

    const filteredData = tableData.filter(ticket => 
        ticket.ticket_no.toLowerCase().includes(search.toLowerCase()) ||
        ticket.client_name.toLowerCase().includes(search.toLowerCase()) ||
        ticket.technician.toLowerCase().includes(search.toLowerCase()) ||
        ticket.status.toLowerCase().includes(search.toLowerCase()) 
    );
    
    return (
    <div className="overflow-x-auto m-10 ">
        <div className="flex justify-end p-4">
            <input type="text" placeholder="Search" className="input input-md m-2" onChange={handleSearchChange}/>
            <a className="btn btn-primary m-2" onClick={onOpen}>Add Ticket</a>
        </div>
        <table className="table pr-35">
            <thead>
            <tr>
                <th>Client ID</th>
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
                    <td className={`${ticket.status == 1 ? "badge badge-primary mt-4.5" : 
                                      ticket.status == 2 ? "badge badge-success mt-4.5":
                                      ticket.status == 3 ? "badge badge-warning mt-4.5": "badge neutral mt-4.5"}`}
                        value={`${ticket.status == 1 ? 1 : 
                                  ticket.status == 2 ? 2 :
                                  ticket.status == 3 ? 4 : 0}`}> 
                                    {ticket.status == 1 ? 'Open' :
                                    ticket.status == 2 ? 'Closed':
                                    ticket.status == 3 ? 'In-Progress': "No Status"}</td>
                    
                    <td>
                        <button className="btn btn-outline btn-md" popoverTarget={`popover-${ticket.id}`} >
                        Actions
                        </button>

                        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                        popover="auto" id={`popover-${ticket.id}`} >
                            <li><button onClick={() => handleOpen('update', ticket)}>Update</button></li>
                            <li><button onClick={() => handleDelete(ticket.id)}>Delete</button></li>
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>


    </div>
    
    );
}