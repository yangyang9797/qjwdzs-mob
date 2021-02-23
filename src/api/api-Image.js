import UrlUtil from '../common/utils/url.js'
import request from '@ocv/web/src/http/request'
import config from '@ocv/web/src/config'

export const ApiImage = {
  // apiUrl_Image: UrlUtil.plus([window.location.href, config.baseurl, config.urls.file+ "file/"]),
  // apiUrl_File: config.api.file,

    apiUrl_Image:  config.urls.pm+"file/",

    list(opt) {
        return request({
            url: this.apiUrl_Image + 'list',
            method: 'post',
            params: opt // params
        })
    },
    deleteById(id) {
        return request({
            url: this.apiUrl_Image + 'deleteById',
            method: 'post',
            params: { id } // params
        })
    },

}
export default ApiImage
