<template>
  <div id="header">
    <HeaderNav />
  </div>
  <div id="rview">
    <router-view></router-view>
  </div>
</template>

<style>
</style>

<script>
import HeaderNav from "~/components/HeaderNav.vue"

export default {
  components: {
    HeaderNav
  }
}
</script>