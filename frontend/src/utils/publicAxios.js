import axios from 'axios';

const publicAxios = axios.create({
  baseURL: 'http://52.66.98.128:5001/api', // or your live backend URL
  headers: { 'Content-Type': 'application/json' }
});

export default publicAxios;
