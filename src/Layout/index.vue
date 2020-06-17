<template>
  <div class="layout">
    <Header />
    <el-row class="tac flex">
      <el-col :span="6" class="flex-left">
        <el-menu
          :default-active="activeName"
          :router="true"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-home"></i>
              <span class="one-title">我的抖音号</span>
            </template>
            <el-menu-item-group class="two-floor">
              <el-menu-item index="home" :route="{ name: 'home' }"
                >个人信息</el-menu-item
              >
              <el-menu-item index="home" :route="{ name: 'home' }"
                >作品列表信息</el-menu-item
              >
              <el-menu-item index="home" :route="{ name: 'home' }"
                >粉丝统计分布</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="collection" :route="{ name: 'collection' }">
            <i class="el-icon-menu"></i>
            <span class="pseudo-elements one-title" slot="title">我的收藏</span>
            <!-- <i class="pseudo-elements"></i> -->
          </el-menu-item>
          <el-menu-item index="buy" :route="{ name: 'buy' }">
            <i class="el-icon-document"></i>
            <span class="one-title" slot="title">我的购物车</span>
          </el-menu-item>
          <el-menu-item index="order" :route="{ name: 'order' }">
            <i class="el-icon-setting"></i>
            <span class="one-title" slot="title">订单管理</span>
          </el-menu-item>
          <el-submenu index="5" class="position-5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="one-title">信息管理</span>
            </template>
            <el-menu-item-group class="two-floor">
              <el-menu-item index="management" :route="{ name: 'management' }"
                >账号信息</el-menu-item
              >
              <el-menu-item index="management" :route="{ name: 'management' }"
                >收货信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6" class="position-6">
            <template slot="title">
              <i class="el-icon-home"></i>
              <span class="one-title">视频管理</span>
            </template>
            <el-menu-item-group class="two-floor">
              <el-menu-item index="videoEdit" :route="{ name: 'videoEdit' }"
                >视频标签修改</el-menu-item
              >
              <!-- <el-menu-item index="homemm" :route="{ name: 'homemm' }"
                >作品列表信息</el-menu-item
              >
              <el-menu-item index="homemm" :route="{ name: 'homemm' }"
                >粉丝统计分布</el-menu-item
              > -->
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
import Header from "../components/Header";

export default {
  components: {
    Header
  },
  data() {
    return {
      //
      isStatus: false
    };
  },
  methods: {
    handleClick() {
      this.isStatus = !this.isStatus;
    }
  },
  computed: {
    activeName() {
      return this.$route.name;
    }
  },
  mounted() {
    console.log(this.$route.name);
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex !important;
  justify-content: space-between;
}
ul.el-menu {
  height: 100%;
}
.tac {
  max-width: 1200px;
  margin: 20px auto;
  /*margin-top: 20px;*/
}
.left_top {
  margin-top: 20px;
}
.flex-left {
  box-sizing: border-box;
  width: 220px !important;
  min-height: 100vh;
}
.flex-right {
  width: 960px !important;
}

/deep/.el-submenu__title,
/deep/.el-menu-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px !important;
}
/deep/.el-icon-arrow-down {
  position: relative;
  top: 0;
  right: 0;
  margin-top: 0;
}
/deep/.el-icon-home {
  margin-right: 0 !important;
}
/deep/.two-floor .el-menu-item {
  display: flex;
  align-items: center;
  // margin-left: 28px;
  text-indent: 28px;
}
/deep/.el-menu-item-group__title {
  padding: 0;
}
.one-title {
  padding-left: 15px;
  flex: 3;
}
.el-icon-menu {
  margin-left: -3px !important;
}
.el-icon-document {
  margin-left: -5px !important;
}
.el-icon-location {
  margin-left: -2px !important;
}
.el-icon-menu,
.el-icon-document,
.el-icon-setting,
.el-icon-location {
  margin-right: 0 !important;
}
/deep/.el-submenu__title i {
  color: #333333 !important;
  font-weight: 700;
}
.el-menu-vertical-demo > .is-active {
  background: linear-gradient(
    0deg,
    rgba(241, 252, 249, 1) 0%,
    rgba(237, 245, 253, 1) 100%
  );
}
.el-menu-vertical-demo > .is-active::after {
  content: "";
  position: absolute;
  top: 18px;
  left: 0;
  width: 4px;
  height: 20px;
  background: linear-gradient(
    0deg,
    rgba(4, 211, 145, 1) 0%,
    rgba(20, 127, 249, 1) 100%
  );
}
.position-5,
.position-6 {
  position: relative;
}
</style>
