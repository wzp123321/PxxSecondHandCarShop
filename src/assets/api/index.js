/**
 * 包含n个接口请求函数的模块
 */
import { getRequest, postRequest } from './ajax.js';

export default {
    $$path: {
        getdictionarybytypecode: '/dicmodule/dic/typecodelist',
        getcarassess: '/dicmodule/car/assess',
        getuserregister: '/usermodule/user/register',
        getuserlogin: '/usermodule/user/login',
        changepassword: '/usermodule/user/changepwd',
        getuserinfo: '/usermodule/user/info',
        updateuserinfo: '/usermodule/user/edit',
        getusercheckreal: '/usermodule/user/checkreal',
        getcarinsert: '/carmodule/car/insert',
        getDictionaryBytypecode: '/dicmodule/dic/list',
        getallcarslist: '/carmodule/car/list',
        getcarbysometype: '/carmodule/car/typelist',
        getcarinfo: '/carmodule/car/carinfo',
        getorderadd: '/ordermodule/order/insert',
        getuserownercar: '/usermodule/user/getowncar',
        getuserorder: '/usermodule/user/getorders',
        getuserlook: '/ordermodule/order/userlook',
        getuserpay: '/ordermodule/order/userpay',
        getsellersure: '/ordermodule/order/sellersure',
        getordercancel: '/ordermodule/order/cancel',
        getorderlist : '/ordermodule/order/list',
        getorderinfo :'/ordermodule/order/info',
    },
    getDicBytypeCode(params) {
        return getRequest(this.$$path.getdictionarybytypecode, params);
    },
    getDicAssess(params) {
        return postRequest(this.$$path.getcarassess, params);
    },
    getUserRegister(params) {
        return postRequest(this.$$path.getuserregister, params);
    },
    getUserLogin(params) {
        return postRequest(this.$$path.getuserlogin, params);
    },
    getUserPwdChange(params) {
        return postRequest(this.$$path.changepassword, params);
    },
    getUserInfo(params) {
        return getRequest(this.$$path.getuserinfo, params);
    },
    getUserUpdate(params) {
        return postRequest(this.$$path.updateuserinfo, params);
    },
    getUserCheckReal(params) {
        return getRequest(this.$$path.getusercheckreal, params);
    },
    getCarInsert(params) {
        return postRequest(this.$$path.getcarinsert, params);
    },
    getDictionaryBytypecode(params) {
        return getRequest(this.$$path.getDictionaryBytypecode, params);
    },
    getAllCarsList(params) {
        return getRequest(this.$$path.getallcarslist, params);
    },
    getCarbySometype(params) {
        return getRequest(this.$$path.getcarbysometype, params);
    },
    getCarInfo(params) {
        return getRequest(this.$$path.getcarinfo, params);
    },
    getOrderAdd(params) {
        return postRequest(this.$$path.getorderadd, params);
    },
    getUserOwnCar(params) {
        return getRequest(this.$$path.getuserownercar, params);
    },
    getUserOrders(params) {
        return getRequest(this.$$path.getuserorder, params);
    },
    getUserLook(params) {
        return postRequest(this.$$path.getuserlook, params)
    },
    getUserPay(params) {
        return postRequest(this.$$path.getuserpay, params)
    },
    getSellerSure(params) {
        return postRequest(this.$$path.getsellersure, params)
    },
    getCancelorder(params) {
        return postRequest(this.$$path.getordercancel, params)
    },
    getOrderList(params) {
        return getRequest(this.$$path.getorderlist, params);
    },
    getOrderInfo(params){
        return getRequest(this.$$path.getorderinfo, params);
    }
};