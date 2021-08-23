<template>
  <div id="page-background">
    <div class="banner-container">
        <div class="banner-logo">
          <div class="banner-text-container">
          <h1 id="banner-animate-in-d0" v-bind:class="{ bannerRunAnimation: isDesktopDevice}">The Cheese Ultimate is Back!</h1>
          <br>
          <h3 id="banner-animate-in-d1" v-bind:class="{ bannerRunAnimation: isDesktopDevice}">Get the Ultimate Four Cheese Pizza either In-Store or by Delivery</h3>
          <router-link v-bind:class="{ bannerRunAnimation: isDesktopDevice}" aria-label="Stores and Delivery" to="/stores-and-delivery" id="banner-animate-in-d2" class="button-style1">See our In-Store / Delivery Options</router-link>
          <router-link v-bind:class="{ bannerRunAnimation: isDesktopDevice}" aria-label="Our Menu" to="/menu" id="banner-animate-in-d3" class="button-style1">See our Menu</router-link>
        </div>
        </div>
        <span class="dark-opacity-cover"></span>
        <img src="../assets/images/content-images/pizza-1.jpg" alt="Ultimate Cheese Pizza">
        <svg preserveAspectRatio="none" width="1094" height="533" viewBox="0 0 1094 533" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 533H1095V517C981 518 737.698 514.206 684 479C533 380 571 138 684 51C720.442 22.943 972.667 19.3333 1095 16V0H0V533Z"/>
        <defs>
          <linearGradient id="background-gradient">
            <stop offset="30%" stop-color="var(--gradientP1)" />
            <stop offset="130%" stop-color="var(--gradStop2)" />
          </linearGradient>
        </defs>
        </svg>
    </div>
    <div class="custom-shape-divider-top-1629669682">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            <defs>
              <linearGradient id="waves-gradient">
                <stop offset="30%" stop-color="var(--gradientP1)" />
                <stop offset="130%" stop-color="var(--gradStop2)" />
              </linearGradient>
            </defs>       
        </svg>
    </div>
  </div>
</template>


<script>
  export default{
    data(){
      return{
        isDesktopDevice: false,
      }
    },
    methods:{
      testFunction(){
        if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
          console.log("Mobile UserAgent");
        }else{
          console.log("Not a Mobile UserAgent");
          this.isDesktopDevice = true;
        };
      },
    },
    beforeMount() {
      window.addEventListener("load", this.testFunction());
    },
    mounted(){
      this.$root.getBasket(true)
    }
  }
</script>

<style>

@import '../assets/styles/global.css';

</style>

<style scoped src='../assets/styles/pages/home.css'>
</style>
