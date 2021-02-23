import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'
/**
 * 设置token
 * @param  {String} name 值
 * @param  {name} name 需要设置token的key，默认值为token
 * @return {Boolean, String} 返回tokey值
 */
export const setToken = (token, name = TOKEN_KEY) => {
  Cookies.set(name, token, {
    expires: process.env.NODE_ENV.VUE_APP_COOKIE_EXPIRES || 1
    // domain: '192.168.14.19',
    // path: '/'
  })
}

/**
 * 获取token
 * @param  {Array} name 需要获取token的key
 * @return {Boolean, String} 返回tokey值
 */
export const getToken = (name = TOKEN_KEY) => {
  const token = Cookies.get(name)
  if (token) return token
  else return false
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}


/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }
  return routePermissionJudge(routes)
}

/**
 * 递归改变状态
 * @param {Array} arr 需要处理的数组数据
 * @param {String} key 键值
 * @param {Boolean} val 改变后的值
 * @description 用户是否可跳转到该页
 */
export const recursiveStateChange = (arr, key, val) => {
  arr.forEach(item => {
    item[key] = val
    if (item.children) {
      recursiveStateChange(item.children, key, val)
    }
  })
}
