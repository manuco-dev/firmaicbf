import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'https://firmacorp-firma-corp.up.railway.app/'
})

export default clienteAxios;