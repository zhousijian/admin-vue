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
          <div class="cont_list" v-for="item in awemeData">
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
                  <el-button type="text" @click="open(item.aweme_id)"><div class="del_txt" >删除</div></el-button>

                <div class="ch_img" v-if="!item.has_favorite"@click="addrcoll(item.aweme_id)">
                  <img src="../images/wshouc.png">

                </div>
                <div class="ch_img" v-if="item.has_favorite" @click="delcoll(item.aweme_id)">
                  <img src="../images/shouc.png">
                </div>

              </div>
            </div>
          </div>

          <div class="buy_tip">
            <div class="pitch_on"  v-if="agreetx&&!judgebtn"></div>
              <div class="pitch_c" v-if="!agreetx"></div>
            <span v-if="judgebtn">*当前勾选视频拍摄服务不满10件，无法订购该服务，详情请阅读</span>
            <span class="my_txt" v-if="!judgebtn">*我已阅读</span>
            <span class="spanx" @click="popup()">《视频拍摄服务》</span>
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

          <div class="btn" v-if="popc&&statistics.length!=0" @click="passList()">结算</div>
            <div class="btn_col"  v-else>结算</div>
        </div>
      </div>

         <el-dialog title="视频拍摄服务须知" :visible.sync="poptip">
             <div class="pop_cont">
             <div class="explain" style="overflow:auto;">
                                您对 G5 Entertainment AB 网站 www.g5e.com（“网站”）以及 G5 和/或 G5 的任何分支机构或子公司（G5 Entertainment AB 及其子公司和分支机构在此统称为“G5”）通过本网站或第三方提供商授权给客户的任何和所有游戏和/或应用程序（“游戏”）的访问和使用应遵守以下条款和条件（“条款和条件”）、任何第三方提供商提供的任何协议的所有条款和条件以及所有适用法律。此外，当您注册访问和使用 G5 Friends 和服务（如：聊天室、游戏中聊天消息收发、公告板等）（统称“服务”）时，我们要求您明确接受这些条款和条件和隐私政策（其条款通过引用纳入本文）。如果您不同意接受这些条款和条件或隐私政策的约束，则我们不允许您注册访问或使用服务，您也不得使用或访问服务。一旦访问和浏览本网站，即表示您毫无限制或条件地接受这些条款和条件，并承认您与 G5 之间的任何其他协议均作废并失去效力或有效性：
1. 我们维护本网站、所有游戏、服务以及本网站、服务和任何游戏中包含的所有资料，旨在为您提供个人娱乐和信息。在您遵守这些条款和条件的前提下，G5 谨此向您授予有限的、非独占的、不可转让的、不可转授许可的权利，以便您仅为了您的个人而非商业目的访问、查看、下载和使用本网站、服务和游戏。为了清楚起见且在不限制或放弃这些条款和条件的其他章节中规定的任何条款或条件的前提下，您承认并同意，如果 G5 自行确定您的使用违反了任何适用法律和/或以任何其他形式违背了这些条款和条件，则 G5 有权立即阻止您对本网站、任何服务、任何游戏及与这些关联提供的项目的访问。您访问和使用本网站、服务和/或任何游戏的权利是由我们酌情提供的，我们可以随时以任何理由暂停或终止您的帐户。不得以任何方式对本网站或任何游戏中的资料进行拷贝、复制、重新发布、上传、发布、传输或分发，但您可以仅为了您的个人而非商业的家庭使用目的在任何一台计算机上下载该资料的一份副本，条件是，您不得侵犯所有版权和其他专有声明。对该资料进行修改或将其用于任何其他目的均会侵犯 G5 以及创建该资料的艺术家的版权和其他专有权。在没有获得 G5 的明确书面许可的前提下，您不得出于公共或商业目的分发、修改、传输或使用包括任何和所有图形和/或声音文件在内的本网站、服务或任何游戏的内容。您承认并同意，对于从第三方提供商（如：Apple、Google/Android、Amazon 等）下载的任何游戏，即使 G5 不是您与此种第三方之间的任何许可协议的一方，G5 仍应是此种第三方的最终用户许可协议的一个第三方受益人。您还同意，作为任何此种最终用户许可协议的第三方受益人，G5 拥有针对您执行此种许可的权利。
2. 除非另有说明，本网站中包含的和/或在本网站上和/或通过服务推广或提供的所有游戏、文本、数据、图形文件、声音文件和其他资料均受版权保护，均为 G5 和/或 G5 的供应商的财产。除非这些条款和条件中有规定，否则严禁使用此种资料。
3. 本网站、服务和/或任何游戏中包含的所有商号、商标和图像以及个人履历信息均为 G5 的财产或均应在 G5 许可的前提下使用。除非这些条款和条件中明确允许，否则禁止您使用这些资料。针对这些资料的任何未经授权的使用都可能侵犯 G5 和/或第三方的版权、商标和其他专有权，以及违反隐私和宣传法律和其他法规及法令。未经所有者明确书面同意，本协议、游戏和/或本网站中包含的任何内容均不得被视为默示或以其他方式授予使用任何商标或其他专有信息的任何许可或权利。
4. 本网站或服务提供的或者作为游戏组成部分的任何和所有虚拟商品和/或虚拟货币，只能在您使用和享受本网站和/或任何相关游戏的过程中仅供您个人娱乐和使用。其使用受这些适用条款和条件的约束。所有虚拟商品和虚拟货币都是授权给您使用的，都不是您的个人财产，其中的任何所有者权益也并未转让给您。G5 可以随时经或不经通知自行决定变更虚拟商品和虚拟货币收取的价格、提供的数量以及提供的种类。G5 还可以随时经或不经通知自行决定变更或停用任何和所有此种虚拟商品和虚拟货币。任何虚拟商品或虚拟货币无法从 G5 或任何其他第三方换取金钱、服务、商品或其他具有货币价值的货物或物品。
5. G5 将采取合理努力在本网站、服务和游戏中提供准确而最新的信息，但 G5 不对信息准确性做出任何保证或声明。对于本网站、服务和/或任何游戏内容的任何错误或疏忽，G5 概不承担任何义务或责任。
6. 当您在 G5 和/或本网站、服务和/或任何游戏注册时，您明确同意接收来自 G5 的任何通知、公告、协议、披露、报告、文档、有关新产品或新服务的通信或者其他记录或信函。您同意接收我们通过电子邮件这种电子形式向您发送的通知。
             </div>

                 <div class="pit_tip">
                     <div class="pitch_c" @click="agree()" v-if="!agreetx"></div>
          <div class="pitch_on" @click="agree()" v-if="agreetx"></div>
                     <span>*我已阅读《视频拍摄服务须知》</span>
                 </div>

                 <div v-if="agreetx" class="pop_conf pop_confirma">确定</div>
                 <div @click="subbtn" v-if="!agreetx" class="pop_conf pop_confirmb">确定</div>
             </div>
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
            <div class="addr_z">拍摄地址：{{siteList.region__name}} {{siteList.city__name}} {{siteList.county__name}}{{siteList.address}}</div>
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
                   >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话"
                   >
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="收件邮箱">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="拍摄地址">
            </el-table-column>
            <el-table-column
                    prop="handle"
                    label="操作"
                    align="center"
            >
              <template slot-scope="scope">
                <div
                        size="mini"
                        @click="handleadd( scope.row)">编辑</div>
                <div
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
                <div @click="choice(scope.row)" class="confirm_btn">选择</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
          </el-dialog>

        <div class="bottom_cont">
        <div class="cont">
