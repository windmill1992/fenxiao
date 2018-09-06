
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

//新增地址
export const saveAddress = params => { 
    return axios.post(`${baseUrl}/user/address/add`, qs.stringify(params)).then(res => res.data);
}

//修改地址
export const updateAddress = params => { 
    return axios.post(`${baseUrl}/user/address/edit`, qs.stringify(params)).then(res => res.data);
}

//删除地址
export const deleteAddress = params => { 
    return axios.post(`${baseUrl}/user/address/${params.id}/delete`, qs.stringify({})).then(res => res.data);
}

//地址列表
export const addressList = params => { 
    return axios.get(`${baseUrl}/user/address/list`, { params: params }).then(res => res.data);
}

//id查询地址信息
export const addressInfo = params => { 
    return axios.get(`${baseUrl}/user/address/${params.id}/detail`).then(res => res.data);
}

//设置默认地址
export const defaultAddress = params => { 
    return axios.post(`${baseUrl}/user/address/${params.id}/default`, qs.stringify({})).then(res => res.data);
}

//用户信息
export const userInfo = params => { 
    return axios.get(`${baseUrl}/user/info`).then(res => res.data);
}

//提交实名认证
export const realCert = params => { 
    return axios.post(`${baseUrl}/audit/submit/real`, qs.stringify(params)).then(res => res.data);
}


