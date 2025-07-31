import { useState, useEffect } from "react";
export default function ModalForm({isOpen, onClose, mode, OnSubmit, ticketData}) {

    const [client_id, setClientId] = useState('');
    const [ticket_no, setTicketNumber] = useState('');
    const [client_name, setClientName] = useState('');
    const [technician, setTechnician] = useState('');
    const [status, setStatus] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!client_id || !ticket_no || !client_name || !technician ) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        try {
            const ticketData = {client_id, ticket_no, client_name, technician, status}
            await OnSubmit(ticketData);
            onClose();
        } catch (error) {
            console.error(error);
        }
        
    }
    
    useEffect(() => {
        if(mode === 'update' && ticketData){
            setClientId(ticketData.client_id);
            setTicketNumber(ticketData.ticket_no);
            setClientName(ticketData.client_name);
            setTechnician(ticketData.technician);
            setStatus(ticketData.status);
        }else if(mode === 'add') {
            setClientId('');
            setTicketNumber('');
            setClientName('');
            setTechnician('');
            setStatus(0);
        }
    }, [mode, ticketData]);   

    return(
        <>
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">{mode === 'update' ? 'Update Ticket' : 'Add Ticket'}</h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Client ID</legend>
                    <input type="text" className="input" value={client_id} onChange={(e) => setClientId(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Ticket Number</legend>
                    <input type="text" className="input" value={ticket_no} onChange={(e) => setTicketNumber(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Client Name</legend>
                    <input type="text" className="input" value={client_name} onChange={(e) => setClientName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Technician</legend>
                    <input type="text" className="input" value={technician} onChange={(e) => setTechnician(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Status</legend>
                    <select value={status} className="select" onChange={(e) => setStatus(e.target.value)}>
                        <option value="0">--STATUS--</option>
                        <option value="1">Open</option>
                        <option value="2">Close</option>
                        <option value="3">In Progress</option>
                    </select>
                    </fieldset>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <button type="submit"  className="btn btn-primary mt-4 align-right" >{mode === 'update' ? 'SAVE' : 'ADD'}</button>
                </form>
            </div>
        </dialog>
        </>)
}