
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true;

//上传图片
export const uploadImage = params => { 
    return axios.post(`${baseUrl}/file/upload/image`, params, { headers:{'Content-Type': 'multipart/form-data'} }).then(res => res.data);
}

//删除文件
export const deleteFile = params => { 
    return axios.post(`${baseUrl}/file/delete`, qs.stringify(params)).then(res => res.data);
}

