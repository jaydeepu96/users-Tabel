import axios from 'axios'

// base url 

const instance = axios.create({
    baseURL: "https://randomuser.me/api/?results=5000"
})

export default instance;