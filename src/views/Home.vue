<template>
  <div class="home_body">
    <!--    <Headtop></Headtop>-->
    <div class="head">
      <div class="userinfo">
        <div class="img">
          <img :src="userinfo.avatar" />
        </div>
        <div class="user">
          <div class="nickName" >
            <div class="name_txt">昵称：{{userinfo.nickname}}</div>
            <div class="gender">
              <img v-if="userinfo.gender=='男'" src="../images/men.png"/>
              <img v-if="userinfo.gender=='女'" src="../images/Ms.png">
            </div>
          </div>
          <div class="addr">
            <div class="img">
              <img src="../images/adddrss.png"/>
            </div>
            <div>{{userinfo.address}}</div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="cont" v-for="(item, index) in infolist" :key="index">
          <div class="title">{{ item.title }}<span>（较昨日）</span></div>
          <div class="number">{{ item.number }}</div>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="data_map">
        <div class="data_title">
          <div class="tip">数据趋势图</div>
          <div class="btns">
            <div @click="navindex(index)" class="btn" :class="indexstag==index?'btn_active':''" v-for="(item,index) in titleList" :key="index">{{item.name}}</div>
          </div>
        </div>
        <div v-show="indexs==0" style="width: 100%;height: 300px" id="echarts1" class="user_echarts"></div>
        <div v-show="indexs==1" style="width: 100%;height: 300px" id="echarts2" class="user_echarts"></div>
<!--        <div v-show="indexs==2" style="width: 100%;height: 300px" id="echarts3" class="user_echarts"></div>-->
<!--        <div v-show="indexs==3" style="width: 100%;height: 300px" id="echarts4" class="user_echarts"></div>-->
<!--        <div v-show="indexs==4" style="width: 100%;height: 300px" id="echarts5" class="user_echarts"></div>-->

      </div>
    </div>
    <div class="works">
      <div class="title_x">作品列表信息</div>
      <div class="swiper" v-if="videoList">
        <div class=" page_x page_up " @click="pageUp">
          <img src="../images/page.png">
        </div>
        <div class="cont" v-for="(item,index) in videoList" :key="index">
          <div class="img">
            <img :src="item.cover">
          </div>
          <div class="info">
            <div class="title">{{item.title}}</div>
            <div class="time">{{item.create_time}}</div>
            <div class="operation">
              <div class="contx">
                <div class="logo">
                  <img src="../images/zan.png">
                </div>
                <div class="number">{{item.statistics.digg_count}}</div>
              </div>
              <div class="contx">
                <div class="logo">
                  <img src="../images/pin.png">
                </div>
                <div class="number">{{item.statistics.comment_count}}</div>
              </div>
              <div class="contx">
                <div class="logo">
                  <img src="../images/bof.png">
                </div>
                <div class="number">{{item.statistics.play_count}}</div>
              </div>

            </div>
          </div>
        </div>
        <div class="page_x page_next" @click="pageNext">
          <img src="../images/page.png">
        </div>
      </div>



    </div>

    <div class="fansinfo">
      <div class="fans_title">粉丝数据信息</div>
      <div class="fans_top">

        <div class="fans_left">

          <div class="fans_gender">{{gender_distributionsText}}</div>
          <div style="width:200px;height: 200px" id="gender_figure" class=""></div>
        </div>
        <div class="fans_right">
<!--          <div class="hui">-->
            <div class="title">{{age_distributionsText}}</div>
            <div style="width:400px;height: 257px" id="agenum" class=""></div>
