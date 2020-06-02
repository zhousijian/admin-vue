<template>
  <div class="body">
    <div class="content">
      <div class="order_tip">
        <div class="cont">
          <div class="title">订单管理</div>
        </div>
        <div class="cont" v-if="false">
          <div class="btn active">全部订单</div>
          <div class="btn">待支付</div>
          <div class="btn">待发货</div>
          <div class="btn">交付成功</div>
        </div>
      </div>

      <div class="order_title">
        <div class="tit_a">订单状态</div>
        <div class="tit_b">类型</div>
        <div class="tit_c">订单总额</div>
        <div class="tit_d">操作</div>
      </div>

      <div class="order_cont" v-for="(item,index) in orderList">
        <div class="cont_tit">
          <div class="tiem_number">
            <div class="tiem">下单时间：{{item.create_time}}</div>
            <div class="number">订单号：{{item.order_number}}</div>
          </div>
          <div class="money">
            <div class="txt">总价</div>
          </div>
          <div class="time_tip">
            <!--&&item.status_name=='提交订单'-->
            <div class="txt" v-if="item.timeg!=false&&item.status_name=='提交订单'" >支付剩余时间：  {{item.timeg}}</div>
          </div>
        </div>
        <div class="cont_layout">
          <div class="cont" :class="item.more&&item.order_good.length>3?'conthe':''">
            <div class="goods_ls">
              <div class="goods" v-for="goodx in item.order_good">
                <div class="goods_con">
                  <div class="goods_img">
                    <img :src="goodx.video_img_url">
                  </div>
                  <div class="goods_info">
                    <div class="goods_name">
                      {{goodx.video_title}}
                    </div>
                    <div class="goods_author">作者：{{goodx.user_nickname}}</div>
                  </div>
                </div>
                <div class="type_txt">
                  <div class="txt">创意剧本</div>
                  <div class="txt" v-if="goodx.server_type==1">视频拍摄</div>
                </div>
              </div>

            <!--  <div class="goods">
                <div class="goods_con">
                  <div class="goods_img"></div>
                  <div class="goods_info">
                    <div class="goods_name">
                      泡芙收到正式求婚了 以后要和安生相亲相爱 #vlog萌宠日常
                      #宠爱里...
                    </div>
                    <div class="goods_author">作者：王泡芙</div>
                  </div>
                </div>
                <div class="type_txt">
                  <div class="txt">创意剧本</div>
                  <div class="txt">创意剧本</div>
                </div>
              </div>-->
            </div>
            <div class="money">
              <div class="number"><span>￥</span>{{item.amount}}</div>
            </div>
            <div class="state">
              <span v-for=" itemx in item.button_list">
              <div class="state_buy" @click="navgo(item.id)"  v-if="itemx == '立即支付'">立即支付</div>
              <div class="state_failure" v-if="itemx == '订单已失效'">订单已失效</div>
              <div class="state_confirm" v-if="itemx == '支付成功'" @click="cancelbtn(item.id,5)">确认交付</div>
              <div class="state_succeed" v-if="itemx == '交付成功'">交付成功</div>
              <div class="state_state" v-if="itemx == '取消订单'" @click="cancelbtn(item.id,6)">取消订单</div>
              <div class="state_info" v-if="itemx == '订单详情'" @click="navgo(item.id)">订单详情</div>
                </span>
            </div>
          </div>
          <div class="cont_more" v-if='item.more&&item.order_good.length>3' @click="moreall(index)">
            <div class="img">
              <img :src="more" />
            </div>
            <div class="txt">展开全部</div>
          </div>
          <div class="cont_more" v-if='!item.more&&item.order_good.length>3' @click="moreall(index)">
            <div class="img img_top">
              <img :src="more" />
            </div>
            <div class="txt">收起</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import more from "../images/more.png";
import { selorder,cancelord} from "../apis/info";
export default {
  name: "order",
  data() {
    return {
      more,
      orderList:[],
    };
  },
  methods:{

    // clickBtn(id) {
    //   this.$forceUpdate();
    //   this.$set(this.id, "timeg", true);
    // },
      // this.$set(this.tableData[id],"tip",true);

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
              // that.selectorder()
            }
            var hours = parseInt((clatime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((clatime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = parseInt((clatime % (1000 * 60)) / 1000);
            let timeg=that.add0(hours)+':'+that.add0(minutes)+':'+that.add0(seconds)
            list[i].timeg = timeg
          }else {
            list[i].expiration_time = 0
          }
        }
        that.orderList=list
        console.log(list)
      },5000)


    },

  //  查询订单
    selectorder(){
      let that =this
      selorder().then(res=>{
        let orderList = res.data
        console.log(orderList)
        for (let i in orderList){
          orderList[i]['timeg']=0

          if (orderList[i].order_good.length>3){
            orderList[i]['more']=true
          }else{
            orderList[i]['more']=false
          }
        }
        this.orderList  = orderList
        this.setTimex(orderList)
      }).catch(err=>{

      })
    },

    cancelbtn(e,num){
      let id = String(e)
      console.log(typeof (id))
      let data = {
        id:id
      }
      let pam = {
        to_status:num
      }
      cancelord(data,pam).then(res=>{
        this.selectorder()
      }).catch(err=>{})
    },
    navgo(e){

      // console.log(e)
      // console.log(typeof (e))
      let idx = String(e)
      window.sessionStorage.setItem('id', idx);;
      // console.log(idx)
      // console.log(typeof (idx))
      // console.log(typeof (id))
      this.$router.push({
        path: 'orderdetails',
        name: 'orderdetails',
        params: {
          id: idx
        }

      })
    },

    moreall(e){
      console.log(e)
      console.log(this.orderList[e].more)
      this.orderList[e]['more']= !this.orderList[e]['more']

      console.log("1111111")
    }
  },
  mounted() {
      this.selectorder()
  }
};
</script>
<style lang="scss" scoped>
  @import "../scss/order.scss";
</style>
