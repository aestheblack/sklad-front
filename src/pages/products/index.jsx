import React, { useEffect, useState } from "react";

// Component to display the list of products
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchBarcode, setSearchBarcode] = useState("");

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle search by name
  const searchByName = async () => {
    if (searchName) {
      const response = await fetch(`/api/products/searchByName?name=${searchName}`);
      const result = await response.json();
      setProducts(result.data);
    } else {
      fetchProducts(); // Reset to all products if no name entered
    }
  };

  // Handle search by barcode
  const searchByBarcode = async () => {
    if (searchBarcode) {
      const response = await fetch(`/api/products/searchByBarcode?barCode=${searchBarcode}`);
      const result = await response.json();
      setProducts(result.data);
    } else {
      fetchProducts(); // Reset to all products if no barcode entered
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={searchByName}>Search by Name</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by barcode"
          value={searchBarcode}
          onChange={(e) => setSearchBarcode(e.target.value)}
        />
        <button onClick={searchByBarcode}>Search by Barcode</button>
      </div>

      {/* List of products */}
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={{ marginBottom: "20px" }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category?.name}</p>
              <p>Barcode: {product.barCode}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