<!--          <div class="pitch_c" @click="alladd()" v-if="allsel"></div>-->
<!--          <div class="pitch_on" @click="alladd()" v-if="!allsel"></div>-->
<!--          <div class="txt">全选</div>-->
        </div>
        <div class="cont">
          <div class="cont_txt">
            共选择<span>{{scriptx}}</span>创意剧本，<span>{{hoot}}</span>视频拍摄
          </div>
          <div class="money">
            <div class="money_tip">总价：</div>
            <div class="number"><span>￥</span>{{money}}</div>
          </div>

          <div class="btn" @click="suborder()">支付</div>
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
              <el-form-item label="拍摄地址" prop="value" >
                <div class="man_bg">

                    <el-select style="width: 30%"  v-model="value"  @change="stair"  placeholder="请选择">
                      <el-option
                              v-for="(item,key) in onlist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                    </el-select>


                    <el-select style="width: 30%"   @change="secondary" v-model="valueb" placeholder="请选择">
                      <el-option
                              v-for="(item,key) in secondarylist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                    </el-select>


                    <el-select style="width: 30%"  @change="threeLevel" v-model="valuec" placeholder="请选择">
                      <el-option
                              v-for="(item,key) in threelist"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                      </el-option>
                    </el-select>

                </div>
              </el-form-item>
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
        amendaddress
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
        },
        addoramend:true,
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
          this.popc = !this.popc
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
    },

      suborder(){
        let data ={
            address_id:this.siteList.id,
            aweme_id_list:this.statistics
        }

          present(data).then(res=>{

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
        that.awemeData = arr
        that.dispose()
        that.total()
      }).catch(err=>{

      })
    },

    /*查询地址*/
    adrchaxun(){
      seladdress().then(res=>{
          console.log("____________++++++++++++++++++")
          if (res.res.length==0){
              this.siteList= []
              this.alladdres =[]
          }else {
              let siteList = res.res
              this.alladdres =res.res
              // siteList= JSON.parse(JSON.stringify(siteList).replace(/default/g,"defaultx"));
              for (let i in siteList){
                  if (siteList[i].default){
                      this.siteList = siteList[i]
                  }else {
                      this.siteList=[]
                  }
              }
          }

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
          this.addrList = false
          this.addrsspop= true
          this.addoramend = false
          this.ruleForm= {
              name: e.name,
              county__id: e.county__id,
              phone: e.phone,
              email: e.email,
              default: e.defaultx,
              address: e.address,
          }
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
