import React, { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "customer",
  });

  // Fetch customers from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to create new customer
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/customers", form)
      .then((response) => {
        setCustomers((prev) => [...prev, response.data]);
        setForm({ fullName: "", username: "", password: "", role: "customer" });
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  return (
    <div>
      <h1>Customer Management</h1>

      {/* Form for adding a new customer */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Display list of customers */}
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <strong>Name:</strong> {customer.fullName} <br />
            <strong>Username:</strong> {customer.username} <br />
            <strong>Role:</strong> {customer.role} <br />
            <strong>Created At:</strong>{" "}
            {new Date(customer.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
