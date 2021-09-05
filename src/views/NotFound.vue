<template>
 <div id="orange-background">
  <transition>
   <div>
    <h1>404</h1>
    <h4>Not Found</h4>
    <h5>Sorry, that page is not available</h5>
    <router-link class="button-style1" to="/">Go to Homepage</router-link>
   </div>
  </transition>
 </div>
</template>

<script>
export default {
    mounted(){
        this.$root.getBasket(true)
    }
}
</script>

<style>

@import '../assets/styles/global.css';

</style>

<style scoped src='../assets/styles/pages/notFound.css'>
</style>