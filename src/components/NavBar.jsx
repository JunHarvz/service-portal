import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NavBar({onLogOut}) {
    const { userData, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function capitalizeFirstLetter(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const handleLogout = () => {
        logout();                // 1. Clear token
        navigate('/login');      // 2. Redirect to login
    };
    return (
    <div className="navbar bg-base-200 shadow-sm bg-black-300">
      <div className="navbar-start">
        <label htmlFor="my-drawer" className="btn btn-soft h-10 w-10 drawer-button hover:bg-transparent">
          ☰
        </label>
          <a className="btn btn-ghost text-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cctv-icon lucide-cctv"><path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"/><path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"/><path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"/><path d="M2 21v-4"/><path d="M7 9h.01"/></svg>
            Service Management</a>
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
              <span className="text-sm text-gray-500">{capitalizeFirstLetter(userData.user_role)}</span>
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