<!--          </div>-->
        </div>
      </div>
      <div class="map_data">
        <div class="map_title">{{statxtnumz}}</div>
        <div style="width: 100%;height: 800px" id="map_portrait" class="map_portrait"></div>
      </div>

      <div class="phone_x">
        <div class="phone_left">
          <div class="title">{{statxtnum}}</div>
          <div style="width:440px;height: 440px" id="equipment" class=""></div>
        </div>
        <div class="phone_right">
          <div class="title">{{interest_distributionsText}}</div>
          <div style="width:440px;height: 440px" id="make" class=""></div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  // import Swiper from 'swiper'
  import "echarts/map/js/province/beijing";
  import 'echarts/map/js/china.js'
  import $echarts from "echarts";
  // import Headtop from "../../../Header/index";

  import { getInfo,getuserdata,uservideo,portrait,pagevideo  } from "../apis/info";

  export default {
    name: "Home",
    // components: {
    //   Headtop,
    //
    // },
    data() {

      return {
        infolist: [
          {
            title: "粉丝数",
            number: 100
          },
          {
            title: "评论数",
            number: 100
          },
          {
            title: "点赞数",
            number: 100
          },
          {
            title: "分享数",
            number: 100
          },
          {
            title: "作品数",
            number: 100
          }
        ],
        // dataList:[{
        //     name:'',
        //     datalist:[]
        // }],
        videoList:[],
        indexs:0,
        indexstag:0,
        titleList:[
          {
            name:'粉丝数'
          },
          {
            name:'评论数'
          },
          {
            name:"点赞数"
          },
          {
            name:'分享数'
          },
          {
            name:'总作品数'
          }
        ],
        userinfo:[],
        fans_data:[],
        dataList:[
          {
            name: "南海诸岛",
            value: 0
          },
          {
            name: '北京',
            value: 54
          },
          {
            name: '天津',
            value: 13
          },
          {
            name: '上海',
            value: 40
          },
          {
            name: '重庆',
            value: 75
          },
          {
            name: '河北',
            value: 13
          },
          {
            name: '河南',
            value: 83
          },
          {
            name: '云南',
            value: 11
          },
          {
            name: '辽宁',
            value: 19
          },
          {
            name: '黑龙江',
            value: 15
          },
          {
            name: '湖南',
            value: 69
          },
          {
            name: '安徽',
            value: 60
          },
          {
            name: '山东',
            value: 39
          },
          {
            name: '新疆',
            value: 4
          },
          {
            name: '江苏',
            value: 31
          },
          {
            name: '浙江',
            value: 104
          },
          {
            name: '江西',
            value: 36
          },
          {
            name: '湖北',
            value: 1052
          },
          {
            name: '广西',
            value: 33
          },
          {
            name: '甘肃',
            value: 7
          },
          {
            name: '山西',
            value: 9
          },
          {
            name: '内蒙古',
            value: 7
          },
          {
            name: '陕西',
            value: 22
          },
          {
            name: '吉林',
            value: 4
          },
          {
            name: '福建',
            value: 18
          },
          {
            name: '贵州',
            value: 5
          },
          {
            name: '广东',
            value: 98
          },
          {
            name: '青海',
            value: 1
          },
          {
            name: '西藏',
            value: 0
          },
          {
            name: '四川',
            value: 44
          },
          {
            name: '宁夏',
            value: 4
          },
          {
            name: '海南',
            value: 22
          },
          {
            name: '台湾',
            value: 3
          },
          {
            name: '香港',
            value: 5
          },
          {
            name: '澳门',
            value: 5
          }
        ],
        statxtnumz:'',
        BrokenLine:[
          {
            item1:[1,2,4],
            item2:[]
          },
          {
            item1:[],
            item2:[]
          },
          {
            item1:[],
            item2:[]
          },
          {
            item1:[],
            item2:[]
          },
          {
            item1:[],
            item2:[]
          },
        ],
        statxtnum:'',
        num:[],
        device_distributions:[],
          gender_distributions:[],
          gender_distributionsText:'',
          interest_distributions:[],
          interest_distributionsText:'',
          age_distributions:[],
          age_distributionsText:'',
        indexg:0//控制数据组
      };

    },

    watch: {
      //观察option的变化
      echarts1_option: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            if (newVal) {
              this.myChart.setOption(newVal);
            } else {
              this.myChart.setOption(oldVal);
            }
          } else {
            this.init();
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },

    mounted() {
        this.selportrait()
      this.GetRequest();
      this.Init();

      // this.swiper()
      this.Tiemtransition()





      // console.log(this.indexg)
      // let aaa =this.BrokenLine[this.indexg]

    },
    methods: {
        //年龄统计
      ageup(){
        this.$nextTick(function() {
          let agenum = this.$echarts.init(document.getElementById('agenum'))
            let sum = 0;
            let xinQu = [];
            let arr = [];
            let arrZhi = [];
            this.age_distributions.forEach(item=>{
                sum=sum+item.value
                xinQu.push(item.item)
                arr.push(item.value)
            })
            arr.forEach(item=>{
                let num =((item/sum)*100).toFixed(2)
                arrZhi.push(num)
            })
            //最大值
            let max = arrZhi[0];
            //最大值下标
            let index = 0;
            for (var i = 0; i < arrZhi.length; i++) {
                if (Number(max) < Number(arrZhi[i])) {
                    max = arrZhi[i];
                    index = i;
                }
            }
            this.age_distributionsText='年龄统计，'+xinQu[index]+'年龄最多，占比'+arrZhi[index]+'%'
          agenum.setOption({
            title: {

            },
            legend: {
              show:false
            },
            tooltip: {
              trigger: 'item',
                formatter:' {b} \n {c}%',
            },
            //xAxis: {data: [] },
            grid: {
              top: '60',
              left: '45',
              bottom: '65',
            },
            xAxis: [
              {
                type: 'category',
                data: xinQu,
                axisLine: {
                  lineStyle:{
                    color:'#CCCCCC',
                  },
                },
                axisLine:{
                  lineStyle:{
                    color:'#CCCCCC',
                  },
                },
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  textStyle: {
                    color: '#666666',//坐标值得具体的颜色
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitNumber: 2,
                min: 0,
                scale: true,
                axisLabel: {
                  show:true,
                  formatter: '{value}%',//给Y轴数值添加百分号
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    type:'dashed'
                  }
                },
                axisLine:{
                  show:false, //y轴线消失
                  lineStyle:{
                    color:'#666666',
                  }
                },
                axisTick: {
                  show:false //y轴坐标点消失
                },
              }
            ],

            series: [{
              name: "",
              type: 'bar',
              data: arrZhi,
              symbol: 'none',
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: '#137FF9',
                  barBorderRadius:[5,5,0,0]
                },
                emphasis:{
                  barBorderRadius:[5,5,0,0]
                }
              },
            }],
          })
        })
      },
      //兴趣分布统计
      makeOn(){
        this.$nextTick(function() {
            let sum = 0;
            let xinQu = [];
            let arr = [];
            let arrZhi = [];

          this.interest_distributions.forEach(item=>{
              sum=sum+item.value
              xinQu.push(item.item)
              arr.push(item.value)
          })
            arr.forEach(item=>{
                let num =((item/sum)*100).toFixed(2)
                arrZhi.push(num)
            })
            //最大值
            let max = arrZhi[0];
            //最大值下标
            let index = 0;
            for (var i = 0; i < arrZhi.length; i++) {
                if (Number(max) < Number(arrZhi[i])) {
                    max = arrZhi[i];
                    index = i;
                }
            }

            this.interest_distributionsText='兴趣分布统计，喜欢'+xinQu[index]+'行业的最多，占比'+arrZhi[index]+'%'
          let make = this.$echarts.init(document.getElementById('make'))
          make.setOption({
            title: {

            },
            legend: {
              show:false
            },
            tooltip: {
              trigger: 'item',
              formatter:' {b} \n {c}%',
            },
            //xAxis: {data: [] },
            grid: {
              top: '60',
              left: '45',
              bottom: '65',
            },
            xAxis: [
              {
                type: 'category',
                data: xinQu,
                axisLine: {
                  lineStyle:{
                    color:'#CCCCCC',
                  },
                },

                axisLine:{
                  lineStyle:{
                    color:'#CCCCCC',
                  },
                },
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                    interval:0,
                  textStyle: {
                    color: '#666666',//坐标值得具体的颜色

                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitNumber:2,
                min: 0,
                scale: true,
                axisLabel: {
                  show:true,
                  formatter: '{value}%',//给Y轴数值添加百分号
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    type:'dashed'
                  }
                },
                axisLine:{
                  show:false, //y轴线消失
                  lineStyle:{
                    color:'#666666',
                  }
                },
                axisTick: {
                  show:false //y轴坐标点消失
                },
              }
            ],

            series: [{
              name: "",
              type: 'bar',
              data: arrZhi,
              symbol: 'none',
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: '#04D3AA',
                  barBorderRadius:[5,5,0,0]
                },
                emphasis:{
                  barBorderRadius:[5,5,0,0]
                }
              },
            }],
          })
        })
      },
      //设备统计
      equipmentOn(endList){
        var dataendL=endList
        this.$nextTick(function() {
          let option = this.$echarts.init(document.getElementById('equipment'))

            let data=[]
            this.device_distributions.forEach(item=>{
              /*  data.push({
                    value: [12],
                    name: '其他',
                    itemStyle: {
                        normal: {
                            color: '#86b2fb'
                        }
                    },
                })*/
            })
          option.setOption({
            tooltip: {},
            legend: {
              data: [],
            },
            series: [
              {
                name: '',
                type: 'pie',
                radius: ['30%', '46%'],
                label: {
                  color: '#000000',
                  formatter: ' {b|{b}} \n {per|{d}%}',
                  rich: {
                    b: {
                      color: '#8c8c8c',
                      fontSize: 12,
                      lineHeight: 0,
                    },
                    per: {
                      color: '#000000',
                      fontSize: 12,
                    }

                  }
                },
                data: dataendL
              }
            ]
          })
        })
      },



      pageUp(){
        let num = this.num
        console.log(num)
        left: 0
        right: 1588527639000
        cursor_list: "0,1588527639000"
        let pams={
          cursor_list:num.cursor_list
        }
        let data={
          left:num.left,
          right:num.right
        }
        pagevideo(pams,data).then(res=>{

        }).catch(err=>{})


      },
      pageNext(){
        let num = this.num
        left: 0
        right: 1588527639000
        cursor_list: "0,1588527639000"
        let pams={
          cursor_list:num.cursor_list,
          right:num.right
        }
        let data={
          left:num.left,
          right:num.right
        }
        pagevideo(pams).then(res=>{

        }).catch(err=>{})
      },
      /*初始化swiper*/
      // swiper(){
      //   new Swiper('.swiper-container', {
      //     loop: true, // 循环模式选项
      //     // 如果需要分页器
      //     pagination: {
      //       el: '.swiper-pagination',
      //     },
      //   })
      //
      // },

      /*初始化echarts*/
      drawLine(){
          this.$nextTick(function() {


        let gender_figure = this.$echarts.init(document.getElementById('gender_figure'))
          let nan=0;
          let nv=0;
          this.gender_distributions.forEach(item=>{
              if(item.item=='1'){
                  nan=item.value
              }else if(item.item=='2'){
                  nv=item.value
              }
          })
              if(parseInt(nan)>parseInt(nv)){
                    let sum =(nan/(nan+nv))*100
                    this.gender_distributionsText='性别统计，男性粉丝居多，占比'+sum.toFixed(2)+'%'
              }else if(parseInt(nv)>parseInt(nan)){
                  let sum =(nan/(nan+nv))*100
                  this.gender_distributionsText='性别统计，女性粉丝居多，占比'+sum.toFixed(2)+'%'
              }else{
                  this.gender_distributionsText='性别统计，男性粉丝与女粉丝不相上下，同样占比50%'
              }

        gender_figure.setOption({

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            show:false
          },
          color:['#147FF9','#FD535F'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              // label: {
              //   show: false,
              //   position: 'center',
              // },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {value: nan, name: '男'},
                {value: nv, name: '女'},
              ]
            }
          ],
        })

          })
      },

      /*缓存jwt_token*/
      GetRequest() {

        // let jwt_token = localStorage.getItem('jwt_token');

        var url = window.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          let strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
        }
        localStorage.setItem('jwt_token',theRequest.jwt_token);
        console.log(localStorage.getItem('jwt_token'))

      },
      selportrait(){
        portrait().then(res=>{

          // let list = res.geographical_distributions
          // console.log(list)
          // let dataList = this.dataList
          let list = res.geographical_distributions
          let phoneF = res.device_distributions
          let dataphone= [
            {
              value: [10],
              name: '苹果',
              itemStyle: {
                normal: {
                  color: '#04d391'
                }
              },

            },
            {
              value: [10],
              name: '华为',
              itemStyle: {
                normal: {
                  color: '#14efd3'
                }
              }
            },
            {
              value: [12],
              name: 'OPPO',
              itemStyle: {
                normal: {
                  color: '#47d6f0'
                }
              },
            },
            {
              value: [12],
              name: 'VIVO',
              itemStyle: {
                normal: {
                  color: '#20aaea'
                }
              },
            },
            {
              value: [12],
              name: '三星',
              itemStyle: {
                normal: {
                  color: '#406fe8'
                }
              },
            },
            {
              value: [12],
              name: '其他',
              itemStyle: {
                normal: {
                  color: '#86b2fb'
                }
              },
            },
            {
              value: [12],
              name: '小米',
              itemStyle: {
                normal: {
                  color: '#6ee199'
                }
              },
            },
          ]


          let listnumber=[]
          var contnumber =0
          for (let i in phoneF){

              if (phoneF[i].item=='华为'||phoneF[i].item=='VIVO'||phoneF[i].item=='OPPO'||phoneF[i].item=='三星'||phoneF[i].item=='小米'||phoneF[i].item=='苹果'){
              }else {
                contnumber = Number(phoneF[i].value)+contnumber
              }
            for(let j in dataphone){
              if (phoneF[i].item==dataphone[j].name){
                dataphone[j].value=[phoneF[i].value]
              }
            }
          }

          for (let i in phoneF){
            if (phoneF[i].name=="其他"){
              phoneF[i].value=[contnumber]
            }
          }

          let endList = []
          for (let i in dataphone){
            // console.log(dataphone[i].value[0])
            if (dataphone[i].value[0]!=0){
              endList.push(dataphone[i])
            }


          }

          let maxnumber = Math.max.apply(Math, endList.map(function(o) {return o.value}))
          let contnum = 0
          let claLi=[]
          if(endList.length!=0){
            for(let i in endList){
              if (endList[i].value==maxnumber){
                claLi.push(endList[i])
              }
              contnum = Number(endList[i].value)+contnum
            }
              var statxtnum=''
            if (claLi.length==1){
              statxtnum =  '设备统计，'+claLi[0].name+'手机用户最多，占比'+ parseInt(maxnumber/contnum*100)+'%'
            }else {
              let txt =''
              for(let i in claLi){
                  txt = claLi[i].name+','
              }
              statxtnum =  '设备统计，'+txt+'手机用户最多，占比'+ parseInt(maxnumber/contnum*100)+'%'
            }
            this.statxtnum = statxtnum
            console.log(statxtnum)
          }




          this.device_distributions=res.device_distributions
          this.gender_distributions=res.gender_distributions
          this.interest_distributions=res.interest_distributions
          this.age_distributions=res.age_distributions
            this.drawLine()
            //年龄分布统计
            this.ageup()
            //兴趣分布统计
            this.makeOn();
            //设备统计
          this.equipmentOn(endList);
          // siteList= JSON.parse(JSON.stringify(list).replace(/default/g,"defaultx"));
          let dataList = this.dataList
          this.dataList.forEach(item => {
            list.forEach(cur => {
              if (item.name == cur.item) {
                item.value = cur.value
              }
            })
          })

          console.log(dataList)

          let dataListnum = Math.max.apply(Math, dataList.map(function(o) {return o.value}))
          console.log("最大数"+dataListnum)
          let datan = 0
          let claLin=[]
          if(dataList.length!=0){
            for(let i in dataList){
              if (dataList[i].value==dataListnum){
                claLin.push(dataList[i])
              }
              datan = Number(dataList[i].value)+datan
            }
            console.log("总人数"+datan)
            var statxtnumz=''
            if (claLin.length==1){
              statxtnumz =  '粉丝区域分布统计，'+claLin[0].name+'粉丝居多，占比'+ parseInt(dataListnum/datan*100)+'%'
            }else {
              let txt =''
              for(let i in dataList){
                txt = dataList[i].name+','
              }
              statxtnumz =  '粉丝区域分布统计，'+txt+'粉丝居多，占比'+ parseInt(dataListnum/datan*100)+'%'
            }
            this.statxtnumz = statxtnumz
            console.log(statxtnumz)
          }



          let map_portrait = this.$echarts.init(document.getElementById('map_portrait'))

          // let option = {
          //   series: [
          //     {
          //       name: "北京",
          //       type: "map",
          //       mapType: "北京",
          //       label: {
          //         normal: {
          //           show: true //显示省份标签
          //         },
          //         emphasis: {
          //           show: true //对应的鼠标悬浮效果
          //         }
          //       }
          //     }
          //   ]
          // };
          // map_portrait.setOption(option);

          map_portrait.setOption({
            tooltip: {
              triggerOn: "click",
              formatter: function(e, t, n) {
                return .5 == e.value ? e.name + "：粉丝分布" : e.seriesName + "<br />" + e.name + "：" + e.value
              }
            },
            visualMap: {
              orient: 'horizontal',
              left: 30,
              bottom:150,
              min: 0,
              max: 1000,
              showLabel: !0,
              text: ["高", "低"],
              pieces: [
                {
                  gt: 200,
                  // lte: 200,
                  label: "> 300 人",
                  color: "#147ff9"
                },
                {
                  gt: 100,
                  lte: 200,
                  label: "200 -300 人",
                  color: "#56a4fd"
                }, {
                  gte: 10,
                  lte: 100,
                  label: "100 - 200 人",
                  color: "#7bc1fd"
                }, {
                  gte: 1,
                  lt: 10,
                  label: "20-100人",
                  color: "#badffe"
                }, {
                  gt: 0,
                  lt: 1,
                  label: "0-1",
                  color: "e7f6fd"
                }, {
                  value: 0,
                  color: "#ffffff"
                }
              ],
              show: !0
            },
            geo: {
              map: "china",
              roam: !1,
              scaleLimit: {
                min: 1,
                max: 2
              },
              zoom: 1.23,
              top: 50,
              label: {
                normal: {
                  show: !0,
                  fontSize: "14",
                  color: "rgba(0,0,0,0.7)"
                }
              },
              itemStyle: {
                normal: {
                  //shadowBlur: 50,
                  //shadowColor: 'rgba(0, 0, 0, 0.2)',
                  borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                  areaColor: "#f2d5ad",
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  borderWidth: 0
                }
              }
            },
            series: [{
              name: "粉丝人数",
              type: "map",
              geoIndex: 0,
              data: this.dataList
            }]
          })

          // console.log(this.dataList)
          // console.log("===================================")
          // console.log(dataList)
          // for(let i in  dataList){
          //   for (let j in list){
          //       if (dataList[i].name==list[j].item){
          //         console.log(dataList[i].name)
          //         console.log(list[j].item)
          //         console.log(dataList[i].value)
          //         console.log(list[j].value)
          //         dataList[i].value = list[j].value
          //       }
          //   }
          // }
          // this.dataList =dataList
        }).catch(err=>{

        })
      },



      Init() {
        getInfo()
                .then(res => {
                  this.userinfo= res
                })
                .catch(err => {
                  console.log(err);
                });
        getuserdata().then(res=>{
          this.userData= res.today_item
          this.infolist[4].number=res.today_item
          this.infolist[3].number=res.today_share
          this.infolist[2].number=res.today_like
          this.infolist[1].number=res.today_comment
          this.infolist[0].number=res.today_fans



          this.fans_trend = res.user_fans
          //分享变化折线
          let user_share = res.user_share
          let share1 =[]
          let share2=[]
          let BrokenLine=this.BrokenLine
          for(let i in user_share){
            share1.push(user_share[i].date)
            share2.push(user_share[i].new_share)
          }
          BrokenLine[3].item1=share1
          BrokenLine[3].item2=share2


          //作品数变化
          let user_item = res.user_item
          let item1 = []
          let item2 = []
          for(let i in user_item){
            item1.push(user_item[i].date)
            item2.push(user_item[i].new_issue)
          }
          BrokenLine[4].item1=item1
          BrokenLine[4].item2=item2


          //点赞数变化
          let user_like = res.user_like
          let like1  = []
          let like2 = []
          for(let i in user_like){
            like1.push(user_like[i].date)
            like2.push(user_like[i].new_like)
          }
          BrokenLine[2].item1=like1
          BrokenLine[2].item2=like2
          //评论数变化
          let user_comment = res.user_comment
          let comment1  = []
          let comment2 = []
          for(let i in user_comment){
            comment1.push(user_comment[i].date)
            comment2.push(user_comment[i].new_comment)
          }
          BrokenLine[1].item1=comment1
          BrokenLine[1].item2=comment2

          //粉丝数变化
          let user_fans = res.user_fans
          let fans1  = []
          let fans2 = []
          for(let i in user_fans){
            fans1.push(user_fans[i].date)
            fans2.push(user_fans[i].total_fans)
          }
          BrokenLine[0].item1=fans1
          BrokenLine[0].item2=fans2


          this.BrokenLine = BrokenLine
          this.navindex()

          // this.Data_trend =res.user_fans
        }).catch(err=>{
          console.log(err)
        })

        //获取视频参数
        let data={
          count:4,
          cursor:0,
          cursor_list:'0'
        }

        uservideo(data).then(res=>{
          let num = res
          this.num = num
          for (let i in res.list){
            res.list[i].create_time =this.Tiemtransition(res.list[i].create_time)
          }
          this.videoList = res.list
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })


      },
      navindex(index) {

        let myChart
        if (!index) {
          index = 0
          // 基于准备好的dom，初始化echarts实例
          myChart = this.$echarts.init(document.getElementById('echarts1'))
        } else {
          myChart = null
          myChart = this.$echarts.init(document.getElementById('echarts1'))
        }
        let data1 = this.BrokenLine[index].item1,
                data2 = this.BrokenLine[index].item2;
        // 绘制图表
        let title=''
        if (index==0){
          title='粉丝数'
        }else if(index==1){
          title='评论数'
        }else if(index==2){
          title='点赞数'
        }else if(index==3){
          title='分享数'
        }else if(index==4){
          title='评论数'
        }else{
          title='总作品数'
        }
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['邮件营销']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: data1,
            axisLine: {
              lineStyle: {
                color: '#CCCCCC',
              },
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#666666', //坐标值得具体的颜色
              }
            }
          }],
          yAxis: [{
            type: 'value',
            splitNumber: 2,
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: false, //y轴线消失
              lineStyle: {
                color: '#666666',
              }
            },
            axisTick: {
              show: false //y轴坐标点消失
            },
          }],
          series: [{
            name: title,
            type: 'line',
            stack: '总量',
            symbol: 'circle', //拐点实心
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: '#428EFF',
                borderColor: '#428EFF', //拐点边框颜色
                background: '#428EFF',
              },
              emphasis: {
                color: '#428EFF',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: .1,
                  color: '#96C7FE'
                }, {
                  offset: 0.2,
                  color: '#96C7FE'
                }, {
                  offset: 0.7,
                  color: '#F5F9FE'
                }, {
                  offset: 0.7,
                  color: '#F5F9FE'
                }])
              }
            },
            data: data2
          }
          ]
        });
        this.indexstag =index
      },



      /*时间戳转换方法*/
      Tiemtransition(e){
        // var aaa = 123
        // let a = 1590461398
        var date = new Date(e * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        // let aa = Y+M+D+'  '+h+m+s;
        // console.log(aa)
        return  Y+M+D+'  '+h+m+s;



      }

    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/home.scss";
  .hui{
    margin-top: 50px;
  }
</style>
