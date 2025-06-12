import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
         {user?.email} | Role: {user?.role}
      </div>
      <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
