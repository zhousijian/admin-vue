<template>
  <div class="body">
    <div class="content">
      <div class="user_info">
        <div class="info">
          <div class="info_tip">账号信息</div>
          <el-button type="text" @click="dialogFormVisible = true">
            <div class="img_bnt" >
            <div class="img">
              <img src="../images/editor.png">
            </div>
            <div class="btn">编辑</div>
          </div>
          </el-button>


          <el-dialog  customClass="customWidth"   title="修改账户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="账户昵称" :label-width="formLabelWidth">
                <el-input  v-model="form.nick_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属行业" :label-width="formLabelWidth">
                <el-select v-model="value1" placeholder="请选择" @change="selectChanged">
                  <el-option
                          v-for="item in industrylist"
                          :key="item.industry_id"
                          :label="item.industry_name"
                          :value="item.industry_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="绑定邮箱" :label-width="formLabelWidth">

                <el-input v-model="form.email" >
<!--                  <template slot="append" >发送验证码</template>-->
                  <el-button type="primary" slot="append" @click="sende()" > 发送验证码</el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="邮箱验证码" :label-width="formLabelWidth">
                <el-input v-model="form.verify_email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="绑定手机" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off">
                  <el-button type="primary" slot="append" @click="authCode()"> 发送验证码</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="手机验证码" :label-width="formLabelWidth">
                <el-input v-model="form.verify_mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="popcancel">取 消</el-button>
              <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
          </el-dialog>

        </div>
        <div class="user">
          <div class="nickname">账户昵称<span>{{userinfo.nick_name}}</span></div>
          <div class="industry">所属行业<span>{{userinfo.industry_name}}</span></div>
          <div class="email">绑定邮箱
            <span v-if="!userinfo.email">暂无信息</span>
            <span v-if="userinfo.email">{{userinfo.email}}</span>
          </div>
          <div class="phone">绑定手机
            <span v-if="!userinfo.mobile">暂无信息</span>
            <span v-if="userinfo.mobile">{{userinfo.mobile}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="user_info">
        <div class="info">
          <div class="info_tip">收货信息</div>
          <el-button type="text" @click="addrsspopclk">
            <div class="img_bnt" >
              <div class="img">
                <img src="../images/add.png">
              </div>
              <div class="btn">新增收货地址</div>
            </div>
          </el-button>



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
        </div>
        <div class="user" v-if="siteList.length==0">
          <div class="nothing">您的收货信息空空如也，快点<el-button type="text" @click="addrsspopclk"><span class="addx">添加</span></el-button>您的收货信息吧</div>
        </div>


        <div class="man_cont" v-else>
          <el-table
                  :data="siteList"
                  style="width: 100%">
            <el-table-column
                    prop="name"
                    label="收件人"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话"
                    width="180">
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
                    label="默认地址"
                    align="center">
              <template slot-scope="scope">
              <el-switch active-color="#13ce66"align="center"
                         @change="changeswi(scope.row)"
                         v-model="scope.row.defaultx"></el-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>








<!--    <div id="addressHorizontalSelect">-->
<!--        <el-row>-->
<!--         <el-col-->
<!--                :span="span">-->
<!--          <el-select-->
<!--                 size="small"-->
<!--                 v-model="provinceCode"-->
<!--                 @focus="getProvinces"-->
<!--                 @change="changeProvince"-->
<!--                 :placeholder="$t('省')"-->
<!--                 filterable>-->
<!--           <el-option-->
<!--                  v-for="item in provinceList"-->
<!--                  :key="item.provinceCode"-->
<!--                  :label="item.provinceName"-->
<!--                  :value="item.provinceCode">-->
<!--           </el-option>-->
<!--          </el-select>-->
<!--         </el-col>-->
<!--         <el-col-->
<!--                :span="span"-->
<!--                v-if="!hideCity">-->
<!--          <el-select-->
<!--                 size="small"-->
<!--                 v-model="cityCode"-->
<!--                 @focus="getCities"-->
<!--                 @change="changeCity"-->
<!--                 :placeholder="$t('市')"-->
<!--                 filterable>-->
<!--           <el-option-->
<!--                  v-for="item in cityList"-->
<!--                  :key="item.cityCode"-->
<!--                  :label="item.cityName"-->
<!--                  :value="item.cityCode">-->
<!--           </el-option>-->
<!--          </el-select>-->
<!--         </el-col>-->
<!--         <el-col-->
<!--                :span="span"-->
<!--                v-if="!hideCity && !hideArea">-->
<!--          <el-select-->
<!--                 size="small"-->
<!--                 v-model="areaCode"-->
<!--                 @focus="getAreas"-->
<!--                 @change="changeArea"-->
<!--                 :placeholder="$t('区/县')"-->
<!--                 filterable>-->
<!--           <el-option-->
<!--                  v-for="item in areaList"-->
<!--                  :key="item.areaCode"-->
<!--                  :label="item.areaName"-->
<!--                  :value="item.areaCode">-->
<!--           </el-option>-->
<!--          </el-select>-->
<!--         </el-col>-->
<!--        </el-row>-->
<!--       </div>-->


  </div>
</template>

<script>
  import {
    userinfo,
    industry,
    femail,
    phoneCode,
    seladdress,
    infoamend,
    address,
    Addrss,
    amendaddress,
    deleteadrs,
    carDelete
  } from "../apis/info";
export default {
  name: "management",
  // props: {
  //   hideCity: { // 隐藏市
  //     type: Boolean,
  //     default: false
  //   },
  //   hideArea: { // 隐藏区/县
  //     type: Boolean,
  //     default: false
  //   },
  //   addressCode: null // 地址编码
  // },
  //
  // model: {
  //   prop: 'addressCode',
  //   event: 'addressSelect'
  // },
  data(){

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


    return{
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value:'',
      valuea:'',
      valueb:'',
      valuec:'',

      addoramend:true,

      siteList:[],
      /*tableData: [
              {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],*/

      valuebx:110000,
      valuecx:0,
      secondarylist:[],
      onlist:[],
      threelist:[],





    industrylist:[],
      value1: '',
      provinceList: [], // 省份列表
      cityList: [], // 城市列表
      areaList: [], // 区/县列表
      provinceCode: '', // 省份编码
      cityCode: '', // 城市编码
      areaCode: '', // 区/县编码
      cityFlag: false, // 避免重复请求的标志
      provinceFlag: false,
      areaFlag: false,



      userinfo:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      addrsspop:false,
      form: {
        nick_name: '',
        email:'',
        mobile:'',
        industry:0,
        verify_email:'',
        verify_mobile:'',

      },
      ruleForm: {
        name: '',
        county__id: 0,
        phone: '',
        email: '',
        default: false,
        address: '',
      },
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

      formLabelWidth: '120px',
    }
  },
  computed: {
    span () {
      if (this.hideCity) {
        return 24
      }
      if (this.hideArea) {
        return 12
      }
      return 8
    }
  },

  watch: {
  },

  created () {
    // this.getProvinces()
  },
  methods:{

    addrsspopclk(){

      this.addrsspop=true
      this.addoramend = true
    },

    select(){
      userinfo().then(res=>{
        let userinfo = res
        this.userinfo = userinfo
        this.form.nick_name = userinfo.nick_name
        this.form.industry =userinfo.industry
        this.form.email=userinfo.email
        this.form.mobile=userinfo.mobile
        this.value1 =userinfo.industry_name
        // console.log( this.form)
        // this.form.
      }).catch(err=>{

      })
    },
/*修改为默认地址*/
    changeswi(e){

      let params= {
        address_id:e.id
      }
      let data = {
        name: e.name,
        county__id: e.county__id,
        phone: e.phone,
        email: e.email,
        default: e.defaultx,
        address: e.address,
      }
      console.log(data)
      this.amendadrs(params,data)

    },


    amendadrs(e,n){
      amendaddress(e,n).then(res=>{
        this.adrchaxun()
      }).catch(err=>{

      })
    },

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

    deleteall(){
      this.ruleForm={
        name: '',
        county__id: 0,
        phone: '',
        email: '',
        default: false,
        address: '',
      }
    },
  //  查询用户平台信息
    seletuser(){
      this.select()
      this.adrchaxun()




      industry().then(res=>{
        let industrylist = res.res
        this.industrylist = industrylist
      }).catch(err=>{

      })

      //查询收货地址列表


    },

    adrchaxun(){
      seladdress().then(res=>{
        let siteList = res.res
        siteList= JSON.parse(JSON.stringify(siteList).replace(/default/g,"defaultx"));
        console.log(siteList)
        this.siteList = siteList

      }).catch(err=>{

      })
    },


    selectChanged(value1){

      this.form.industry = value1
      console.log(value1)
    },
    //修改用户信息
    onSubmit() {
      let data = this.form

      infoamend(data).then(res=>{

        if (res.error){
          this.$message.error(res.error);
        }else {
          this.dialogFormVisible=false
          this.select()
        }

      }).catch(err=>{
        console.log(err)

      })


      console.log(this.form);
    },
    popcancel(){
      this.dialogFormVisible=false
      this.form.verify_email=''
      this.form.verify_mobile=''
    },

    //发送手机验证码
    authCode(){
      let data ={
        mobile:this.form.mobile
      }
      console.log(this.form)
      phoneCode(data).then(res=>{

      }).catch(err=>{})

    },

    //邮箱发送验证码
    sende(){
      let date = {
        email:this.form.email
      }
      femail(date).then(res=>{

      }).catch(err=>{})

    },


    reserveadd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let data = this.ruleForm

            Addrss(data).then(res=>{
              this.addrsspop= false
              this.adrchaxun()
            }).catch(err=>{

            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    // reserveadd(formName){
    //   console.log(this.ruleForm)
    //   let data = this.ruleForm
    //
    //   Addrss(data).then(res=>{
    //
    //   }).catch(err=>{
    //
    //   })
    // },

//一级地区
//     addl(){
//
//     },
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

    handleadd(e){
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

    //查询地区分类
    layered(){
      let data={
        level:2
      }
      address(data).then(res=>{
        let laylist = res.result
        this.onlist= laylist
      }).catch(err=>{

      })
    },

    /*编辑信息*/
    editor(){

    }

  },
  mounted() {

    // this.stair(value)
    // this.secondary(value)
    // this.threeLevel(value)
    this.seletuser()
    this.layered()
    // console.log(this.ChineseDistricts['86'].lenght)

    // for (let i in this.ChineseDistricts['86']){
    //      console.log(i)
    //   console.log(this.ChineseDistricts['86'][i])
    // }
  }
};
</script>

<style lang="scss" scoped>
  @import "../scss/management.scss";
  .el-dialog .customWidth{
    width: 500px;
  }
  .el-dialog{
    width: 500px !important;
  }
  .man_bg{
    display: flex;
    justify-content: space-between;
  }
  .content{
    width: 80%;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 40px 38px;
    /*margin-top: 20px;*/
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    .user_info{

      .info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info_tip{
          font-size: 1.1428rem;
          color: #333333;
        }
        .img_bnt{
          display: flex;
          align-items: center;
          .img{
            width: 12px;
            height: 12px;
            /*background-color: #CCCCCC;*/
          }
          .btn{
            margin-left: 2px;
            font-size: 1rem;
            color: #147FF9;
          }
        }

      }
      .user{
        margin-left: 316px;
        margin-top: 20px;
        .nothing{
          margin: auto;
          font-size: 1rem;
          color: #666666;
          .addx{
            margin: 0 3px;
            background-color: #147FF9;
            color: #ffffff;
            padding: 0 3px;
            border-radius: 4px;
          }
        }
        div{
          color: #333333;
          font-size: 1rem;
          margin-bottom: 37px;
          span{
            color: #999999;
            margin-left: 29px;
          }
        }
      }
    }
  }
</style>
