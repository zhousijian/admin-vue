<template>
  <div class="body">
    <span v-if="orinfoa">
      <div class="content">
        <div class="title">我的购物车</div>
        <div class="cont">
          <div class="headline">
            <div class="txt">视频内容</div>
            <div class="txt">类型</div>
            <div class="txt">单价</div>
            <div class="txt">操作</div>
          </div>
          <div v-if="awemeData.length!=0" class="cont_list" v-for="item in awemeData">
            <div class="cont_line">
              <div class="cont_s">
                <div class="pitch_on" @click="addList(item.aweme_id)"  v-if="!item.judge"> </div>
                <div class="pitch_c" @click="deleList(item.aweme_id)" v-if="item.judge"></div>
                <div class="cont_img" >
                  <img :src="item.video_img_url">
                </div>
                <div class="info">
                  <div class="name">
                    {{item.video_title}}
                  </div>
                  <div class="author">作者：{{item.user_nickname}}</div>
                </div>
              </div>
              <div class="choose">

                  <div class="cont_choose">
                    <div class="pitch_x"></div>
                    <div class="choose_txt">创意剧本</div>
                  </div>
                  <div class="cont_choose">
                    <div class="pitch_on" @click="pitchOn(1,item.aweme_id)" v-if="item.shooting_service==0"></div>
                    <div class="pitch_c" @click="pitchOn(0,item.aweme_id)" v-if="item.shooting_service==1"></div>
                    <div class="choose_txt">视频拍摄</div>
                  </div>
              </div>

              <div class="money"><span>￥</span>{{item.price}}</div>
              <div class="delete">

<!--                  @click="delcar(item.aweme_id)"-->
                 <div class="del_txt"  @click="open(item.aweme_id)">删除</div>

                <div class="ch_img" v-if="!item.has_favorite"@click="addrcoll(item.aweme_id)">
                  <img src="../images/wshouc.png">

                </div>
                <div class="ch_img" v-if="item.has_favorite" @click="delcoll(item.aweme_id)">
                  <img src="../images/shouc.png">
                </div>

              </div>
            </div>
          </div>
            <div v-if="awemeData.length==0"  class="kong_tip">

                <div class="imgcar">
                    <img src="../images/car.png">
                </div>
                您的购物车什么都没有，快去<span class="bint" @click="navgoto"> 首页 </span>逛逛吧
            </div>
          <div class="buy_tip" v-if="awemeData.length!=0">
              <span v-if="!judgebtn&&statistics.length!=0" style="display: flex">

                  <div class="pitch_on" @click="popup()"  v-if="agreetx&&!judgebtn"></div>
              <div class="pitch_c" @click="changep" v-if="!agreetx"></div>
                  <span class="my_txt" >*我已阅读</span>
            <span class="spanx" @click="popup()">《视频拍摄服务》</span>
              </span>
            <span v-if="statistics.length!=0&&judgebtn">
                 <span >*当前勾选视频拍摄服务不满10件，无法订购该服务，详情请阅读</span>
                 <span class="spanx" @click="popup()">《视频拍摄服务》</span>
            </span>


          </div>
        </div>
      </div>

      <div class="bottom_cont">
        <div class="cont">
          <div class="pitch_c" @click="alladd()" v-if="allsel"></div>
          <div class="pitch_on" @click="alladd()" v-if="!allsel"></div>
          <div class="txt">全选</div>
        </div>
        <div class="cont">
          <div class="cont_txt">
            共选择<span>{{scriptx}}</span>创意剧本，<span>{{hoot}}</span>视频拍摄
          </div>
          <div class="money">
            <div class="money_tip">总价：</div>
            <div class="number"><span>￥</span>{{money}}</div>
          </div>

          <div class="btn" v-if="popc&&statistics.length!=0&&taga" @click="passList()">结算</div>
            <div class="btn_col"  v-else>结算</div>
        </div>
      </div>

         <el-dialog title="视频拍摄服务须知" :visible.sync="poptip">
             <div class="pop_cont"style="overflow:auto;">
             <div class="explain" >
                                购买须知: <br><br><br>

