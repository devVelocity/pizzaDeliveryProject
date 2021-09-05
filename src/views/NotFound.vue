<template>
 <div id="orange-background">
  <transition appear @before-enter="beforeEnter" @enter="enter">
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