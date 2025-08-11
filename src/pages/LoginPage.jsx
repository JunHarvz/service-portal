import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage ({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type' : 'application/json' }
        });

        if(response.ok) {
            const data = await response.json();
            login(data.token);
            navigate('/dashboard');
        } else {
            alert('Login Failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-end bg-gradient-to-br from-white-200 to-black-300">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm mr-15">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Service Management Portal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage