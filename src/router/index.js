import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: resolve =>  require(['../view/index.vue'], resolve),
      meta: {
        title: '邀请客户'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: resolve =>  require(['../view/index.vue'], resolve),
      meta: {
        title: '邀请客户'
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: resolve =>  require(['../404.vue'], resolve),
      meta: {
        title: '页面未找到'
      }
    },
    {
      path: '*',
      name: 'any',
      component: resolve =>  require(['../404.vue'], resolve),
      meta: {
        title: '页面未找到'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve =>  require(['../view/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/loginByMobile',
      name: 'loginByMobile',
      component: resolve =>  require(['../view/loginByMobile.vue'], resolve),
      meta: {
        title: '验证码登录'
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: resolve =>  require(['../view/inviteCustomer.vue'], resolve),
      meta: {
        title: '邀请客户'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: resolve =>  require(['../view/user.vue'], resolve),
      meta: {
        title: '个人资料'
      }
    },
    {
      path: '/address',
      name: 'address',
      component: resolve =>  require(['../view/address.vue'], resolve),
      meta: {
        title: '新增收货地址'
      }
    },
    {
      path: '/updateMobile',
      name: 'updateMobile',
      component: resolve =>  require(['../view/updateMobile.vue'], resolve),
      meta: {
        title: '修改手机号'
      }
    },
    {
      path: '/bindMobile',
      name: 'bindMobile',
      component: resolve =>  require(['../view/bindMobile.vue'], resolve),
      meta: {
        title: '绑定手机号'
      }
    },
    {
      path: '/inviteDistribution',
      name: 'inviteDistribution',
      component: resolve =>  require(['../view/inviteDistribution.vue'], resolve),
      meta: {
        title: '邀请分销客户'
      }
    },
    {
      path: '/shareReg',
      name: 'shareReg',
      component: resolve =>  require(['../view/shareReg.vue'], resolve),
      meta: {
        title: '注册会员'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve =>  require(['../view/register.vue'], resolve),
      meta: {
        title: '申请注册'
      }
    },
    {
      path: '/qualifacationCert',
      name: 'qualifacationCert',
      component: resolve =>  require(['../view/qualifacationCert.vue'], resolve),
      meta: {
        title: '资格认证'
      }
    },
    {
      path: '/certSuccess',
      name: 'certSuccess',
      component: resolve =>  require(['../view/certSuccess.vue'], resolve),
      meta: {
        title: '认证成功'
      }
    },
    {
      path: '/certification',
      name: 'certification',
      component: resolve =>  require(['../view/certification.vue'], resolve),
      meta: {
        title: '实名认证'
      }
    },
    {
      path: '/orderArea',
      name: 'orderArea',
      component: resolve =>  require(['../view/orderArea.vue'], resolve),
      meta: {
        title: '订货区'
      }
    },
    {
      path: '/orderSure',
      name: 'orderSure',
      component: resolve =>  require(['../view/orderSure.vue'], resolve),
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/purchaseOrder',
      name: 'purchaseOrder',
      component: resolve =>  require(['../view/purchaseOrder.vue'], resolve),
      meta: {
        title: '进货单'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: resolve =>  require(['../view/detail.vue'], resolve),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: resolve =>  require(['../view/recharge.vue'], resolve),
      meta: {
        title: '充值'
      }
    },
    {
      path: '/withdrawCash',
      name: 'withdrawCash',
      component: resolve =>  require(['../view/withdrawCash.vue'], resolve),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/myStock',
      name: 'myStock',
      component: resolve =>  require(['../view/myStock.vue'], resolve),
      meta: {
        title: '我的库存'
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: resolve =>  require(['../view/orders.vue'], resolve),
      meta: {
        title: '分销客户的订货订单'
      }
    },
    {
      path: '/exchangeZone',
      name: 'exchangeZone',
      component: resolve =>  require(['../view/exchangeZone.vue'], resolve),
      meta: {
        title: '换发货区'
      }
    },
    {
      path: '/exchangeRecord',
      name: 'exchangeRecord',
      component: resolve =>  require(['../view/exchangeRecord.vue'], resolve),
      meta: {
        title: '换货记录'
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: resolve =>  require(['../view/exchange.vue'], resolve),
      meta: {
        title: '换货'
      }
    },
    {
      path: '/customers',
      name: 'customers',
      component: resolve =>  require(['../view/customers.vue'], resolve),
      meta: {
        title: '分销客户'
      }
    },
    {
      path: '/monthlyPoint',
      name: 'monthlyPoint',
      component: resolve =>  require(['../view/monthlyPoint.vue'], resolve),
      meta: {
        title: '分销客户月度积分情况'
      }
    },
    {
      path: '/report',
      name: 'report',
      component: resolve =>  require(['../view/report.vue'], resolve),
      meta: {
        title: '报表中心'
      }
    },
    {
      path: '/offlineRetail',
      name: 'offlineRetail',
      component: resolve =>  require(['../view/offlineRetail.vue'], resolve),
      meta: {
        title: '线下零售'
      }
    },
    {
      path: '/addrManage',
      name: 'addrManage',
      component: resolve =>  require(['../view/addrManage.vue'], resolve),
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: resolve =>  require(['../view/wallet.vue'], resolve),
      meta: {
        title: '我的钱包'
      }
    },
    {
      path: '/dynamicPoint',
      name: 'dynamicPoint',
      component: resolve =>  require(['../view/dynamicPoint.vue'], resolve),
      meta: {
        title: '动销积分'
      }
    },
    {
      path: '/ownPoint',
      name: 'ownPoint',
      component: resolve =>  require(['../view/ownPoint.vue'], resolve),
      meta: {
        title: '自有积分'
      }
    },
    {
      path: '/inventoryIndex',
      name: 'inventoryIndex',
      component: resolve =>  require(['../view/inventoryIndex.vue'], resolve),
      meta: {
        title: '库存指数'
      }
    },
    {
      path: '/notice',
      name: 'notice',
      component: resolve =>  require(['../view/notice.vue'], resolve),
      meta: {
        title: '重要公告'
      }
    },
    {
      path: '/notify',
      name: 'notify',
      component: resolve =>  require(['../view/notify.vue'], resolve),
      meta: {
        title: '通知中心'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve =>  require(['../view/setting.vue'], resolve),
      meta: {
        title: '设置'
      }
    },
    {
      path: '/forgetTradePsw',
      name: 'forgetTradePsw',
      component: resolve =>  require(['../view/forgetTradePsw.vue'], resolve),
      meta: {
        title: '忘记交易密码'
      }
    },
    {
      path: '/resetPsw',
      name: 'resetPsw',
      component: resolve =>  require(['../view/resetPsw.vue'], resolve),
      meta: {
        title: '重置密码'
      }
    },
    {
      path: '/setTradePsw',
      name: 'setTradePsw',
      component: resolve =>  require(['../view/setTradePsw.vue'], resolve),
      meta: {
        title: '设置交易密码'
      }
    },
    {
      path: '/updateTradePsw',
      name: 'updateTradePsw',
      component: resolve =>  require(['../view/updateTradePsw.vue'], resolve),
      meta: {
        title: '修改交易密码'
      }
    },
    {
      path: '/updateLoginPsw',
      name: 'updateLoginPsw',
      component: resolve =>  require(['../view/updateLoginPsw.vue'], resolve),
      meta: {
        title: '修改登录密码'
      }
    },
    {
      path: '/tradePswManage',
      name: 'tradePswManage',
      component: resolve =>  require(['../view/tradePswManage.vue'], resolve),
      meta: {
        title: '交易密码管理'
      }
    },
    {
      path: '/loginPswManage',
      name: 'loginPswManage',
      component: resolve =>  require(['../view/loginPswManage.vue'], resolve),
      meta: {
        title: '登录密码管理'
      }
    },
  ]
})
