import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddSupplierModal({ show, onClose, selected }) {
  const { user } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: ""
  });

  useEffect(() => {
    if (selected) {
      setFormData(selected);
    } else {
      setFormData({ name: "", contact: "", location: "" });
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
        await axios.put(`${API}/suppliers/${selected.id}`, formData, config);
      } else {
        await axios.post(`${API}/suppliers`, formData, config);
      }

      onClose();
    } catch (err) {
      console.error("Error saving supplier:", err);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selected ? "Edit Supplier" : "Add Supplier"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Info</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {selected ? "Update" : "Add"} Supplier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
