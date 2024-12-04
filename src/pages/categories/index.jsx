import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        // Create headers
        const headers = {
          "Content-Type": "application/json",
        };

        // If there's a token, add it to the Authorization header
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
          method: "GET",
          headers: headers,
        });

        // Check for any errors in the response
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Access the 'data' property from the response and update the state
        setCategories(data.data); // Update state with the 'data' array

      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchCategories(); // Call fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name} {/* Display the category name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
