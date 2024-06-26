import axios from 'axios';

const ffAxios = axios.create({
    baseURL: 'https://localhost:7086/api',
    timeout: 5000
});

// TODO write interceptor to handle bearer tokens
// TODO check interceptor for errors possibilities

export default ffAxios;
export const getRequest = async <T>(url: string, params?: object, aborter?: AbortController) => {
    const response = await ffAxios.get(`${url}`, { params: params, signal: aborter?.signal });
    return response.data as T;
}
