import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";

function ModalForm ({modalIsOpen, onModalClose, mode, updateData, tableData}) {
    const { userData } = useContext(AuthContext);
    const [id, setID] = useState('');
    const [generatedTNum, setGeneratedTNum] = useState('');
    const [ticket_no, setTicketNumber] = useState('');
    const [clientId, setClientId] = useState('');
    const [client_name, setClientName] = useState('0');
    const [c_name, setCName] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [technician, setTechnician] = useState('0');
    const [status, setStatus] = useState('0');
    const [description, setDescription] = useState('');
    const API_URL = import.meta.env.VITE_API_BASE_URL;    
    const generateTicketNo = () => {
        const date = new Date();
        const year = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        
        return `${userData.location_code}-${year}-${tableData.length + 1}`;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
            switch (mode) {
            case "add" :
                 const ticketData = {ticket_no, technician, clientId, description}
                //Check if fields are filled out
                if (!ticket_no || !clientId || !technician || !description) {
                    alert('Please fill out all fields before submitting.');
                    return;
                }
                try {
                const response = await axios.post(`${API_URL}/api/tickets`, ticketData);
                // setReturnUpdated(previousData => [...previousData, response.data]);
                console.log(response.data);
                } catch (error) {
                console.error('Error',error)
                }
                break;
            case "update":
                try {
                    const ticketData = {status};
                    const response = await axios.put(`${API_URL}/api/tickets/${updateData.ticket_no}`, ticketData);
                
                console.log('Ticket updated:', response.data);
                // setFormData((previousData) => previousData.map((ticket) => (ticket.client_id === updateData.client_id ? response.client_id : ticket)));
                } catch (error) {
                console.log('Error updating ticket:', error);
                }
                break;
            } 
        onModalClose();
    }
    

    useEffect(() => {
        if(mode === 'update' && updateData){
            setID(updateData.id);
            setTicketNumber(updateData.ticket_no);
            setClientName(updateData.client_name);
            setTechnician(updateData.technician);
            setStatus(updateData.status);
            setDescription(updateData.description)
        }else if(mode === 'add') {
            setTicketNumber(generateTicketNo());
            setClientId(0);
            setTechnician(0);
        }
    }, [mode, updateData]);   
    //Fetch clients list
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/clients`);
                setCName(res.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchClients();
    }, [mode]);
    //Fetch technicians
    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/technicians`);
                setTechnicians(res.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchTechnicians();
    }, [mode]);
    return(
        <>
        <dialog id="my_modal_3" className="modal" open={modalIsOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-5">{mode === 'update' ? 'Update Ticket' : 'Add Ticket'}</h3>
                {mode === 'add' ? 
                <form method="dialog" onSubmit={handleSubmit}>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Ticket Number</legend>
                    <input type="text" 
                        className="input input-ghost" disabled
                        value={ticket_no} onChange={(e) => setTicketNumber(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Client Name</legend>
                    <select className="select" onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                            {c_name.map((cname) => (
                                <option key={cname.id} value={cname.id}>
                                {cname.client_name}
                                </option>
                            ))}
                    </select>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Technician</legend>
                    <select  className="select" onChange={(e) => setTechnician(e.target.value)}>
                        <option value="0">Select Technician</option>
                        {technicians.map((techs) => (
                                <option key={techs.id} value={techs.id}>
                                {techs.technician}
                                </option>
                            ))}
                    </select>
                    </fieldset>

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea type="text" 
                        className="textarea textarea-sm" 
                        value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </fieldset>
                    
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onModalClose}>✕</button>
                <button type="submit"  className="btn btn-primary mt-4 align-right" >{mode === 'update' ? 'SAVE' : 'ADD'}</button>
                </form>

                :

                <form method="dialog" onSubmit={handleSubmit}>
                    
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Client Name :
                        <span>{client_name}</span>
                    </legend>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Ticket Number :
                        <span>{ticket_no}</span>
                    </legend>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Technician :
                        <span>{technician}</span>
                    </legend>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Description :
                        <span>{description}</span>
                    </legend>
                    </fieldset>
                    </fieldset>
                    <fieldset className={mode === "update" ? "fieldset" : "fieldset hidden"}>
                    <legend className="fieldset-legend">Status</legend>
                    <select value={status} className="select w-full" onChange={(e) => setStatus(e.target.value)}>
                        <option value="0">Select Status</option>
                        <option value="1">Open</option>
                        <option value="2">Close</option>
                        <option value="3">In Progress</option>
                    </select>
                    </fieldset>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onModalClose}>✕</button>
                <button type="submit"  className="btn btn-primary mt-4 align-right" >{mode === 'update' ? 'SAVE' : 'ADD'}</button>
                </form>
                }
            </div>
        </dialog>
        </>)

}

export default ModalForm
