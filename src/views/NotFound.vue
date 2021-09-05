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