
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true;

//确认充值信息
export const recInfo = params => { 
    return axios.get(`${baseUrl}/withdraw/withdrawDetail`, { params: params }).then(res => res.data);
}

//资质审核信息
export const certInfo = params => { 
    return axios.get(`${baseUrl}/audit/realNameAuditDetail`, { params: params }).then(res => res.data);
}

//充值审核
export const recharge = params => { 
    return axios.post(`${baseUrl}/withdraw/reCharge`, qs.stringify(params)).then(res => res.data);
}

//资质审核
export const certification = params => { 
    return axios.post(`${baseUrl}/audit/customer/competency`, qs.stringify(params)).then(res => res.data);
}
