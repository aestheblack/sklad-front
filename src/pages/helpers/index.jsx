import React, { useState, useEffect } from "react";
import axios from "axios";

const Helper = () => {
  const [helpers, setHelpers] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "helper",
  });

  // Загрузка данных с backend  
  useEffect(() => {
    axios
      .get("http://localhost:5000/helpers") // Убедитесь, что путь API правильный
      .then((response) => setHelpers(response.data))
      .catch((error) => console.error("Error fetching helpers:", error));
  }, []);

  // Обновление данных формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Отправка данных формы
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/helpers", form) // Убедитесь, что путь API правильный
      .then((response) => {
        setHelpers((prev) => [...prev, response.data]);
        setForm({ fullName: "", username: "", password: "", role: "helper" });
      })
      .catch((error) => console.error("Error adding helper:", error));
  };

  return (
    <div>
      <h1>Helper Management</h1>
      {/* Форма добавления нового Helper */}
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
        <button type="submit">Add Helper</button>
      </form>

      {/* Список всех Helpers */}
      <ul>
        {helpers.map((helper) => (
          <li key={helper._id}>
            {helper.fullName} - {helper.username} ({helper.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Helper;
