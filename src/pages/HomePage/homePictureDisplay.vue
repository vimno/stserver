<template>
      <div class="box">
          <h1>SPAtial Transcriptomic Analysis Data Analysis Platform</h1>
          <p id="stIntroduction">
            SPAtial Transcriptomic Analysis Data Analysis Platform is an integrated web server
            for accurate and flexible spatial mapping of user-uploaded single-cell RNA-seq (scRNA-seq) data.
            It is founded on a manually curated compilation of spatial transcriptomics datasets across diverse
            organs,
            developmental stages and pathological states.
          </p>
          <router-link to="/about"><el-button type="primary">Know more</el-button></router-link>
          <div><br></div>
      </div>
</template>

<style scoped>
div.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: auto;
  color: #ffffff;
  background-color: #010C3A;
  background-image: url('../../assets/index.png');
  background-repeat: no-repeat;
  background-size: 100vw;
  container-type: inline-size;
}
div.box h1{
  padding: 40px;
  font-size:40px;
}
p#stIntroduction{
  padding: 30px;
  font-size:20px;
  line-height: 2;
  text-indent: 4ch;
}
.el-button{
  width: 150px;
  height: 50px;
  font-size:20px;
}

p{
  color: white;
}
</style>

<script lang="ts" setup>
</script>
