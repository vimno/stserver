<template>
  <div class="box">
    <PictureDisplay />
    <HomeForm></HomeForm>
  </div>
</template>

<style scoped>
div.box{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload{
  display: flex;
}
.background1 {
  position: relative;
  height: 900px;
  background-color: #010C3A;
}
.background2{

display: -webkit-flex;
display: flex;
-webkit-flex-wrap: wrap;
flex-wrap: wrap;
-webkit-align-content: center;
align-content: center;
height: 900px;
background-color: #010C3A;
}
.upload{
  background: #010C3A;
  width: 700px;
  height: 600px;
  position: absolute;
  left: calc(50% - 350px);
  top: calc(50% - 300px)
}

</style>

<script>
import PictureDisplay from '~/pages/HomePage/homePictureDisplay.vue'
import HomeForm from '~/pages/HomePage/homeForm.vue'
export default {
  components: {
    PictureDisplay,
    HomeForm
  }
}
</script>