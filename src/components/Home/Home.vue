<template>
  <el-container class="container">
    <el-header>
      <div class="logo-box">
        <img src="../../assets/images/heima.png" alt="">
        <span>jx电商后台管理</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggleBar" @click="collapse= !collapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :collapse-transition="false" :unique-opened="true" :router="true" :collapse="collapse">
          <el-submenu :index="item.id +''" v-for="(item, i) in asideList" :key="item.id" :style="collapse ? 'width: 64px' :'width: 200px'">
            <template slot="title">
              <i :class="['iconfont',iconList[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import mixins from './Home-mixins.js'
export default mixins
</script>
<style>
.container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  padding: 0px 20px 0px 10px;
}
.logo-box {
  user-select: none;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #fff;
}
.logo-box img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.el-aside {
  user-select: none;
  background-color: #333744;
  overflow: hidden;
}
.toggleBar {
  color: #fff;
  text-align: center;
  background-color: #4a5064;
  line-height: 25px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.1em;
}
</style>
