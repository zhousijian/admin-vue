
<template>
  <div class="body">



    <div class="content">
      <div class="title_top">订单详情</div>
      <div class="state">
        <div class="sta_con" v-for="item in dataList.status_dict_list">
          <div class="sta_title">{{item.name}}</div>
          <div class="sta_bg">
          <div class="img">
            <img v-if="item.is_light" src="../images/zend.png">
            <img v-else src="../images/zing.png">
          </div>
          <div v-if="item.is_light" class="line"></div>
          <div v-else class="line_x"></div>
          </div>
        </div>

      </div>

      <div class="order_tip">当前订单状态:  <span>{{dataList.detail_status_name}}</span>
      <span class="settime" v-if="dataList.padn&&dataList.status==1">剩余支付时间{{dataList.timeg}}</span>
      </div>
      <div class="order_info">
        <div class="order_tip">订单信息</div>
        <div class="user_info">
          <div class="info name"><span class="name_left">收货人：</span><span>{{dataList.delivery_name}}</span></div>
          <div class="info phone"><span class="name_left">联系电话：</span><span>{{dataList.delivery_phone}}</span></div>
          <div class="info addrs"><span class="name_left">拍摄地址：</span><span>{{dataList.delivery_address}}</span></div>
          <div class="info email">
            <span class="name_left">收件邮箱：</span><span>{{dataList.delivery_email}}</span>
          </div>
          <div class="info number">
            <span class="name_left">订单号：</span>
            <span>{{dataList.order_number}}</span>
          </div>
          <div class="info time">
            <span class="name_left">下单时间：</span>
            <span>{{dataList.create_time}}</span></div>
          <div class="info money">
            <span class="name_left">支付金额：</span>
            <span class="color_i">￥{{dataList.amount}}</span><span>({{dataList.orderpay__pay_method}})</span>
          </div>
          <div class="info cancel_time" v-if="dataList.status==2">
            <span class="name_left">支付时间：</span><span>{{dataList.pay_time}}</span>
          </div>
          <div class="info confirm" v-if="dataList.status==3">
            <span class="name_left">审核时间：</span><span>{{dataList.audit_time}}</span>
          </div>
          <div class="info confirm" v-if="dataList.status==4">
            <span class="name_left">发送时间：</span><span>{{dataList.sent_time}}</span>
          </div>
          <div class="info confirm" v-if="dataList.status==5">
            <span class="name_left">完成时间：</span><span>{{dataList.confirm_time}}</span>
          </div>
          <div class="info confirm" v-if="dataList.status==6">
            <span class="name_left">取消时间：</span><span>{{dataList.cancel_time}}</span>
          </div>
<!--          <div class="info confirm" v-if="dataList.status==0">-->
<!--            <span class="name_left">失效时间：</span><span>{{dataList.cancel_time}}</span>-->
<!--          </div>-->

        </div>
      </div>

      <div class="order_goods" >
        <div class="goods_title">
          <div class="goods_info">商品信息</div>
          <div class="goods_type">商品类型</div>
          <div class="goods_money">单价</div>
        </div>
        <div class="goods" v-for="item in dataList.order_good_values">
          <div class="goods_info">
            <div class="img">
              <img :src="item.video_img_url">
            </div>
            <div class="cont">
              <div class="name">
                {{item.video_title}}
              </div>
              <div class="author">作者：{{item.user_nickname}}</div>
            </div>
          </div>
          <div class="goods_type">
            <div class="order_type">{{item.server_type_name}}</div>
          </div>
          <div class="goods_money">
            <div class="number">¥{{item.price}}</div>
          </div>
        </div>
      </div>

      <div class="bottom_cont">
        <div class="buy_type"></div>
        <div class="statistics">
          <div class="tip">
            共选择<span>{{dataList.quantity}}</span>创意剧本，<span>{{numx}}</span>视频拍摄
          </div>
          <div class="money">
            总价：<span><span>￥</span>{{dataList.amount}}</span>
          </div>
          <div class="btn_buy" @click="paymoneyx" v-if="dataList.status==1">支付</div>
        </div>
      </div>
    </div>

    <div id="qrcode" ref="qrcode" style="width: 300px;height: 300px"></div>
  </div>
</template>

<script>
  import {  orderinfo,paymoney } from "../apis/info";

export default {
  name: "orderdetails",
  data(){
    return{
      dataList:[],
      numx:0
    }

  },
  mounted() {
    console.log(this.$route.params)
    // let id = this.$route.params.id
    var id = sessionStorage.getItem('id');

    this.select(id)

    // this.myIndex = this.$route.params.msgKey
  },
  methods:{
    /*处理倒计时*/
    add0(m){return m<10?'0'+m:m },
    setTimex(e){
      let that =this

      let time =setInterval(function () {
        let list = e
        let datatime = new Date().getTime()
        let clatime = list.expiration_time*1000-datatime
        if(clatime<=0){
          list.padn=false
          clearInterval (time)
        }else {

        }
        var hours = parseInt((clatime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((clatime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = parseInt((clatime % (1000 * 60)) / 1000);
        let timeg=that.add0(hours)+':'+that.add0(minutes)+':'+that.add0(seconds)
        list.timeg = timeg
        console.log(list)

        that.dataList=list
        // console.log(that.orderList)
        // console.log(that.orderList)
        // console.log("============================")
      },1000)


    },


    /*支付*/
    paymoneyx(){

        let data = {
          order_id:sessionStorage.getItem('id')
        }

        console.log(data)


        paymoney(data).then(res=>{
          let link = res.pay_url
          console.log(link)
          // this.$router.push({path: link})
          window.open(link)
        }).catch(err=>{

        })

    },
    select(e){
      let data = {
        id:e
      }
      orderinfo(data).then(res=>{
        console.log(res)
        res['padn']=true
        res['timeg']=''
        this.dataList = res
          let numx = 0
        for (let i in res.order_good_values){
          if (res.order_good_values[i].server_type==1){
            numx = numx+1
          }

        }
        this.numx= numx

        this.setTimex(res)
      }).catch(err=>{

      })
    }

  }

};
</script>
<style lang="scss" scoped>
  @import "../scss/orderdetails.scss";
</style>
