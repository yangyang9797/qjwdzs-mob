import request from '@ocv/web/src/http/request'
import config from '@ocv/web/src/config'

export const ApiSend = {
  apiUrl: config.urls.pm + 'qjwdzs/',

  list(opt) {
    return request({
      url: this.apiUrl + 'list',
      method: 'post',
      params: opt // params
    })
  },

  saveQlr(opt) {
    return request({
      url: this.apiUrl + 'obligee/save',
      method: 'get',
      params: opt // params
    })
  },

  saveHome(opt) {
    return request({
      url: this.apiUrl + 'home/save',
      method: 'get',
      params: opt // params
    })
  },

  saveZjd(opt) {
    return request({
      url: this.apiUrl + 'homestead/save',
      method: 'get',
      params: opt // params
    })
  },

  deleteByid(opt) {
    return request({
      url: this.apiUrl + 'obligee/deleteById',
      method: 'get',
      params: opt // params
    })
  },

  deleteNull(opt) {
    return request({
      url: this.apiUrl + 'obligee/deleteNullData',
      method: 'get',
      params: opt // params
    })
  },
  
  // saveObligeeAndOthers
  saveOther(opt) {
    return request({
      url: this.apiUrl + 'obligee/saveObligeeAndOthers',
      method: 'get',
      params: opt // params
    })
  },
  

  sendDczt(opt) {
    return request({
      url: this.apiUrl + 'obligee/setDCZT',
      method: 'get',
      params: opt // params
    })
  },

}


export default ApiSend