1. 以上剧本均为正规拍摄手法, 不包括航拍、水下拍摄等特殊拍摄服务，如有特殊拍摄需求费用另行商议。<br><br>

 2. 如拍摄过程中涉及到差旅费用，由甲方告知乙方具体差旅费用，乙方进行支付或是安排差旅。<br><br>
             </div>

                 <div class="pit_tip">
                     <div class="pitch_c" @click="agree()" v-if="!agreetx"></div>
          <div class="pitch_on" @click="agree()" v-if="agreetx"></div>
                     <span>*我已阅读《视频拍摄服务须知》</span>
                 </div>


             </div>
              <div v-if="agreetx" class="pop_conf pop_confirma">确定</div>
                 <div @click="subbtn" v-if="!agreetx" class="pop_conf pop_confirmb">确定</div>
         </el-dialog>
    </span>
    <span v-if="!orinfoa">
    <div class="content" >
      <div class="addrss" >
        <div class="addr_tip">确认收货信息</div>
        <div class="addr_cont" v-if="siteList.length==0">
          <div class="add">添加收货地址</div>
          <div class="addr_null">您未填写收货地址 无法支付</div>
          <div class="add_set" @click="navgo">
            <div>前往设置</div>
            <div class="img">
                <img src="../images/golucency.png">
            </div>
          </div>
        </div>
         <div class="addr" v-else>
        <div class="addr_confirm">
          <div class="addr_title">
            <div class="name">收件人：{{siteList.name}}</div>
            <div class="replace">
              <div class="replace_txt" @click="addrespop">更换地址</div>
              <div class="replace_img">
                <!--                                <img src="">-->
              </div>
            </div>
          </div>
          <div class="addr_info">
            <div class="email">收件邮箱：{{siteList.email}}</div>
            <div class="phone">联系方式：{{siteList.phone}}</div>
            <div class="addr_z">拍摄地址：{{siteList.addresstxt}}</div>
          </div>
        </div>
        <div class="addr_bg">
          <div class="triangle">
            <div class="opt_for"></div>
          </div>
        </div>
      </div>
      </div>




      <div class="ptitle">确认商品信息</div>
      <div class="cont">
        <div class="headline">
          <div class="txt">商品标题</div>
          <div class="txt">商品类型</div>
          <div class="txt">单价</div>
        </div>
        <div class="cont_list">
          <div class="cont_line" v-for="item in orderpass">
            <div class="cont_s">
              <div class="cont_img">
                <img :src="item.video_img_url">
              </div>
              <div class="info">
                <div class="name">
                  {{item.video_title}}
                </div>
                <div class="author">作者：{{item.user_nickname}}</div>
              </div>
            </div>
            <div class="choose">
              <div class="cont_choose">
<!--                <div class="choose_img"></div>-->
                <div class="choose_txt">创意剧本</div>
              </div>
              <div class="cont_choose" v-if="item.shooting_service==1">
<!--                <div class="choose_img"></div>-->
                <div class="choose_txt">视频拍摄</div>
              </div>
            </div>
            <div class="money"><span>￥</span>{{item.price}}</div>
          </div>
        </div>

           <el-dialog title="选择地址" :visible.sync="addrList">
                <div class="man_cont">
          <el-table
                  :data="alladdres"
                  style="width: 100%">
            <el-table-column
                    prop="name"
                    label="收件人"
                    width="100"
                   >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话"
                    width="130"
                   >
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="收件邮箱"
            width="210">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="拍摄地址"
                    width="210"
            >
            </el-table-column>
            <el-table-column
                    prop="handle"
                    label="操作"
                    align="center"
            >
              <template slot-scope="scope">
                <div class="mini"
                        size="mini"
                        @click="handleadd( scope.row)">编辑</div>
                <div        class="mini"
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</div>
              </template>
            </el-table-column>
            <el-table-column
                    prop="default"
                    label="选择地址"
                    align="center">
              <template slot-scope="scope">
                <div  @click="choice(scope.row)" class="confirm_btn">选择</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
          </el-dialog>

         <div class="zhifu_log">
            <div class="txt">支付方式</div>
            <div class="img">
                 <img src="../images/zhifubaoi.png">
            </div>

        </div>
        <div class="bottom_cont bottom_bg">
            <div class="cont"></div>
            <div class="cont">
          <div class="cont_txt">
            共选择<span>{{scriptx}}</span>创意剧本，<span>{{hoot}}</span>视频拍摄
          </div>
          <div class="money">
            <div class="money_tip">总价：</div>
            <div class="number"><span>￥</span>{{money}}</div>
          </div>

          <div class="btn" v-if="siteList" @click="suborder()">支付</div>
            <div v-else class="btn_x">支付</div>
        </div>


      </div>

