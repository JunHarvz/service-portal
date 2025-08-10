import { useState, useEffect } from 'react';
import axios from 'axios';
 
function UpdateUserModal ({updateModalIsOpen, onUpdateModalClose, updateUserData}) {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roleId, setRoleId] = useState(0);
    const [locationId, setLocationId] = useState(0);
    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);

    const handleSubmit = async (e) => {
        if(!updateUserData) return;
    e.preventDefault();
        const userData = {id : id, first_name : firstName, last_name : lastName, role_id : roleId, location_id : locationId}
        try {
            const response = await axios.put(`${API_URL}/api/users/${updateUserData.id}`, userData);
            console.log('User updated:', response.data);
        } catch (error) {
            console.log('Error updating ticket:', error);
        }
        onUpdateModalClose();

    };
    //occupy input fields
    useEffect(() => {
        if(!updateModalIsOpen) return;
        setId(updateUserData.id);
        setFirstName(updateUserData.first_name);
        setLastName(updateUserData.last_name);
        setRoleId(updateUserData.role_id);
        setLocationId(updateUserData.location_id);
    }, [updateUserData ,updateModalIsOpen])
    //fetch roles
    useEffect(() => {
            if(!updateModalIsOpen) return;
            const fetchRoles = async () => {
                const response = await fetch(`${API_URL}/api/roles`);
                const roles = await response.json();
                
                setRoles(roles);
            };
            fetchRoles();
        }, [updateModalIsOpen]);
    //fetch locations
    useEffect(() => {
            if(!updateModalIsOpen) return;
            const fetchLocations = async () => {
                const response = await fetch(`${API_URL}/api/locations`);
                const locations = await response.json();
                
                setLocations(locations);
            };
            fetchLocations();
        }, [updateModalIsOpen]);

    return(<>
    <dialog id="my_modal_3" className="modal" open={updateModalIsOpen}>
        <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit}>   
                <div>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input 
                        type="text"  className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input 
                        type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Role</legend>
                    <select type="select"  className="select" value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                        <option value="0">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.role_name}</option>
                        ))}
                        
                    </select>
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend" >Location</legend>
                    <select type="select"  className="select" value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                        <option value="0">Select Location</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>{loc.location}</option>
                        ))}
                        <option value="1">text</option>
                    </select>
                    </fieldset>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onUpdateModalClose}>✕</button>
                    <button 
                        disabled={!firstName || !lastName || roleId == 0 || locationId == 0 ? true : false} 
                        type="submit" 
                        className="btn btn-primary mt-4"
                        >Submit
                    </button>
                </div>
            </form>
        </div>
    </dialog>
    </>)
}

export default UpdateUserModal