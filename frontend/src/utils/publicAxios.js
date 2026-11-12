import axios from 'axios';

const publicAxios = axios.create({
  baseURL: 'https://cctvshoppee.onrender.com/api', // or your live backend URL
  headers: { 'Content-Type': 'application/json' }
});

export default publicAxios;
