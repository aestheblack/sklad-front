import React, { useState, useEffect } from "react";
import axios from "axios";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [form, setForm] = useState({
    contractNomer: "",
    customerId: "",
    adminId: "",
    helperId: "",
  });

  // Fetch contracts from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contracts")
      .then((response) => setContracts(response.data))
      .catch((error) => console.error("Error fetching contracts:", error));
  }, []);

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to create new contract
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/contracts", form)
      .then((response) => {
        setContracts((prev) => [...prev, response.data]);
        setForm({ contractNomer: "", customerId: "", adminId: "", helperId: "" });
      })
      .catch((error) => console.error("Error adding contract:", error));
  };

  return (
    <div>
      <h1>Contract Management</h1>

      {/* Form for adding a new contract */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="contractNomer"
          placeholder="Contract Number"
          value={form.contractNomer}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={form.customerId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="adminId"
          placeholder="Admin ID (optional)"
          value={form.adminId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="helperId"
          placeholder="Helper ID (optional)"
          value={form.helperId}
          onChange={handleChange}
        />
        <button type="submit">Add Contract</button>
      </form>

      {/* Display list of contracts */}
      <ul>
        {contracts.map((contract) => (
          <li key={contract._id}>
            <strong>Number:</strong> {contract.contractNomer} <br />
            <strong>Customer:</strong> {contract.customerId} <br />
            <strong>Admin:</strong> {contract.adminId || "N/A"} <br />
            <strong>Helper:</strong> {contract.helperId || "N/A"} <br />
            <strong>Created At:</strong> {new Date(contract.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contracts;
