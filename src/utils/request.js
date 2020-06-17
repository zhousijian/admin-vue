import axios from "axios";

// 请求api域名,可以写在当前模式下(.env.development)
let domain = 'http://devapi.shadou.cn/'
// let domain = 'http://api.shadou.cn/';
// var linkurl = 'http://shadou.cn/'
// var linkurl = 'http://test.shadou.cn/'
var linkurl = 'http://127.0.0.1:5500/'
var url = window.location.search; //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    let strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
}
if (theRequest.vid){
    self.location.href = linkurl+'video.html?vid='+theRequest.vid
    history.pushState(null, null, document.URL);
}
if (theRequest.exit){
console.log("退出")
    localStorage.removeItem('jwt_token')
    self.location.href =linkurl+ 'index.html'
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    })

}
if (theRequest.jwt_token){
    localStorage.setItem('jwt_token',theRequest.jwt_token);
    var token = localStorage.getItem('jwt_token')
}else {

    if(localStorage.getItem('jwt_token')){
        var token = localStorage.getItem('jwt_token')
    }else{
        self.location.href = linkurl+'index.html'
    }
}

console.log(token)
//
// if (!localStorage.getItem('jwt_token')||theRequest.jwt_token){
//     console.log("有")
//     console.log(localStorage.getItem('jwt_token'))
//     self.location.href = theRequest.jwt_token
//         //
// }else {
//     console.log('没有')
// }

// console.log(localStorage.getItem('jwt_token'))
const   service = axios.create({
  baseURL: domain,
  timeout: 10000 ,// 请求过期时间
    headers:{
      'AUTHORIZATION':token
      //token
      //theRequest.jwt_token

          //
          //localStorage.getItem('jwt_token')
    //
    }

});

service.interceptors.request.use(
  config => {
    // 可以加入语言(i18n) 或者 header

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res
    // if (res) {
    //   // 处理非成功情况
    //   return Promise.reject(res);
    // } else {
    //   return res;
    // }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
