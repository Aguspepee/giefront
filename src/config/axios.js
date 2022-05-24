import axios from "axios"
export default axios.create({
 //baseURL: "http://localhost:9000/"
 //baseURL: "http://195.179.193.227/api/"
 baseURL: process.env.REACT_APP_BACKEND_URL
//  baseURL: "https://backmant.herokuapp.com/"
})