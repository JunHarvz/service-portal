import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NavBar({onLogOut}) {
    const { userData, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();                // 1. Clear token
        navigate('/login');      // 2. Redirect to login
    };
    return (
    <div className="navbar bg-base-200 shadow-sm bg-black-300">
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
            </div>
            <a className="btn btn-ghost text-xl">Service Management</a>
        </div>
        <div className="navbar-end">
                <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
      <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="profile" />
    </div>
  </div>
  <ul
    tabIndex={0}
    className="mt-3 p-4 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-64 space-y-2"
  >
    <li className="flex flex-col items-center">
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="profile" />
        </div>
      </div>
      <p className="font-semibold mt-2">{userData.fullname}</p>
      <span className="text-sm text-gray-500">{userData.user_role}</span>
    </li>
    <div className="divider my-2" />
    <li>
      <button
        onClick={handleLogout}
        className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-900 text-white hover:scale-105 transition-transform duration-200 shadow">
        Logout
      </button>
    </li>
  </ul>
</div>
        </div>
    </div>
    );
}