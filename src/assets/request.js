import axios from 'axios'
import config from '@/config/config.js'
const apiList = {
  register: {method: 'post', url: '/api/user'},
  login: {method: 'post', url: '/api/token'},
  logout: {method: 'delete', url: '/api/token', withCredentials: true}, // withCredentials代表请求带cookies
  log: {method: 'get', url: '/api/log', withCredentials: true},
  fileList: {method: 'get', url: '/api/fileList', withCredentials: true},
  findUser: {method: 'get', url: '/api/user/:name', withCredentials: true},
  addUser: {method: 'post', url: '/api/user/:name', withCredentials: true},
  postAvatar: {method: 'post', url: '/api/avatar', withCredentials: true},
  getImage: {method: 'get', url: '/api/image'},
  checkNoRepeat: {method: 'get', url: '/api/checkNoRepeat/:key/:value'},
  getUserList: {method: 'get', url: '/api/userList'},
  forgetPassword: {method: 'delete', url: '/api/password/email/:email'},
  deleteUser: {method: 'delete', url: '/api/user/:name', withCredentials: true},
  deleteFile: {method: 'delete', url: '/api/file/:uuid', withCredentials: true},
  changePassword: {method: 'put', url: '/api/password', withCredentials: true},
  changeNickName: {method: 'put', url: '/api/nickName', withCredentials: true},
  setEmail: {method: 'post', url: '/api/email', withCredentials: true}
}

function setAll (options) {
  // 设置baseURL
  if (config.baseURL) options.baseURL = config.baseURL
  // 开启 header里设置token
  if (config.headerToken) {
    let token = getTokenFromLocal()
    if (token) options.headers = {'token': token }
  }
}

function getTokenFromLocal () {
  return window.localStorage.getItem('token')
}

function setTokenToLocal (token) {
  window.localStorage.setItem('token', token)
}
/**
 * 用户注册
 *
 * @param {String} name 用户名
 * @param {String} password 密码
 * @returns {Promise}
 */
function register (name, password) {
  const data = {data: {name: name, password: password}}
  const options = Object.assign({}, apiList.register, data)
  setAll(options)
  return axios(options)
}

/**
 * 用户登陆
 *
 * @param {String} name 用户名
 * @param {String} password 密码
 * @returns {Promise}
 */
function login (name, password) {
  const data = {data: {name: name, password: password}}
  const options = Object.assign({}, apiList.login, data)
  setAll(options)
  return axios(options)
  .then(res => {
    // 如果要将token设置在header，则需在登陆时将token保存本地
    if (config.headerToken) setTokenToLocal(res.data.data.token)

    return Promise.resolve(res)
  })
}
/**
 * 退出登陆
 *
 * @returns
 */
function logout () {
  const options = apiList.logout
  setAll(options)
  return axios(options)
}

/**
 * GET 用户日志
 *
 * @returns {Promise}
 */
function log () {
  const options = apiList.log
  setAll(options)
  return axios(options)
}

/**
 * GET 用户文件列表
 *
 * @returns {Promise}
 */
function fileList () {
  const options = apiList.fileList
  setAll(options)
  return axios(options)
}

/**
 * 忘记密码，向邮箱发送用户名与新的随机密码
 *
 * @param {String} email 邮箱地址
 * @returns {Promise}
 */
function forgetPassword (email) {
  const options = Object.assign({}, apiList.forgetPassword)
  options.url = options.url.replace(/:email/, email)
  setAll(options)
  return axios(options)
}

/**
 * 管理员删除账号
 *
 * @param {String} name
 * @returns {Promise}
 */
function deleteUser (name) {
  const options = Object.assign({}, apiList.deleteUser)
  options.url = options.url.replace(/:name/, name)
  setAll(options)
  return axios(options)
}

/**
 * 用户删除文件
 *
 * @param {String} uuid
 * @returns {Promise}
 */
function deleteFile (uuid) {
  const options = Object.assign({}, apiList.deleteFile)
  options.url = options.url.replace(/:uuid/, uuid)
  setAll(options)
  return axios(options)
}

/**
 * 修改密码
 *
 * @param {String} password 旧密码
 * @param {String} newPassword 新密码
 * @returns {Promise}
 */
function changePassword (password, newPassword) {
  const data = {data: {password: password, newPassword: newPassword}}
  const options = Object.assign({}, apiList.changePassword, data)
  setAll(options)
  return axios(options)
}
/**
 * 设置邮箱地址
 *
 * @param {String} password 账号密码
 * @param {String} email 邮箱地址
 * @returns {Promise}
 */
function setEmail (password, email) {
  const data = {data: {password: password, email: email}}
  const options = Object.assign({}, apiList.setEmail, data)
  setAll(options)
  return axios(options)
}

/**
 * 修改昵称
 *
 * @param {String} nickName 昵称
 * @returns {Promise}
 */
function changeNickName (nickName) {
  const data = {data: {nickName: nickName}}
  const options = Object.assign({}, apiList.changeNickName, data)
  setAll(options)
  return axios(options)
}

/**
 * 检查没有重复值
 *
 * @param {String} key 键名 name,nick_name,email等值
 * @param {String} value 值
 * @returns {Promise}
 */
function checkNoRepeat (key, value) {
  const options = Object.assign({}, apiList.checkNoRepeat)
  options.url = options.url.replace(/:key/, key)
  options.url = options.url.replace(/:value/, value)
  setAll(options)
  // console.log(options.url)
  return axios(options)
}

/**
 * 管理员 获取用户列表
 *
 * @returns {Promise}
 */
function getUserList () {
  const options = apiList.getUserList
  setAll(options)
  return axios(options)
}

/**
 * 管理员 获取用户详细信息
 *
 * @returns {Promise}
 */
function findUser (name) {
  const options = Object.assign({}, apiList.findUser)
  options.url = options.url.replace(/:name/, name)
  setAll(options)
  return axios(options)
}

/**
 * 管理员 添加用户
 *
 * @returns {Promise}
 */
function addUser (name) {
  const options = Object.assign({}, apiList.addUser)
  options.url = options.url.replace(/:name/, name)
  setAll(options)
  return axios(options)
}

export default {
  register: register,
  login: login,
  logout: logout,
  log: log,
  fileList: fileList,
  forgetPassword: forgetPassword,
  changePassword: changePassword,
  setEmail: setEmail,
  changeNickName: changeNickName,
  checkNoRepeat: checkNoRepeat,
  getUserList: getUserList,
  deleteUser: deleteUser,
  deleteFile: deleteFile,
  findUser: findUser,
  addUser: addUser,
  getTokenFromLocal: getTokenFromLocal
}
