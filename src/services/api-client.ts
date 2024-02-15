import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    //baseURL: 'https://10.10.248.100',
    baseURL: 'https://localhost:3000',
});

export default apiClient;
