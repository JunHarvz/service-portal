function SideNav () {
    return (<>
    
    
    <ul className="menu p-1 w-80 min-h-full bg-base-300 ">
      <label className="flex cursor-pointer gap-2 ml-25">
      <input type="checkbox" value="winter" className="toggle theme-controller" />
      <span className="label-text">Light</span>
    </label>
      <li><a>Dashboard</a></li>
      <li><a>Tickets</a></li>
      <li><a>Clients</a></li>
      <li><a>Settings</a></li>
    </ul></> 
  )
}
export default SideNav;