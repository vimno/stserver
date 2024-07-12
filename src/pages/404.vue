<template>
  <div id="notFound">
    <el-result
        icon="warning"
        title="404 NOT FOUND!"
        sub-title="Unable to open this page."
      >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">Return Home</el-button>
      </template>
    </el-result>
    
  </div>

</template>
<style scoped>
#notFound{
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>