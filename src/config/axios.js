import axios from "axios"
export default axios.create({
 baseURL: "http://localhost:9000/"
//  baseURL: "https://backmant.herokuapp.com/"
})