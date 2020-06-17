<template>
    <div class="body">
        <div class="headr">
            <div class="logo" @click="navgo('index.html')">
                <img src="../../images/logoa.png">
            </div>
            <div class="head_cont">
                <div class="txt" @click="navgo('index.html')">首页</div>
                <div class="txt" @click="navgo('type.html')">创意分类</div>
                <div class="txt" @click="navgo('buy.html')">订购</div>
                <!-- <div class="txt" @click="navgo('case.html')">行业案例</div> -->
                <div class="user">
                    <div class="user_info" @click="mouscz">
                        <div class="avatar">
                            <img :src="userinfo.avatar"/>
                        </div>
                        <div class="name">{{userinfo.nickname}}</div>
                        <div class="cur_img">
                            <img src="../../images/golucency.png">
                        </div>
                    </div>
                    <div class="cont_cz" v-if="mous">
                        <div class="info_tip" @click="navgox('buy')">
                            <div class="img img1"></div>
                            <div class="name">购物车</div>
                        </div>
                        <div class="info_tip" @click="navgox('collection')">
                            <div class="img img2"></div>
                            <div class="name">收藏</div>
                        </div>
                        <div class="info_tip" @click="navgo()">
                            <div class="img img3"></div>
                            <div class="name">退出登录</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getInfo} from "../../apis/info";
    export default {
        name: "index",
        data(){
            return{
                userinfo:[],
                mous:false
            }
        },
        methods:{
            // navgo(e){
            //     window.open(e);
            // },
            mouscz(){
                this.mous= !this.mous
            },
            // mouseLeave(){
            //     this.mous= true
            // }
            navgox(e){
                this.mous= !this.mous
                this.$router.push({path:e})
            },
            navgo(e){
               var linkurl = "http://127.0.0.1:5500/";
                // var linkurl = 'http://test.shadou.cn/'
                // var linkurl = 'http://shadou.cn/'
                if(e){
                    console.log(e)
                    this.mous=false
                    self.location.href =linkurl+ e //(e,'self')
                }else {
                    localStorage.removeItem('jwt_token')
                    // self.location.replace(" http://shadou.cn/index.html?exit="+0)
                    self.location.replace(linkurl+"index.html?exit="+0)

                        // self.open(" http://localhost:63342/dqcy/index.html?exit="+0)
                    //self.open("http://test.shadou.cn/?exit="+0) ;

                }

            },


        },
        mounted() {
            getInfo().then(res=>{
                console.log(res)
               let  userinfo = res
                this.userinfo = userinfo
            }).catch(err=>{

            })
        }
    }
</script>

<style scoped lang="scss">
  .headr{
      display: flex;
      justify-content: space-between;
      min-width: 1200px;
      align-items: center;
      background-color: #16181B;
      padding: 16px 0;
      .logo{
          width: 156px;
          height: 26px;
          margin-left: 39px;
      }
      .head_cont{
          display: flex;
          align-items: center;
          .txt{
              font-size: 1.1428rem;
              color: #fff;
              margin-left: 19px;
              cursor: pointer;
          }
          .user{
              position: relative;
              /*display: flex;*/
              .user_info{
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  margin-left: 26px;
                  margin-right: 33px;
                  .avatar{
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      overflow: hidden;
                      margin-right: 8px;
                  }
                  .name{
                      max-width: 90px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      font-size: 1.1428rem;
                      color: #ffffff;
                  }
                  .cur_img{
                      margin-left: 9px;
                  }
              }
              .cont_cz{
                  width: 120px;
                  /*display: none;*/
                  background-color: #ffffff;
                  padding:0 15px;
                  padding-bottom: 13px;
                  box-sizing: border-box;
                  position: absolute;
                  top: 39px;
                  left: 32px;
                  z-index: 10;
                  .info_tip{
                      display: flex;
                      align-items: center;
                      margin-top: 15px;
                      cursor: default;
                      .img{
                          width: 20px;
                          height: 20px;
                          margin-right: 13px;
                          background-repeat: no-repeat;
                          background-size: 100% 100%;
                          /*background-image: url("../../images/");*/
                      }
                      .img1{
                          background-image: url("../../images/icon_gouwuche2.png");

                      }
                      .img2{
                          background-image: url("../../images/icon_shoucang2.png");
                      }
                      .img3{
                          background-image: url("../../images/icon_log2.png");
                      }
                      .name{
                          font-size: 1rem;
                          color: #999999;
                      }
                  }
                  .info_tip:hover .name{
                      color: #137FF9;
                  }
                  .info_tip:hover{
                      .img1{
                          background-image: url("../../images/icon_gouwuche.png");
                      }
                      .img2{
                          background-image: url("../../images/icon_shoucang1.png");
                      }
                      .img3{
                          background-image: url("../../images/icon_log1.png");
                      }
                  }
              }

          }
          /*.user:hover .cont_cz{*/
          /*    display: block;*/
          /*}*/
      }
  }
</style>
