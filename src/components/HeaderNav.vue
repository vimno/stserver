<template>
    <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      background-color="#545C64" text-color="#FFFFFF" active-text-color="#FFD04B" router>
      <el-menu-item index="0">
        <img width="150" height="150" src="../assets/logo.png" alt="St logo" />
      </el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item index="/">home</el-menu-item>
      <el-menu-item index="/view">view</el-menu-item>
      <el-menu-item index="/cluster">cluster</el-menu-item>
      <el-menu-item index="/helps">helps</el-menu-item>
      <el-menu-item index="/about">about</el-menu-item>
    </el-menu>
</template>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
.el-menu-demo{
  height: 10vh;
  width: 100vw;
  container-type: inline-size;
}
.el-menu-demo .el-menu-item{
  padding-right: 5vw;
  font-size: 1.3cqw;
  text-align: center;
}
</style>
<script>
export default {
  data() {
    return {
      active: "/"
    }
  }
}
</script>