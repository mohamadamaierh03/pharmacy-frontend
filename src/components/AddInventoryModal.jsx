import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddInventoryModal({ show, onClose, selected }) {
  const { user } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    price: "",
    supplier: ""
  });

  useEffect(() => {
    if (selected) setFormData(selected);
    else setFormData({ item_name: "", quantity: "", price: "", supplier: "" });
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
        await axios.put(`${API}/inventory/${selected.id}`, formData, config);
      } else {
        await axios.post(`${API}/inventory`, formData, config);
      }

      onClose();
    } catch (err) {
      console.error("Error saving inventory:", err);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selected ? "Edit Item" : "Add Inventory Item"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" name="item_name" value={formData.item_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Supplier</Form.Label>
            <Form.Control type="text" name="supplier" value={formData.supplier} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">{selected ? "Update" : "Add"} Item</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
