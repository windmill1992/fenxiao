
import { baseUrl } from './baseUrl';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true;

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

//默认选择地址
export const selDefAddress = () => { 
    return axios.get(`${baseUrl}/user/address/default`).then(res => res.data);
}

//用户信息
export const userInfo = () => { 
    return axios.get(`${baseUrl}/user/info`).then(res => res.data);
}

//提交资质认证
export const certification = params => { 
    return axios.post(`${baseUrl}/yop/register/person`, qs.stringify(params)).then(res => res.data);
}

//注册易宝子商户授权
export const authorize = params => { 
    return axios.post(`${baseUrl}/yop/register/receive/authorize/num`, qs.stringify(params)).then(res => res.data);
}

//发送易宝验证码
export const sendYopCode = () => { 
    return axios.post(`${baseUrl}/yop/register/send/mer/sms/notify`, qs.stringify({})).then(res => res.data);
}

//重发易宝验证码
export const resendYopCode = params => { 
    return axios.post(`${baseUrl}/yop/register/send/authorize/num`, qs.stringify(params)).then(res => res.data);
}

//查询用户是否申请过资质认证
export const isUsercard = () => { 
    return axios.get(`${baseUrl}/audit/is/submit/usercard`).then(res => res.data);
}

//查询用户是否申请过提现资质
export const isReal = () => { 
    return axios.get(`${baseUrl}/audit/is/submit/real`).then(res => res.data);
}

//用户下面一阶、二阶信息
export const customers = params => { 
    return axios.get(`${baseUrl}/user/customers`, { params: params }).then(res => res.data);
}

//待审核用户列表
export const auditUsers = () => { 
    return axios.get(`${baseUrl}/user/audit/list`).then(res => res.data);
}

//待审核用户数量
export const auditUserNum = () => { 
    return axios.get(`${baseUrl}/user/center/myAuditState`).then(res => res.data);
}

//审核自己下阶用户-通过
export const auditPass = params => { 
    return axios.post(`${baseUrl}/user/audit/pass`, qs.stringify(params)).then(res => res.data);
}

//我的订货订单
export const myOrders = params => { 
    return axios.get(`${baseUrl}/user/center/myOrder`, { params: params }).then(res => res.data);
}

//我的交易记录
export const myTradeRecord = params => { 
    return axios.get(`${baseUrl}/user/center/myCapitalinout`, { params: params }).then(res => res.data);
}

//我的库存
export const myStock = params => { 
    return axios.get(`${baseUrl}/user/center/myStock`, { params: params }).then(res => res.data);
}

//经销中心
export const integral = params => { 
    return axios.get(`${baseUrl}/user/center/integral`, { params: params }).then(res => res.data);
}

//解绑微信
export const unbindWx = () => { 
    return axios.post(`${baseUrl}/wx/unbind`, qs.stringify({})).then(res => res.data);
}

//获取用户状态（是否绑定登录密码、交易密码、微信）
export const userState = () => { 
    return axios.get(`${baseUrl}/user/state`).then(res => res.data);
}

//一阶积分明细
export const firstPoint = params => { 
    return axios.get(`${baseUrl}/user/center/myFirstIntegral`, { params: params }).then(res => res.data);
}

//二阶积分明细
export const secondPoint = params => { 
    return axios.get(`${baseUrl}/user/center/mySecondIntegral`, { params: params }).then(res => res.data);
}

//自有积分明细
export const ownPoint = params => { 
    return axios.get(`${baseUrl}/user/center/myselfIntegral`, { params: params }).then(res => res.data);
}

//设置利润
export const setProfitValue = params => { 
    return axios.post(`${baseUrl}/user/center/profitValue`, qs.stringify(params)).then(res => res.data);
}

//邀请码
export const myCode = params => { 
    return axios.get(`${baseUrl}/user/center/myCode`, { params: params }).then(res => res.data);
}

//邀请人
export const inviter = params => { 
    return axios.get(`${baseUrl}/user/center/query/${params.code}`).then(res => res.data);
}

//订单详情
export const orderDetail = params => { 
    return axios.get(`${baseUrl}/user/center/myOrderDetail`, { params: params }).then(res => res.data);
}

//分销客户的订货订单
export const order2List = params => { 
    return axios.get(`${baseUrl}/user/center/myStockInfoList`, { params: params }).then(res => res.data);
}

//分销客户的订货订单详情
export const order2Detail = params => { 
    return axios.get(`${baseUrl}/user/center/myStockInfoDetail`, { params: params }).then(res => res.data);
}

//银行列表
export const bankList = () => { 
    return axios.get(`${baseUrl}/bank/list`).then(res => res.data);
}

//省市信息
export const cityInfo = params => { 
    return axios.post(`${baseUrl}/province/code`, qs.stringify(params)).then(res => res.data);
}

//查询支行列表
export const bankListInfo = params => { 
    return axios.get(`${baseUrl}/bank/list/info`, { params: params }).then(res => res.data);
}

//充值
export const recharge = params => { 
    return axios.post(`${baseUrl}/yoppay/reCharge`, qs.stringify(params)).then(res => res.data);
}

//设置微信号
export const setWxcode = params => { 
    return axios.post(`${baseUrl}/user/set/wechat`, qs.stringify(params)).then(res => res.data);
}

//查询用户银行卡
export const myBank = () => { 
    return axios.get(`${baseUrl}/user/bank`).then(res => res.data);
}

//更新用户银行卡
export const updateBank = params => { 
    return axios.post(`${baseUrl}/user/update/bank`, qs.stringify(params)).then(res => res.data);
}

//发货订单详情
export const shipInfo = params => { 
    return axios.get(`${baseUrl}/user/center/myReallyShipment`, { params: params }).then(res => res.data);
}

//发货列表
export const shipList = params => { 
    return axios.get(`${baseUrl}/user/center/myShipmentList`, { params: params }).then(res => res.data);
}

//发货确认订单
export const shipOrderList = params => { 
    return axios.get(`${baseUrl}/product/list/ids`, { params: params }).then(res => res.data);
}

//确认收货
export const confirmShip = params => { 
    return axios.post(`${baseUrl}/product/comfirm/goods`, qs.stringify(params)).then(res => res.data);
}

//余额充值申请,提现申请
export const cashApply = params => { 
    return axios.post(`${baseUrl}/withdraw/cash`, qs.stringify(params)).then(res => res.data);
}

//查询用户最新充值余额记录
export const userRechargeInfo = () => { 
    return axios.get(`${baseUrl}/withdraw/last`,).then(res => res.data);
}

//查询用户最新充值余额详情
export const rechargeInfo = params => { 
    return axios.get(`${baseUrl}/withdraw/${params.payNum}/detail`,).then(res => res.data);
}

//查询用户提现详情
export const withdrawInfo = params => { 
    return axios.get(`${baseUrl}/withdraw/reCharge/${params.payNum}/detail`,).then(res => res.data);
}

//我的补贴
export const myAllowance = params => { 
    return axios.get(`${baseUrl}/user/center/myTeamSaleList`, { params: params }).then(res => res.data);
}

//团队销量
export const teamSale = params => { 
    return axios.get(`${baseUrl}/user/center/myTeamSale`, { params: params }).then(res => res.data);
}

