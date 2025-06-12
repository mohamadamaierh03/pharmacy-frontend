import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/signup", formData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-select" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>
      <div className="text-center mt-3">
        <span>Already have an account? </span>
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
}
