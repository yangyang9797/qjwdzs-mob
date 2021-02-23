import plugins from '../plugins'
import '../styles/index.less'
import components from '../components'
import views from '../views'

const map = plugins.ocvAdmin.putViews("OcvZhzwOcvZhzw", {...views, ...components})


/*window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx93bb64eca7ca153d&redirect_uri=http%3A%2F%2Fkjxx.cnovit.com%2Fqjydc%2Fmob%2Findex.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect'

console.info(window.location.href)
let code = window.location.href.split('?')
if (code[1]){
    code = code[1].split("&")
    for (let i = 0; i < code.length; i++) {
        if (code[i].indexOf("code=")!==-1){
            code =code[i]
            break
        }
    }
    code = code.substr(code.indexOf('=')+1)
    console.info('微信用户授权code', code)
    /!*    let  param= {
            code:code,
        }*!/
    $.ajax({
        url: "http://kjxx.cnovit.com/qjydc/pub/wx/getWxUserInfo?code="+code,
        method: "post",
        async: false,
        success: function (data) {
            console.log("微信授权",data);
        }
    });
}else {
    console.log("未获取到微信授权")
}*/



// 定义 install 方法
const install = function (Vue, opts = {}) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    // console.info("遍历并注册全局组件", map)
    Object.keys(map).forEach(key => {
        Vue.component(key, map[key]);
    });

}
export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...map,
    opts: {
        ...plugins.opts
    }
}
