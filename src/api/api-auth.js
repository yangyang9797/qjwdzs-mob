import request from '@ocv/web/src/http/request'
import config from '@ocv/web/src/config'


export const ApiAuth = {
    apiUrl: config.urls.auth,

    api_mob_Url: config.urls.pm+'mob/pub/',

    register(opt) {
        return request({
            url: config.urls.auth + 'register',
            method: 'post',
            params: opt // params
        })
    },

    modifyPassword(opt){
        return request({
            url: config.urls.pm +'mob/pub/updatePassword',
            method: 'get',
            params: opt // params
        })
    },

    selectUsername(opt) {
        return request({
            url: config.urls.pm + 'mob/pub/selectByUsername',
            method: 'get',
            params: opt // params
        })
    },

    login(opt) {
        return request({
            url: this.apiUrl + 'login',
            method: 'post',
            params: opt // params
        })
    },

    userBinding(opt) {
        return request({
            url: config.urls.pm + 'pub/auth/weixin/overt/userBinding',
            method: 'post',
            params: opt // params
        })
    },

    checkUserName(opt) {
        return request({
            url: this.api_mob_Url + 'login',
            method: 'post',
            params: opt // params
        })
    },
    sendCode(opt){
        return request({
            url: this.api_mob_Url + 'sendCode',
            method: 'get',
            params: opt // params
        })
    },
    getCurentUser(opt) {
        return request({
            url: this.apiUrl + 'getCurentUser',
            method: 'post',
            params: opt // params
        })
    },

}
export default ApiAuth