<!--        <div class="buy_tip">-->
<!--          <div class="buy_ch"></div>-->
<!--          <span>*当前勾选视频拍摄服务不满10件，无法订购该服务，详情请阅读</span>-->
<!--          <span>*我已阅读</span>-->
<!--          <span>《视频拍摄服务》</span>-->
<!--        </div>-->
      </div>
    </div>


        <el-dialog title="添加地址信息" :visible.sync="addrsspop">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="收货人" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="收件邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
                <div>
                <el-form-item label="拍摄地址" prop="valueAdress" >
                  <div class="man_bg">

                    <el-select style="width: 33%"  v-model="ruleForm.valueAdress"  @change="stair"  placeholder="请选择">
                      <el-option
                              v-for="(item,key) in onlist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                    </el-select>

                    <el-select stle="width: 33%"   @change="secondary" v-model="valueb" placeholder="请选择">
                      <el-option
                              v-for="(item,key) in secondarylist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                    </el-select>


                    <el-select style="width: 33%"  @change="threeLevel" v-model="valuec" placeholder="请选择">
                      <el-option
                              v-for="(item,key) in threelist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                    </el-select>

                  </div>
                </el-form-item>
              </div>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>



              <el-form-item  prop="delivery" label-width = '21px'>
                <el-switch active-color="#13ce66" active-text="是否设置为默认地址"
                           v-model="ruleForm.default"></el-switch>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('ruleForm')">清空</el-button>
              <el-button type="primary" v-if="addoramend" @click="reserveadd('ruleForm')">保存地址</el-button>
              <el-button type="primary" v-if="!addoramend" @click="reserveamend('ruleForm')">确认修改</el-button>
            </div>
          </el-dialog>


    </span>
  </div>
</template>

<script>
    import {
        goocar,
        collPost,
        collDelete,
        carDelete,
        selvideo,
        seladdress,
        present,
        deleteadrs,
        amendaddress, paymoney
    } from "../apis/info";
    var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
        if (!value) {
            return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {

            if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'))
            } else {
                if (phoneReg.test(value)) {
                    callback()
                } else {
                    callback(new Error('电话号码格式不正确'))
                }
            }
        }, 100)
    };
