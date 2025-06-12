import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-light p-3 border-bottom">
      <h5 className="mb-0">Pharmacy Management</h5>
      <div className="d-flex align-items-center gap-3">
        {user && (
          <span className="text-muted">{user.email} ({user.role})</span>
        )}
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
