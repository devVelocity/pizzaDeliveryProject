<template>
 <div id="orange-background">
  <div class="flexDivider">
   <transition-group class="flexLeft" tag="div" appear @before-enter="beforeEnter" @enter="enter">
    <h1 key="1" data-x="true" data-delay="0.2">404</h1>
   </transition-group>
   <transition-group class="flexRight" tag="div" appear @before-enter="beforeEnter" @enter="enter">
    <h4 key="1" data-delay="0.2">Not Found</h4>
    <h5 key="2" data-delay="0.5">Sorry, that page is not available</h5>
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
            if(el.dataset.x === "true"){
                el.style.transform = 'translateX(-60px)'
                el.style.opacity = 0
                el.style.pointerEvents = "none"     
            }else{
                el.style.transform = 'translateY(60px)'
                el.style.opacity = 0
                el.style.pointerEvents = "none"
            }
        }
        const enter = (el) => {
            if(el.dataset.x === "true"){
                gsap.to(el, {
                    x: 0,
                    opacity: 1,
                    delay: el.dataset.delay,
                    onComplete: () => {
                        el.style.pointerEvents = "all"
                    }
                })
            }else{
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    delay: el.dataset.delay,
                    onComplete: () => {
                        el.style.pointerEvents = "all"
                    }
                })
            }
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