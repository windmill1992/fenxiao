
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
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

//发货详情
export const shipInfo = params => { 
    return axios.get(`${baseUrl}/ship/info`, { params, params }).then(res => res.data);
}

//管理员发货
export const shipSend = params => { 
    return axios.post(`${baseUrl}/ship/send`, qs.stringify(params)).then(res => res.data);
}
