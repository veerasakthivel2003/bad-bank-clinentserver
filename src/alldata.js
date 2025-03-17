import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./alldata.css"; // Import the CSS file

export default function Alldata() {
  let [data, setData] = useState([]);
  let [editId, setEditId] = useState(null);
  let [formData, setFormData] = useState({ name: "", email: "", password: "", amount: "" });

  const api = "https://bad-bank-serverside.onrender.com/";


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let result = await axios.get(`${api}/data`);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${api}/delete/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }

  function handleEdit(item) {
    setEditId(item._id);
    setFormData({ name: item.name, email: item.email, password: item.password, amount: item.amount });
  }

  async function handleUpdate() {
    try {
      await axios.put(`${api}/update/${editId}, formData`);
      setData(data.map((item) => (item._id === editId ? { ...item, ...formData } : item)));
      setEditId(null);
    } catch (error) {
      console.error("Error updating:", error);
    }
  }

  return (
    <div className="alldata-container">
      <h1>All Data</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.amount}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editId && (
        <div className="edit-form">
          <h2>Edit Data</h2>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}
