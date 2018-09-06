
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

//标记消息为已读
export const setReaded = params => { 
    return axios.post(`${baseUrl}/message/${id}/isRead`, qs.stringify({})).then(res => res.data);
}

//消息列表
export const msgList = params => { 
    return axios.get(`${baseUrl}/message/${params.id}/type/list`).then(res => res.data);
}

//按类型查询最新一条消息
export const newMsg = params => { 
    return axios.get(`${baseUrl}/message/${params.type}/type`).then(res => res.data);
}

//公告详情
export const msgDetail = params => { 
    return axios.get(`${baseUrl}/message/${params.id}/detail`).then(res => res.data);
}

