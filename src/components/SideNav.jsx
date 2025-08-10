import { Link } from "react-router-dom";

function SideNav () {

    return (<>
    <ul className="menu p-1 w-80 min-h-full bg-base-300">
      <label className="flex cursor-pointer gap-2 ml-35">
        <span className="label-text italic">Dark Mode</span>
        <input type="checkbox" value="light" className="toggle theme-controller" />
      </label>
    <section className="my-10 font-semibold text-lg font-roboto">
      <li><Link to="dashboard">Dashboard</Link></li>
      <li>
       <details close="true">
            <summary>Tickets</summary>
            <ul>
              <li>
                <Link to="tickets">Active Tickets</Link>
                </li>
              <li><button>Closed Tickets</button></li>
            </ul>
          </details>
        </li>
      <li><Link to="users">Users List</Link></li>
    </section>
      
    </ul></> 
  )
}
export default SideNav;