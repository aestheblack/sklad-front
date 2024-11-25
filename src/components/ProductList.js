import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div>
      <h2>Список товаров</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.quantity} шт. - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
