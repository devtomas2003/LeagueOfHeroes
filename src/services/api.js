import axios from "axios";

export default {
    request: axios.create({
        baseURL: 'https://psw-server.onrender.com',
        timeout: 5000
    }),
    secret: import.meta.env.VITE_API_KEY,
    public: import.meta.env.VITE_STUDENT_ID
}