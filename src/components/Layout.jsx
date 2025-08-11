import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import UsersList from "../pages/UsersList";


function Layout() {
    return(<>
    <NavBar></NavBar>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                
            <main><Outlet /></main>
            {/* This renders the matching route inside the layout */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <SideNav />
            </div>
        </div>
        <Footer></Footer>
        
    </>)
}

export default Layout