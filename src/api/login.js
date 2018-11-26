
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

let token = localStorage.getItem('token');
if(token == null) token = '';
axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'token': token,
}
axios.defaults.headers.get = {
    'token': token,
}
axios.defaults.withCredentials = true;

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
    return axios.post(`${baseUrl}/user/edit/mobile/${params.mobile}/${params.code}`, qs.stringify({ type: params.type, password: params.psw })).then(res => res.data);
}

//绑定手机号
export const bindMobile = params => { 
    return axios.post(`${baseUrl}/user/bind/mobile/${params.mobile}/${params.code}`, qs.stringify({ type: params.type })).then(res => res.data);
}

//手机号是否已注册--更换手机号
export const mobileIsRegistered = params => { 
    return axios.get(`${baseUrl}/user/mobile/registered`, { params: params}).then(res => res.data);
}

//手机号是否已注册--注册
export const isRegistered = params => { 
    return axios.get(`${baseUrl}/user/mobile/registered/invite`, { params: params}).then(res => res.data);
}

//手机号是否绑定微信--绑定
export const isBindWx = params => { 
    return axios.get(`${baseUrl}/user/mobile/bind/wx`, { params: params}).then(res => res.data);
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

//微信授权登录
export const wxlogin = params => { 
    return axios.post(`${baseUrl}/wx/login`, qs.stringify(params)).then(res => res.data);
}

//微信授权登录并绑定
export const wxBindLogin = params => { 
    return axios.post(`${baseUrl}/wx/bind`, qs.stringify(params)).then(res => res.data);
}

//退出登录
export const logout = () => { 
    return axios.post(`${baseUrl}/user/login/out`, qs.stringify({})).then(res => res.data);
}

//设置交易密码
export const setTradePsw = params => { 
    return axios.post(`${baseUrl}/user/transact/pwd/set`, qs.stringify(params)).then(res => res.data);
}

//修改交易密码
export const updateTradePsw = params => { 
    return axios.post(`${baseUrl}/user/transact/pwd/edit`, qs.stringify(params)).then(res => res.data);
}

//重置交易密码
export const resetTradePsw = params => { 
    return axios.post(`${baseUrl}/user/transact/pwd/forget`, qs.stringify(params)).then(res => res.data);
}

