import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.1.73:3333',
    baseURL: 'http://10.0.0.104:3333',
})
export default api;
//json-server ./src/services/server.json --host 192.168.1.73 --port 3333