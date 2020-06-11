<template>
  <div id="app">
<!--    <headerx></headerx>-->
<!--    <div class="html_con">-->
<!--&lt;!&ndash;      <div class="">&ndash;&gt;-->
<!--&lt;!&ndash;        <lefta></lefta>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="">&ndash;&gt;-->
<!--        <router-view />-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </div>-->
      <router-view />
  </div>
</template>
<script>
  // import lefta from './components/leftclass/index'
  // import headerx from './components/Header/index'
  export default {
    // components:{
    //   lefta,
    //   headerx
    // }
  }

</script>
<style>
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
  html{
    font-size: 14px;
    background-color: #EFEFEF;
  }
  body{
      margin: 0;
  }
  .html_con{
    display: flex;
    max-width: 1200px;
    margin: auto;
    justify-content: space-between;
  }
  /*.body{*/
  /*  width: 80%;*/
  /*}*/
  .content{
    width: 100% !important;
  }
  .body{
    width: 100% !important;
  }
</style>
