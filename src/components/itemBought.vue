<template>
    <div id="buyAlertContainer"  :class="{fadeIn: active},{fadeOut: !active}">
    <div class="innerContainer">
      <h2>Item added to Basket</h2>
      <br>
      <div class="progressBar">
        <span :class="{ barActive : active }"></span>
      </div>
      <br style="margin-bottom: 10px">   
      <router-link @click="active = false" to="/basket">View Basket</router-link>    
    </div>
  </div>
</template>

<script>
export default {
    props:[ 'active' ],
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/app.css">
</style>