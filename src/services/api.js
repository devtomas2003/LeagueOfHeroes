import axios from "axios";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

export default {
    api: axios.create({
        baseURL: 'https://psw-server.onrender.com',
        timeout: 5000
    }),
    secret: env.API_KEY,
    public: '28532'
}