import request from '@ocv/web/src/http/request'
import config from '@ocv/web/src/config'


export const ApiSearch = {
  apiUrl: config.urls.pm,

  api_obligee_Url: config.urls.pm + 'qjwdzs/obligee/',

  toDayInfo(opt) {
    return request({
      url: this.api_obligee_Url + 'todayInfo',
      method: 'get',
      params: opt // params
    })
  },

  lackInfo(opt) {
    return request({
      url: this.api_obligee_Url + 'lackInfo',
      method: 'get',
      params: opt // params
    })
  },

  allInfo(opt) {
    return request({
      url: this.api_obligee_Url + 'allInfo',
      method: 'get',
      params: opt // params
    })
  },

  qlrData(opt) {
    return request({
      url: this.api_obligee_Url + 'selectByQLRId',
      method: 'get',
      params: opt // params
    })
  },

  searchInfo(opt) {
    return request({
      url: this.api_obligee_Url + 'selectByName',
      method: 'get',
      params: opt // params
    })
  },


}
export default ApiSearch
