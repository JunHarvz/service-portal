import { useState, useEffect, createContext } from "react";
import axios from "axios";
import NewUserModal from "../components/modals/NewUserModal";
import UpdateUserModal from "../components/modals/UpdateUserModal";

export const UserListContext = createContext();

function UsersList () {
    const [usersTable, setUsersTable] = useState([]);
    const [updatedTable, setUpdatedTable] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [updateUserData, setUpdateUserData] = useState(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleOpenUpdateModal = (users) => {
        setUpdateModalIsOpen(true);
        setUpdateUserData(users)
    }
    
    const handleDelete = async (id) => {
         const confirmDelete = window.confirm("Are you sure you want to delete this user?");
         if(confirmDelete) {
            try {
                const response = await axios.delete(`${API_URL}/api/users/${id}`);
                // const response = await axios.delete(`${API_URL}/api/users/${id}`);
                setUsersTable((previousData) => previousData.filter(user => user.id !== id));
                setModalIsOpen(false);
            } catch (error) {
                setError(error.message)
            }
        }
    }
    
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users`);
            setUsersTable(response.data);
            
            
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const filteredData = usersTable.filter(users => 
        users.id.toLowerCase().includes(search.toLowerCase()) ||
        users.first_name.toLowerCase().includes(search.toLowerCase()) ||
        users.last_name.toLowerCase().includes(search.toLowerCase()) ||
        users.location.toLowerCase().includes(search.toLowerCase()) ||
        users.role_name.toLowerCase().includes(search.toLowerCase()) 
    );

    
    return(
        <div className="overflow-x-auto p-6 space-y-6 bg-base-200 min-h-screen m-10 rounded-xl">
        <h1 className="text-2xl">Users List</h1>
        <div className="divider my-2" />
        <div className="flex justify-end p-4">
            <input type="text" placeholder="Search" className="input input-md m-2" onChange={handleSearchChange}/>
            <a className="btn btn-primary m-2" onClick={() => handleOpenModal()}>Add User</a>
        </div>
        <table className="table w-full min-w-[100px] md:min-w-[700px] lg:min-w-[900px]">
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody className="w-[500px] overflow-x-auto">
            {filteredData.map((users) => (
                <tr className='hover:bg-base-300' key={users.id}>
                    <td>{users.id}</td>
                    <td>{users.first_name}</td>
                    <td>{users.last_name}</td>
                    <td>{users.role_id === 1 ? "Admin" :
                            users.role_id === 2 ? "Manager" :
                            users.role_id === 3 ? "Technician" : "No Role"}</td>
                    <td>{users.location}</td>
                    <td>
                        <button className="btn btn-outline btn-md" popoverTarget={`popover-${users.id}`} >
                        Actions
                        </button>
                        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                        popover="auto" id={`popover-${users.id}`} >
                            <li><button onClick={() => handleOpenUpdateModal(users)}>Update</button></li>
                            <li><button onClick={() => handleDelete(users.id)}>Delete</button></li>
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

        <NewUserModal 
                    modalIsOpen = {modalIsOpen}
                    onModalClose ={() => setModalIsOpen(false)} 
                    fetchUsers = {fetchUsers} />
        <UpdateUserModal 
                updateModalIsOpen = {updateModalIsOpen}
                onUpdateModalClose ={() => setUpdateModalIsOpen(false)}
                updateUserData = {updateUserData}
                fetchUsers = {fetchUsers} />
        </div>    
        
    )

    
}

export default UsersList