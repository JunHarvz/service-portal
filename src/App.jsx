import { useContext } from 'react'
import { AuthContext } from './context/AuthContext';
import './App.css'
import TicketsTable from './components/TicketsTable'
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import Layout from './components/Layout';
import UsersList from './pages/UsersList';

function App() {
  const { token, isVerifying } = useContext(AuthContext);

  if (isVerifying) {
    return <div>Loading...</div>; // Can replace with spinner
  }

  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/dashboard" />: <LoginPage />} />
      <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="tickets"
          element={
            <ProtectedRoute>
              <TicketsTable />
            </ProtectedRoute>
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute>
              <UsersList/>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      
    </Routes>
  </BrowserRouter>   
  </>
  )
}
export default App
