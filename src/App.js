import React, { useState } from "react";
import AddProduct from "./components/AddProduct"
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]); // State to hold products

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data.data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Управление инвентарем</h1>
      <AddProduct />
      <button onClick={fetchProducts}>Get Products</button>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {/* <td>{product._id}</td> */}
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{new Date(product.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
