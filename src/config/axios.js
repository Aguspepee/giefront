import axios from "axios"
export default axios.create({
 //baseURL: "http://localhost:9000/"
 baseURL: process.env.REACT_APP_BACKEND_URL
})