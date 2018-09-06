
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

//产品列表
export const prodList = params => { 
    return axios.get(`${baseUrl}/product/list`).then(res => res.data);
}

//促销产品列表
export const salesProdList = params => { 
    return axios.get(`${baseUrl}/product/sales/list`).then(res => res.data);
}

