import $request from "../utils/request";

export function getInfo() {
  return $request({
    url: "/v1/user/douyin_user_info/", // 请求路径(path)
    method: "get" // 请求方式
  });
}

export function getPost(params) {
  return $request({
    url: "/info/post/",
    method: "post",
    params // 请求参数
  });
}

/*请求用户的比较数据*/
export function getuserdata() {
  return $request({
    url: "/v1/user/douyin_data_external/", // 请求路径(path)
    method: "get" // 请求方式
  });
}


/*获取用户*/
export function uservideo(params) {
  return $request({
    url: "/v1/user/video_list/", // 请求路径(path)
    method: "get" ,// 请求方式
    params,
  });
}
/*翻页使用*/
export function pagevideo(params) {
  return $request({
    url: "/v1/user/video_list/", // 请求路径(path)
    method: "get" ,// 请求方式
    params,
  });
}




/*获取用户*/
export function portrait() {
  return $request({
    url: "/v1/user/douyin_fans_data/", // 请求路径(path)
    method: "get" ,// 请求方式

  });
}
/*我的收藏*/
export function collget(params) {
  return $request({
    url: "/v1/user/favorite_video/", // 请求路径(path)
    method: "get" ,// 请求方式
    params,
  });
}
/*添加视频收藏*/
export function collPost(data) {
  return $request({
    url: "/v1/user/favorite_video/", // 请求路径(path)
    method: "POST" ,// 请求方式
    data,
  });
}

export function collDelete(data) {
  return $request({
    url: "/v1/user/favorite_video/", // 请求路径(path)
    method: "DELETE" ,// 请求方式
    data
  });
}

/*添加视频收藏*/
// export function collPost() {
//   return $request({
//     url: "/v1/user/favorite_video/", // 请求路径(path)
//     method: "POST" ,// 请求方式
//
//   });
// }

/*我的购物车*/
export function goocar() {
  return $request({
    url: "/v1/shop_car/car/", // 请求路径(path)
    method: "get" ,// 请求方式

  });
}

/*勾选视频*/
export function selvideo(data) {
  return $request({
    url: "/v1/shop_car/car/", // 请求路径(path)
    method: "put" ,// 请求方式
    data
  });
}

/*删除购物车*/
export function carDelete(data) {
  return $request({
    url: "/v1/shop_car/car/", // 请求路径(path)
    method: "DELETE" ,// 请求方式
    data
  });
}


/*用户平台信息*/
export function userinfo() {
  return $request({
    url: "/v1/user/user_info/", // 请求路径(path)
    method: "get" ,// 请求方式
  });
}

/*用户平台信息修改*/
export function infoamend(data) {
  return $request({
    url: "/v1/user/user_info/", // 请求路径(path)
    method: "put" ,// 请求方式
    data,
  });
}


/*行业列表接口*/
export function industry() {
  return $request({
    url: "/v1/video/industry_category/", // 请求路径(path)
    method: "get" ,// 请求方式
  });
}

/*邮箱发送验证码*/
export function femail(params) {
  return $request({
    url: "/v1/user/code_email/", // 请求路径(path)
    method: "get" ,// 请求方式
    params
  });
}
/*手机验证码*/
export function phoneCode(params) {
  return $request({
    url: "/v1/user/code_phone/", // 请求路径(path)
    method: "get" ,// 请求方式
    params
  });
}


/*查询收货地址*/
export function seladdress() {
  return $request({
    url: "/v1/user/address/", // 请求路径(path)
    method: "get" ,// 请求方式

  });
}

/*修改收货地址*/
export function amendaddress(params={},data) {
  return $request({
    url: `/v1/user/address/${params.address_id}/`, // 请求路径(path)
    method: "put" ,// 请求方式
    data,
  });
}


/*删除地址*/
export function deleteadrs(params={}) {
  return $request({
    url: `/v1/user/address/${params.id}/`, // 请求路径(path)
    method: "DELETE" ,// 请求方式
  });
}

export function Addrss(data) {
  return $request({
    url: "/v1/user/address/", // 请求路径(path)
    method: "post" ,// 请求方式
    data,
  });
}

//地区列表
export function address(params) {
  return $request({
    url: "/v1/guest_ark/area/", // 请求路径(path)
    method: "get" ,// 请求方式
    params,
  });
}


//订单页
/*提交订单*/
export function present(data) {
  return $request({
    url: "/v1/order/", // 请求路径(path)
    method: "post" ,// 请求方式
    data
  });
}





/*查询订单*/
export function selorder() {
  return $request({
    url: "/v1/order/", // 请求路径(path)
    method: "get" ,// 请求方式

  });
}


/*订单详情接口*/
export function orderinfo(params) {
  return $request({
    url: `/v1/order/${params.id}/`, // 请求路径(path)
    method: "get" ,// 请求方式
  });
}

/*取消订单*/
export function cancelord(params,data) {
  return $request({
    url: `/v1/order/${params.id}/`, // 请求路径(path)
    method: "PUT" ,// 请求方式
    data,
  });
}


/*支付*/
export function paymoney(params) {
  return $request({
    url: '/v1/pay/order/ali/web/', // 请求路径(path)
    method: "GET" ,// 请求方式
    params,
  });
}


