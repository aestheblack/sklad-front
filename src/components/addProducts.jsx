import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    barCode: "",
    quantity: 0,
    price: 0,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      if (result.data) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          category: "",
          barCode: "",
          quantity: 0,
          price: 0,
        });
      } else {
        alert("Error adding product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category ID"
          value={product.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="barCode"
          placeholder="Barcode"
          value={product.barCode}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
