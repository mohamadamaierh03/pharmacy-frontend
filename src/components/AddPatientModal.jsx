import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddPatientModal({ show, onClose, selected }) {
  const { user } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    contact: "",
    address: ""
  });

  useEffect(() => {
    if (selected) {
      setFormData(selected);
    } else {
      setFormData({
        full_name: "",
        dob: "",
        contact: "",
        address: ""
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "x-role": user?.role || "user" 
        }
      };

      if (selected) {
        await axios.put(`${API}/patients/${selected.id}`, formData, config);
      } else {
        await axios.post(`${API}/patients`, formData, config);
      }

      onClose();
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selected ? "Edit Patient" : "Add New Patient"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Info</Form.Label>
            <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {selected ? "Update" : "Add"} Patient
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
