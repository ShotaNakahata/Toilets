// src/utils/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000' 
});

export default apiClient;
