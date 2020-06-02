<template>
<div class="layout">
  <Header />
  <el-row class="tac flex">
    <el-col :span="6" class="flex-left">
      <el-menu :default-active="activeName" :router="true" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-home"></i>
            <span>我的抖音号</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="home" :route="{name: 'home'}">个人信息</el-menu-item>
            <el-menu-item index="home" :route="{name: 'home'}">作品列表信息</el-menu-item>
            <el-menu-item index="home" :route="{name: 'home'}">粉丝统计分布</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="collection" :route="{name: 'collection'}">
          <i class="el-icon-menu"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="buy" :route="{name: 'buy'}">
          <i class="el-icon-document"></i>
          <span slot="title">我的购物车</span>
        </el-menu-item>
        <el-menu-item index="order" :route="{name: 'order'}">
          <i class="el-icon-setting"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
          <el-submenu index="5">
              <template slot="title">
                  <i class="el-icon-location">
                  </i>
                  <span>信息管理</span>
              </template>
              <el-menu-item-group>
                  <el-menu-item index="management" :route="{name: 'management'}">账号信息</el-menu-item>
                  <el-menu-item index="management" :route="{name: 'management'}">收货信息</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
      </el-menu>

    </el-col>
    <el-col :span="18" class="flex-right">
      <router-view />
    </el-col>
  </el-row>
</div>
</template>

<script>
import Header from '../components/Header';

export default {
  components: {
    Header
  },
  data() {
    return {
      //
    }
  },
  computed: {
    activeName() {
        return this.$route.name
    }
  },
  mounted() {
    console.log(this.$route.name)
  }
}
</script>
<style>
    .flex {
        display: flex !important;
        justify-content: space-between;
    }
    ul.el-menu {
        height: 100%;
    }
  .tac{
    max-width: 1200px;
    margin: 20px auto;
    /*margin-top: 20px;*/
  }
  .left_top{
    margin-top: 20px;
  }
  .flex-left {
      box-sizing: border-box;
    width: 220px !important;
      min-height: 100vh;
  }
    .flex-right{
        width: 960px !important;
    }

    .el-menu-item.is-active .el-icon-document:before{

    }
</style>
