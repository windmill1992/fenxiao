
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true;

//产品列表
export const prodList = params => { 
    return axios.get(`${baseUrl}/product/list`, { params: params }).then(res => res.data);
}

//促销产品列表
export const salesProdList = params => { 
    return axios.get(`${baseUrl}/product/sales/list`, { params: params }).then(res => res.data);
}

//产品详情
export const prodDetail = params => { 
    return axios.get(`${baseUrl}/product/${params.id}/detail`).then(res => res.data);
}

//促销产品详情
export const prodDetail2 = params => { 
    return axios.get(`${baseUrl}/product/sales/${params.id}/detail`).then(res => res.data);
}

//进货单产品信息
export const prodInfo = params => { 
    return axios.get(`${baseUrl}/order/orderListOne`, { params: params }).then(res => res.data);
}

//进货单产品操作
export const prodPurchase = params => { 
    return axios.get(`${baseUrl}/order/orderListTwo`, { params: params }).then(res => res.data);
}

//生成订单
export const order = params => { 
    return axios.post(`${baseUrl}/free/create/order`, qs.stringify(params)).then(res => res.data);
}

//生成促销订单
export const salesOrder = params => { 
    return axios.post(`${baseUrl}/free/create/sales/order`, qs.stringify(params)).then(res => res.data);
}

//订货
export const orderGoods = params => { 
    return axios.post(`${baseUrl}/free/order/goods`, qs.stringify(params)).then(res => res.data);
}

//促销订货
export const salesOrderGoods = params => { 
    return axios.post(`${baseUrl}/free/order/sales/goods`, qs.stringify(params)).then(res => res.data);
}

//取消或完成分销订单
export const cancelOrder2 = params => { 
    return axios.post(`${baseUrl}/free/finish/order`, qs.stringify(params)).then(res => res.data);
}

//取消或完成订单
export const cancelOrder = params => { 
    return axios.post(`${baseUrl}/order/cancel`, qs.stringify(params)).then(res => res.data);
}

//查询余额
export const getBalance = params => { 
    return axios.get(`${baseUrl}/user/balance`, { params: params }).then(res => res.data);
}

