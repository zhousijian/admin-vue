<!--
&lt;!&ndash;
<template>
    <div class="left_cont">

        <el-row class="tac">
            &lt;!&ndash;<el-col :span="12">
                <h5>默认颜色</h5>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-col>&ndash;&gt;
            <el-col :span="12">
                <h5>自定义颜色</h5>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#ccc"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <div class="title_c" v-if="false">
            <div class="title_z"></div>
            <div class="title_a">
                <div class=""></div>
            </div>

        </div>
    </div>
</template>
&ndash;&gt;

<template>
    <div class="layout">
        <Header />
        <el-row class="tac">
            <el-col :span="6">
                <el-menu default-active="1" :router="true" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>我的抖音号</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" :route="{name: 'management'}">个人信息</el-menu-item>
                            <el-menu-item index="1-2" :route="{name: 'collection'}">作品列表信息</el-menu-item>
                            <el-menu-item index="1-3" :route="{name: 'collection'}">粉丝统计分布</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2" :route="{name: 'collection'}">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="3" :route="{name: 'buy'}">
                        <i class="el-icon-document"></i>
                        <span slot="title">我的购物车</span>
                    </el-menu-item>
                    <el-menu-item index="4" :route="{name: 'order'}">
                        <i class="el-icon-setting"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="18">
                <router-view />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '../components/Header';
    export default {
        name: "index",
        components: {
            Header
        },
        data(){
            return{
                titleList: [
                    {
                        name:'我的抖音号',
                        imga:'../images/mydxz.png',
                        imgb:'../images/mydwxz.png',
                        title:[
                            {
                                names:'个人信息',
                            },
                            {
                                names: '作品列表信息'
                            },
                            {
                                names: '粉丝统计分布'
                            }

                        ]

                    },
                    {
                        name:'我的收藏',
                        imga:'../images/mysc.png',
                        imgb:'../images/mydwsc.png',
                        title:[
                        ]

                    },
                    {
                        name:'我的购物车',
                        imga:'../images/mycarz.png',
                        imgb:'../images/mycarw.png',
                        title:[
                        ]

                    },
                    {
                        name:'订单管理',
                        imga:'../images/orderz.png',
                        imgb:'../images/orderw.png',
                        title:[
                        ]

                    },
                    {
                        name:'账号管理',
                        imga:'../images/zhz.png',
                        imgb:'../images/zhw.png',
                        title:[
                            {
                                names:'账号信息',
                            },
                            {
                                names: '收货信息'
                            },
                        ]

                    }
                ]
            }
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
.left_cont{
    /*width: 18.33%;*/
    .title_c{
        font-size: 1.1428rem;
        .title_z{

        }
        .title_a{

        }
    }
}
.el-submenu{
    width: 100%;
}
</style>
-->
