<template>
  <div id="app">
    <div class="g-header">
      <c-header/>
    </div>
    <div class="g-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/header/index';

export default {
  name: 'App',
  components:{
    CHeader
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #000;
}
.g-header{
  position: relative;
  width: 100vw;
  height: 8vh;
  z-index: 9;
}
.g-body{
  position: relative;
  height: 92vh;
}
</style>