
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

//短信验证码登录
export const codeLogin = params => { 
    return axios.post(`${baseUrl}/user/${params.mobile}/${params.code}/login`, qs.stringify({ type: params.type })).then(res => res.data);
}

//获取短信验证码
export const getMobileCode = params => { 
    return axios.post(`${baseUrl}/user/${params.mobile}/${params.code}/phoneCode`, qs.stringify({ type: params.type })).then(res => res.data);
}

//注册
export const regist = params => { 
    return axios.post(`${baseUrl}/user/register`, qs.stringify(params)).then(res => res.data);
}

//修改手机号
export const updateMobile = params => { 
    return axios.post(`${baseUrl}/user/edit/mobile/${params.mobile}/${params.code}`, qs.stringify({ type: params.type })).then(res => res.data);
}

//绑定手机号
export const bindMobile = params => { 
    return axios.post(`${baseUrl}/user/bind/mobile/${params.mobile}/${params.code}`, qs.stringify({ type: params.type })).then(res => res.data);
}

//手机号是否已注册
export const mobileIsRegistered = params => { 
    return axios.get(`${baseUrl}/user/mobile/registered`, { params: { mobile: params.mobile } }).then(res => res.data);
}

//账号密码登录
export const login = params => { 
    return axios.post(`${baseUrl}/user/password/login`, qs.stringify(params)).then(res => res.data);
}

//修改登录密码
export const updateLoginPsw = params => { 
    return axios.post(`${baseUrl}/user/edit/password`, qs.stringify(params)).then(res => res.data);
}

//重置登录密码
export const resetLoginPsw = params => { 
    return axios.post(`${baseUrl}/user/reset/password`, qs.stringify(params)).then(res => res.data);
}

