
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

      <div class="order_tip">当前订单状态:  <span>{{dataList.detail_status_name}}</span></div>
      <div class="order_info">
        <div class="order_tip">订单信息</div>
        <div class="user_info">
          <div class="info name">收货人：<span>{{dataList.delivery_name}}</span></div>
          <div class="info phone">联系电话：<span>{{dataList.delivery_phone}}</span></div>
          <div class="info addrs">拍摄地址：<span>{{dataList.delivery_address}}</span></div>
          <div class="info email">
            收件邮箱：<span>{{dataList.delivery_email}}</span>
          </div>
          <div class="info number">订单号：<span>{{dataList.order_number}}</span></div>
          <div class="info time">下单时间：<span>{{dataList.create_time}}</span></div>
          <div class="info money">
            支付金额：<span class="color_i">￥{{dataList.amount}}</span><span>({{dataList.orderpay__pay_method}})</span>
          </div>
          <div class="info cancel_time" v-if="dataList.sent_time">
            发送时间：<span>{{dataList.sent_time}}</span>
          </div>
          <div class="info confirm" v-if="dataList.confirm_time">
            确认交付：<span>{{dataList.confirm_time}}</span>
          </div>
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
            共选择<span>3</span>创意剧本，<span>10</span>视频拍摄
          </div>
          <div class="money">
            总价：<span><span>￥</span>{{dataList.amount}}</span>
          </div>
          <div class="btn_buy" @click="paymoneyx" v-if="dataList.status_name=='提交订单'">支付</div>
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
      dataList:[]
    }

  },
  mounted() {
    console.log(this.$route.params)
    // let id = this.$route.params.id
    var id = sessionStorage.getItem('id');
    console.log(id)
    console.log(typeof (id))
    this.select(id)
    console.log(id)


    // this.myIndex = this.$route.params.msgKey
  },
  methods:{
    /*处理倒计时*/
    add0(m){return m<10?'0'+m:m },
    setTimex(e){
      let that =this

      setInterval(function () {
        let list = e
        for (let i in list){
          let datatime = new Date().getTime()
          let clatime = list[i].expiration_time*1000-datatime
          if (clatime>0){
            if (clatime<=1000){
              that.selectorder()
            }
            var hours = parseInt((clatime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((clatime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = parseInt((clatime % (1000 * 60)) / 1000);
            let timeg=that.add0(hours)+':'+that.add0(minutes)+':'+that.add0(seconds)
            list[i].timeg = timeg
          }else {
            list[i].expiration_time = 0
          }
          // that.clickBtn(list[i])

        }
        that.orderList=list
        // console.log(that.orderList)
        // console.log(that.orderList)
        // console.log("============================")
      },1000)


    },


    /*支付*/
    paymoneyx(){

        let data = {
          order_id:this.$route.params.id
        }


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
        this.dataList = res

      }).catch(err=>{

      })
    }

  }

};
</script>
<style lang="scss" scoped>
  @import "../scss/orderdetails.scss";
</style>
