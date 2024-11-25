// src/components/AddProduct.js
import React, { useState } from "react";
import { addProduct } from "../services/productService";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, quantity, price };
    await addProduct(productData);
    alert("Товар добавлен");
    setName("");
    setDescription("");
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div>
      <h2>Добавить товар</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddProduct;
