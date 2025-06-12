import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 d-none d-md-flex flex-column" style={{ width: "220px", minHeight: "100vh" }}>
      <h4 className="text-center mb-4">DASHBOARD</h4>
      <ul className="nav flex-column gap-2">
        <li className="nav-item"><Link className="nav-link text-white" to="/Dashboard">Home</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/inventory">Inventory</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/notifications">Notifications</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/patients">Patients</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/prescriptions">Prescriptions</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/reports">Reports</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/suppliers">Suppliers</Link></li>
      </ul>
    </div>
  );
}
