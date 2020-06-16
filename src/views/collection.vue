<template>
  <div class="body">
    <div class="content">
      <div class="title">我的收藏</div>
        <span v-if="videoList.length!=0">
            <div class="works">
        <div class="cont" v-for="item in videoList">
          <div class="img" @click="videoGO(item.favorite_video__video_url)">
            <div class="cancel">
              <div class="imga">
<!--                <img :src="">-->
              </div>
              <div class="tip" v-on:click.stop="cancel(item.favorite_video__aweme_id)" >取消收藏</div>
            </div>
            <img :src="item.favorite_video__video_img_url" />
          </div>
          <div class="info">
            <div class="name">{{item.favorite_video__video_title}}</div>
            <div class="time">{{item.favorite_video__video_date}}</div>
            <div class="operation">
              <div class="statistics">
                <div class="logo">
                  <img src="../images/zan.png">
                </div>
                <div class="number">{{item.favorite_video__video_like}}</div>
              </div>
              <div class="statistics">
                <div class="logo">
                  <img src="../images/pin.png">
                </div>
                <div class="number">{{item.favorite_video__video_comment}}</div>
              </div>
              <div class="statistics">
                <div class="logo">
                  <img src="../images/fenx.png">
                </div>
                <div class="number">{{item.favorite_video__share_count}}</div>
              </div>
            </div>
          </div>
          <div class="btn" @click="nvago(item.favorite_video__aweme_id)">视频详情</div>
        </div>
      </div>
      <div class="more" @click="morevideo">
        <div class="img"></div>
        <div class="txt">查看更多</div>
      </div>
        </span>

        <span v-else>
            <img class="empty_bg" src="../images/empty.png">
        </span>

    </div>
  </div>
</template>

<script>
    import {collget, collPost, collDelete, deleteadrs} from "../apis/info";

  // import { Tiemtransition  } from "../utils/datatime";
export default {
  name: "collection",
  data() {
    return {
      videoList:[],
      paging:{
        start:0,
        end:8
      },
        pages:[
            {
                start:0,
                end:8
            },

            ],//用于循环查询的数组
      deleteid:{
        favorite_video__aweme_id:0
      }
    };
  },

  methods:{

      /*跳转传参*/
      nvago(e){
          // http://localhost:63342/dqcy/video.html?vid=6830678056311475456
          //http://test.shadou.cn/video.html?vid=6826919575330901260
          // window.location.href = " http://test.shadou.cn/video.html?vid="+e;
          window.location.href = "http://shadou.cn/video.html?vid="+e;
      },

      videoGO(e){
          window.open(e) ;
      },
    cancel(e){
      // let id =11
        /*删除*/

            console.log(e)
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: false
            }).then(() => {
                this.deleteid.favorite_video__aweme_id= e
                console.log(e)

                collDelete(this.deleteid).then(res=>{
                    console.log(res)
                    for (let i in this.pages){
                        var listx =[]
                        collget(this.pages[i]).then(res=>{
                            console.log("---------------------")
                            console.log(res.res)
                            for (let i in res.res){
                                listx.push(res.res[i])
                            }
                            console.log("---------------------")

                            // this.videoList.forEach(item=>{
                            //  item.
                            // })
                            // Tiemtransition
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                        }).catch(err=>{

                        })
                    }
                    this.videoList = listx
                }).catch(err=>{
                    console.log(err)
                })

            }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });
            });







        console.log("取消")



    },
    morevideo(){

      let that = this
        let paging={
            start:that.paging.start+8,
            end:that.paging.end+8
        }
      that.paging.start = that.paging.start+8
      that.paging.end=  that.paging.end+8

        // console.log(that.pages)
        // return
      collget(paging).then(res=>{


            console.log(res)
          if (res.res.length!==0){
              console.log(res.res)
              console.log(res.res.length)
              console.log("测试失败")
              that.pages.push(paging)
              for (let i in res.res){
                  this.videoList.push(res.res[i])
              }

          }else {
              this.$message({
                  type: 'warning',
                  message: '没有更多数据了!'
              });
              let paging={
                  start:that.paging.start-8,
                  end:that.paging.end-8
              }
              that.paging.start = that.paging.start-8
              that.paging.end=  that.paging.end-8
          }
        // this.videoList.forEach(item=>{
        //  item.
        // })
        // Tiemtransition

      }).catch(err=>{

      })
      console.log(that.paging)

    },

  },
  mounted() {
    let data = this.paging
      console.log(data)
    collget(data).then(res=>{
      let list = res.res
      // this.videoList.forEach(item=>{
      //  item.
      // })
      // Tiemtransition
        this.videoList= list
    }).catch(err=>{

    })

  }
};
</script>
<style lang="scss" scoped>
  @import "../scss/collection.scss";
</style>
