import request from '@ocv/web/src/http/request'
import config from '@ocv/web/src/config'

export const ApiQjydcInstance = {
    apiUrl: config.urls.pm + 'qjydc/instance/',

    api_yummas_Url: config.urls.pm+ 'pub/yummas/',

    model_templet: {
        qjinid: '',
        qclid: '',
        qjincode: '',
        qjinname: '',
        qjintype: '',
        content: '',
        configs: '',
        description: '',
        cuserid: '',
        seqno: '',
        enable: '1'
    },
    getModel(opt) {
        return Object.assign({}, this.model_templet, opt)
    },
    save(opt) {
        return request({
            url: this.apiUrl + 'save',
            method: 'post',
            params: opt // params
        })
    },
    saveAll(opt) {
        return request({
            url: this.apiUrl + 'saveAll',
            method: 'post',
            data: opt // params
        })
    },
    deleteById(id) {
        return request({
            url: this.apiUrl + 'deleteById',
            method: 'post',
            params: {id} // params
        })
    },
    getById(id) {
        return request({
            url: this.apiUrl + 'getById',
            method: 'post',
            params: {id} // params
        })
    },
    list(opt) {
        return request({
            url: this.apiUrl + 'list',
            method: 'post',
            params: opt // params
        })
    },
    page(opt) {
        return request({
            url: this.apiUrl + 'page',
            method: 'post',
            params: opt // params
        })
    },
    pageWithCatalog(opt) {
        return request({
            url: this.apiUrl + 'pageWithCatalog',
            method: 'post',
            data: opt // params
        })
    },

    sendAuthCode(phoneNumber,qjinid) {
        return request({
            url: this.api_yummas_Url + 'sendAuthCode',
            method: 'post',
            params: {phoneNumber,qjinid} // params
        })
    },
}

export default ApiQjydcInstance
