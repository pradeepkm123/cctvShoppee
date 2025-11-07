// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = (params) => axios.get(API_URL, { params });
export const getProduct = (id) => axios.get(`${API_URL}/${id}`);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.patch(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);