export default {
  name: "buy",
  data(){
    return{
      awemeData:[],
      statistics:[],
      dataLIst:[],
      allsel:false,
      money:0,//总金额
      scriptx:0,
      hoot:0,
        value:'',
        valuea:'',
        valueb:'',
        valuec:'',
        judgebtn:true,
        poptip:false,
      orinfoa:true,
      orderpass:[],
        alladdres:[],//所有收货地址
        agreetx:true,
        popc:false,
        addrList:false,
        addrsspop:false,
        ruleForm: {
            name: '',
            county__id: 0,
            phone: '',
            email: '',
            default: false,
            address: '',
            valueAdress:''
        },
        siteList:[],
        orderid:'',
        addoramend:true,
        taga:false,
        rules: {
            name: [
                { required: true, message: '请输入收货人地址', trigger: 'blur' },

            ],
            phone: [
                {  required: true, validator: checkPhone, trigger: 'change' }
            ],
            email: [
                {  required: true, message: '请输入收货人邮箱', trigger: 'change' },
                { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
            ],
            county__id: [
                {  required: true, message: '请选择收货地址', trigger: 'change' }
            ],
            address: [
                {  required: true, message: '请输入收货人详细地址', trigger: 'change' }
            ],

        },
        secondarylist:[],
        onlist:[],
        threelist:[],
    }
  },
  watch:{
    dataLIst(value){
      console.log(value)
    },
    awemeData(value){
      console.log(value)
    }
  },
  methods:{

      navgo(){
          this.$router.push({path:'/management'})
      },
      navgoto(){
          self.location.href = 'http://test.shadou.cn/index.html' //(e,'self')
      },
    open(e) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        let date={
          aweme_id_list:[e]
        }
        console.log(date)
        carDelete(date).then(res=>{
          this.selectcar()
          this.dispose()
        }).catch(err=>{

        })
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
      agree(){
        this.agreetx = !this.agreetx

      },
      popup(){
        this.poptip = !this.poptip
      },
      addrespop(){
        this.addrList=true

      },

      subbtn(){
        console.log(this.poptip)
          this.poptip = !this.poptip
              //
          this.popc = true
      },
      changep(){
          this.popc = false
          this.agreetx =!this.agreetx
          this.judgebtn = this.judgebtn
      },

    addrcoll(e){
      let date={
        aweme_id:e
      }
      collPost(date).then(res=>{

        this.selectcar()
        this.dispose()
      }).catch(err=>{

      })
    },
    delcoll(e){
          console.log("点击的取消")
      let date={
        favorite_video__aweme_id:e
      }
      collDelete(date).then(res=>{
        console.log(res)
        this.selectcar()
        this.dispose()
      }).catch(err=>{

      })
    },
    delcar(e){

    },
      /*选择2地址*/
      choice(e){
          console.log(e)
          this.siteList = e
          this.addrList =false

      },
    /*勾选视频*/
    pitchOn(e,n){
      // let id = parseInt(n)
      // console.log(id)
      // console.log(typeof(id) )
      let date={
        shooting_service:e,
        aweme_id_list:[n]
      }
      selvideo(date).then(res=>{
          this.selectcar()
        this.dispose()
      }).catch(err=>{

      })
    },

    //勾选列表
    addList(e){
        let that =this
      console.log(e)
      that.statistics.push(e)
     that.dispose()
      that.total()
    },

    //把值传给订单列表
    passList(){
        this.orinfoa= false
      let arr= []
      for (let i in this.statistics){
        for (let j in this.awemeData){
          if (this.statistics[i]==this.awemeData[j].aweme_id){
            arr.push(this.awemeData[j])
          }
        }
      }
      this.orderpass = arr
        console.log(this.siteList)

        let data ={
            address_id:this.siteList.id,
            aweme_id_list:this.statistics
        }
        console.log(data)
        present(data).then(res=>{

            console.log(res)
            this.orderid = res.id

        }).catch(err=>{

        })


    },

      suborder(){
          let data = {
              order_id:this.orderid
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



    deleList(e){
      let that = this


      for (let i in that.statistics){
        if (that.statistics[i]==e){
          that.statistics.splice(i,1)
        }
      }
      that.total()
      that.dispose()

    },
    //判断是否勾选方法
    dispose(){
      let  that = this
      for (let i in that.awemeData){
        this.awemeData[i]['judge']=false
        // this.dataLIst.push(false)
        if (this.statistics.length!=0){
          for (let j in that.statistics){
            if (this.awemeData[i].aweme_id==that.statistics[j]){
              this.awemeData[i].judge=true
              // this.dataLIst.push(true)
            }
          }
        }

      }
      console.log(this.awemeData)

    },
    //查询选择
    selectall(){
      let that = this
      let arr =[]
      for (let i in that.awemeData){
        arr.push(that.awemeData[i].aweme_id)
      }
      that.statistics=arr
      that.dispose()
    },
    //数据统计方法
    total(){
      let that =this
      let number =0
      let hoot = 0

      for(let i in that.statistics){
        for (let j in that.awemeData){
          if (that.statistics[i]==that.awemeData[j].aweme_id){
            number = number+that.awemeData[j].price
            if (that.awemeData[j].shooting_service==1){
              hoot=hoot+1
            }
          }
        }
      }
      that.scriptx= that.statistics.length
      that.hoot= hoot
        if(hoot==0||hoot>=10){
            this.taga = true
        } else {
            this.taga= false
        }

        if (that.statistics.length!=0&&hoot<10&&hoot!=0){
            this.judgebtn=true
        }else if(that.statistics.length==0&&hoot<10&&hoot!=0){
            this.judgebtn=true
        }else if(that.statistics.length!=0&&hoot==0){
            this.judgebtn=false
        }else if(that.statistics.length!=0&&hoot>=0){
            this.judgebtn=false
        }
      that.money = number
    },
    //全选
    alladd(){
      let that =this
      that.allsel=!that.allsel
      if (that.allsel){
    that.selectall()
    that.total()
      }else {
        this.statistics=[]
        that.total()
        that.dispose()
      }
    },
    //  查询我的购物车
    selectcar(){
      goocar().then(res=>{
        console.log(res)
        let that = this
        // that.awemeData = res.aweme_data
        let arr = res.aweme_data
        for (let i in arr){
          arr[i]['judge']=false
          // if (that.statistics.length!=0){
          //   for (let j in that.statistics){
          //     if (that.awemeData.aweme_data[i].aweme_id==that.statistics[j]){
          //
          //     }that.awemeData.aweme_data[i]['judge']=true
          //   }
          // }
        }


        // if(this.){}

        that.awemeData = arr
        that.dispose()
        that.total()
      }).catch(err=>{

      })
    },

      /*处理选项问题*/


    /*查询地址*/
    adrchaxun(){
      seladdress().then(res=>{
          console.log(res)
          console.log("____________++++++++++++++++++")
          if (res.res.length==0){
              this.siteList= []
              this.alladdres =[]
          }else {
              let siteList = res.res
              let alladdres =res.res
              for (let i in siteList){
                  siteList[i]['addresstxt']=  siteList[i].region__name +' '+ siteList[i].city__name+" "+ siteList[i].county__name+" "+ siteList[i].address
              }
              this.alladdres=  alladdres
              // siteList= JSON.parse(JSON.stringify(siteList).replace(/default/g,"defaultx"));
              for (let i in siteList){
                  if (siteList[i].default){
                      this.siteList = siteList[i]
                  }
              }
          }
            console.log(this.siteList)
            console.log("没到这儿1")
        console.log(this.alladdres)
          console.log("____________++++++++++++++++++")

      }).catch(err=>{

      })
    },

      /*删除*/
      handleDelete(e){
          console.log(e)
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: false
          }).then(() => {
              let data = {
                  id:e.id
              }
              deleteadrs(data).then(res=>{
                  this.adrchaxun()
              }).catch(err=>{

              })
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
          }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // });
          });


      },

      /*编辑*/
      handleadd(e){
          console.log(e)
          console.log("===========到账===============")
          this.addrsspop= true
          this.addoramend = false
          this.ruleForm= {
              name: e.name,
              county__id: e.county__id,
              phone: e.phone,
              email: e.email,
              default: e.defaultx,
              address: e.address,
              valuea:e.region__name,
              valueAdress:e.region__name
          }
          this.value = this.ruleForm.region__name
          // for (){
          //
          // }
          this.stair(e.region__id)
          this.secondary(e.city__id)

          this.value =e.region__name
          this.valueb= e.city__name
          this.valuec= e.county__name
          this.nunid = e.id
          this.numberid=e.county__id

          // changeswi(e)
          // {
          //   let params = {
          //     address_id: e.id
          //   }
          //   let data = {
          //     name: e.name,
          //     county__id: e.county__id,
          //     phone: e.phone,
          //     email: e.email,
          //     default: e.defaultx,
          //     address: e.address,
          //   }
          //   console.log(data)
          //   this.amendadrs(params, data)
          // }

      },
     /* handleadd(e){
          console.log(e)
          this.addrsspop= true
          this.addoramend = false
          this.ruleForm= {
              name: e.name,
              county__id: e.county__id,
              phone: e.phone,
              email: e.email,
              default: e.defaultx,
              address: e.address,
              valuea:e.region__name
          }
          this.value = this.ruleForm.region__name
          // for (){
          //
          // }
          this.stair(e.region__id)
          this.secondary(e.city__id)

          this.value =e.region__name
          this.valueb= e.city__name
          this.valuec= e.county__name
          this.nunid = e.id
          this.numberid=e.county__id

          // changeswi(e)
          // {
          //   let params = {
          //     address_id: e.id
          //   }
          //   let data = {
          //     name: e.name,
          //     county__id: e.county__id,
          //     phone: e.phone,
          //     email: e.email,
          //     default: e.defaultx,
          //     address: e.address,
          //   }
          //   console.log(data)
          //   this.amendadrs(params, data)
          // }

      },*/
      reserveamend(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  let data = this.ruleForm
                  let arrlist= JSON.parse(JSON.stringify(data).replace(/county__id/g,"county__id"));
                  console.log(arrlist)
                  arrlist.county__id = this.numberid

                  let params = {
                      address_id:this.nunid
                  }
                  this.amendadrs(params,arrlist)
                  this.addrsspop=false
                  // Addrss(data).then(res=>{
                  //   this.addrsspop= false
                  //   this.adrchaxun()
                  // }).catch(err=>{
                  //
                  // })
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });

      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
      },
      stair(value){
          console.log(value)
          this.addrval = value
          for (let i in this.onlist){
              if (this.onlist[i].id == value){
                  this.secondarylist=this.onlist[i].children


                  this.valueb = this.secondarylist[0].name

                  console.log(this.secondarylist[0].id)
                  this.secondary(this.secondarylist[0].id)
              }
          }
      },

      amendadrs(e,n){
          amendaddress(e,n).then(res=>{
              this.adrchaxun()
          }).catch(err=>{

          })
      },

      secondary(value){
          console.log(value)
          for (let i in this.onlist){
              if (this.onlist[i].id==this.addrval){
                  for (let j in this.onlist[i].children){
                      if(this.onlist[i].children[j].id== value){
                          this.threelist=this.onlist[i].children[j].children
                          this.valuec = this.threelist[0].name
                          this.ruleForm.county__id =this.threelist[0].id
                      }
                  }
              }
          }
      },

      threeLevel(value){
          this.ruleForm.county__id=value
      },


  },
  mounted() {
  this.selectcar()
    this.adrchaxun()
  }
};
</script>
<style lang="scss" scoped>
  @import "../scss/buy.scss";
</style>
