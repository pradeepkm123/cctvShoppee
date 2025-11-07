import axios from 'axios';

const publicAxios = axios.create({
  baseURL: 'http://localhost:5000/api', // or your live backend URL
  headers: { 'Content-Type': 'application/json' }
});

export default publicAxios;
