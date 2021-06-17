import axios from "axios";

const SmartStockAPI = axios.create({
    baseURL: 'http://localhost:8080'
});

export default SmartStockAPI;