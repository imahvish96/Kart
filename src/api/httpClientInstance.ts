import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://fakestoreapi.com/", // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    // Add any default headers (e.g., authorization tokens)
  },
});

export default httpClient;
