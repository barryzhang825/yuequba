// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const token='123'

export function hasToken() {
  if(localStorage.getItem('token')){
    return true
  }else {
    return false
  }
}
export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
}
