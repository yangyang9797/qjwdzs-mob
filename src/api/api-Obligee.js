import request from '@ocv/web/src/http/request'
import config from '@ocv/web/src/config'

export const ApiObligee = {
  apiUrl: config.urls.pm+ 'qjydc/obligee/',

  model_templet: {
      oblid: '',
      wtname:'',
      wtidcard:'',
      yqlrgx:'',
      // fwybm:'',
      fwdz:'',
      xqdz:'',
      zjdly:'',
      djlx:'',
      sfwtzj:0,
      sfwc:0,
      qjinid: '',
      fwybm:'',
      oblname: '',
      oblage: '',
      obladdress: '',
      oblcode:'',
      isdel: '',
      obltype: '',
      description: '',
      status: '',
      ctime: '',
      enable: '1',
      certificatetype: '',
      certificatenumber: '',
      publicstate:'',
      userid:'',
      lat:'',
      lng:'',
      mobile:''
  },
    getModel(opt) {
        return Object.assign({}, this.model_templet, opt)
    },
    list(opt) {
        return request({
            url: this.apiUrl + 'list',
            method: 'post',
            params: opt // params
        })
    },
    save(opt) {
        return request({
            url: this.apiUrl + 'save',
            method: 'post',
            params: opt // params
        })
    },
    saveObj(opt) {
        return request({
            url: this.apiUrl + 'saveObj',
            method: 'post',
            params: opt // params
        })
    },

    getById(id) {
        return request({
            url: this.apiUrl + 'getById',
            method: 'post',
            params: {id} // params
        })
    },



}


export default ApiObligee
