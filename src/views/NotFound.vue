<template>
 <div id="orange-background">
  <div class="flexDivider">
   <transition-group class="flexLeft" tag="div" appear @before-enter="beforeEnter" @enter="enter">
    <h1 key="1" data-delay="0.5">404</h1>
   </transition-group>
   <transition-group class="flexRight" tag="div" appear @before-enter="beforeEnter" @enter="enter">
    <h4 key="1" data-delay="0.5">Not Found</h4>
    <h5 key="2" data-delay="1">Sorry, that page is not available</h5>
    <router-link data-delay="1" key="3" class="button-style1" to="/">Go to Homepage</router-link>
   </transition-group>
  </div>
 </div>
</template>

<script>
import gsap from 'gsap'

export default {
    mounted(){
        this.$root.getBasket(true)
    },
    setup(){
        const beforeEnter = (el) => {
            console.log("before enter");
            el.style.transform = 'translateY(60px)'
            el.style.opacity = 0
            el.style.pointerEvents = "none"
        }
        const enter = (el) => {
            console.log("enter")
            gsap.to(el, {
                y: 0,
                opacity: 1,
                delay: el.dataset.delay,
                onComplete: () => {
                    el.style.pointerEvents = "all"
                }
            })
        }
        return {beforeEnter, enter}
    }
}
</script>

<style>

@import '../assets/styles/global.css';

</style>

<style scoped src='../assets/styles/pages/notFound.css'>
</style>