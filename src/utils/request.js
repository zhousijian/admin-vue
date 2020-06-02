import axios from "axios";

// 请求api域名,可以写在当前模式下(.env.development)
// const domain = "http://node.jasonclub.wang/api";
let domain = 'http://devapi.shadou.cn/'
// let domain = 'http://api.shadou.cn/v1/';

const   service = axios.create({
  baseURL: domain,
  timeout: 10000 ,// 请求过期时间
    headers:{
      'AUTHORIZATION':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJleHAiOjE1OTMxNTEzNzR9.sDbPtHxwMvN49nUX4wmZYDBqBfsM7NpnRyGt0HAY2dg'
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
