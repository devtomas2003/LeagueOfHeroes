import axios from "axios";

export default {
    api: axios.create({
        baseURL: 'https://psw-server.onrender.com',
        timeout: 5000
    }),
    secret: 'zrtai',
    public: '28532'
}