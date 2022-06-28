import axios from "axios";
axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api";
console.log("API URL: ", process.env.REACT_APP_API_URL);
