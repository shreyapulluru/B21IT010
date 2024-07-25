const express = require('express');
const axios = require('axios');
//import express from "express";
//import axios from "axios";

const app = express();
const port = 3000;

const testServerAPI = 'http://20.244.56.144/test';

// Helper function to fetch products
const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
  const url = `${testServerAPI}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const response = await axios.get(url);
  return response.data;
};

// Register endpoint (simulated)
app.post('/register', (req, res) => {
  res.json({ message: 'Registration done' });
});

// Get top N products in a category with a price range
app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top = 10, minPrice = 0, maxPrice = 10000, sortBy, company = 'FLP' } = req.query;

  try {
    const products = await fetchProducts(company, categoryname, top, minPrice, maxPrice);

    // Optionally sort products based on query parameters
    if (sortBy) {
      products.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product details
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const url = `${testServerAPI}/companies/FLP/categories/${categoryname}/products/${productid}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxODkwMjc2LCJpYXQiOjE3MjE4ODk5NzYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM0ZTQ0OGQzLWU3ZWItNDQ0NS05Yzk3LTEwMGQzOThjZDdlOCIsInN1YiI6ImIyMWl0MDEwQGtpdHN3LmFjLmluIn0sImNvbXBhbnlOYW1lIjoia2FrYXRpeWEgaW5zdGl0dXRlIG9mIHRlY2hub2xvZ3kgYW5kIHNjaWVuY2UiLCJjbGllbnRJRCI6ImM0ZTQ0OGQzLWU3ZWItNDQ0NS05Yzk3LTEwMGQzOThjZDdlOCIsImNsaWVudFNlY3JldCI6Im5BZW9YWlJOWkVNVUZPZUsiLCJvd25lck5hbWUiOiJTaHJleWEiLCJvd25lckVtYWlsIjoiYjIxaXQwMTBAa2l0c3cuYWMuaW4iLCJyb2xsTm8iOiJiMjFpdDAxMCJ9.LBBaShlJXSHRa2s8QRpxgOJPFZjfP-81aR18Iar9hSg`
        }
        });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
