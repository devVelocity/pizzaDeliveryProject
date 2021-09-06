<template>
  <div id="page-background">
    <div class="banner-container">
        <div class="banner-logo">
          <div class="banner-text-container">
          <transition 
          appear 
          @before-enter="beforeEnter" 
          @enter="enter"
          @after-enter="afterEnter"
          >
            <h1 data-delay="0.5">The Cheese Ultimate is Back!</h1>
          </transition>
          <transition
          appear 
          @before-enter="beforeEnter" 
          @enter="enter"
          @after-enter="afterEnter"
          >
            <router-link data-delay="1" aria-label="Stores and Delivery" to="/stores-and-delivery" class="button-style1">See our In-Store / Delivery Options</router-link>
          </transition>
          <transition
          appear 
          @before-enter="beforeEnter" 
          @enter="enter"
          @after-enter="afterEnter"
          >
            <router-link data-delay="1.5" aria-label="Our Menu" to="/menu" class="button-style1">See our Menu</router-link>
          </transition>
          <br>
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
    <hr class="spacingHR1">
    <div class="section-container">
      <div class="section-element">
        <div class="section-1">
            <h1 class="pg-title">Welcome to The Pizza Company!</h1>
            <p>We are a chain of high-quality, small Pizza Shops in and around the North West of the UK</p>
        </div>
        <div class="section-2">
          <img src="../assets/images/content-images/menu-pizzas/itemId-1.jpg" alt="Pizza Image">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import gsap from 'gsap'
  import { Vue, setup } from 'vue-class-component'
  import ScrollTrigger from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger)

  export default{
    setup(){
      const beforeEnter = (el) => {
        console.log("Set Initial State")
        el.style.transform = 'translateY(60px)'
        el.style.opacity = 0
        el.style.pointerEvents = "none"
      }
      const enter = (el) => {
        console.log("enter")
        gsap.to(el,{
          y: 0,
          opacity: 1,
          duration: 1,
          delay: el.dataset.delay,
          onComplete: function(){
            el.style.pointerEvents = "all"
          }
        })

      }


      return { beforeEnter, enter }
    },
    data(){
      return{
        isDesktopDevice: false,
        scrollSetup: "top center",
        scrollSetup2: "center center"
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
      scrollTimeline(){
        // let tl = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".section-container",
        //     toggleActions:"play",
        //     start:"center center",
        //     markers: true,
        //   }
        // });

        // tl.from(".section-element img", {x: 200, opacity: 0, duration: 1.5})
        //   .from(".section-element h1",{y:100,opacity: 0, duration: 1}, "-=1")
        //    .from(".section-element p",{y:100,opacity: 0, duration: 1}, "+=0")
      
        gsap.to(".section-element img",{
          scrollTrigger:{
            trigger: ".section-container",
            start: this.scrollSetup,
            end: this.scrollSetup2,

            toggleActions:"play reverse none none",
            pin: "true",
            scrub: "true",
          },
          x:0,
          opacity: 1,
          duration: 1
        })

        gsap.to(".section-element h1",{
          scrollTrigger:{
            trigger: ".section-container",
            start: this.scrollSetup,
            end: this.scrollSetup2,


            toggleActions:"play reverse none none",
            pin: "true",
            scrub: "true",
          },
          y:0,
          opacity: 1,
          duration: 0.5
        })

        gsap.to(".section-element p",{
          scrollTrigger:{
            trigger: ".section-container",
            start: this.scrollSetup,
            end: this.scrollSetup2,

            toggleActions:"play reverse none none",
            pin: "true",
            scrub: "true",
          },
          y:0,
          opacity: 1,
          duration: 1
        })
      }
    },
    beforeMount() {
      window.addEventListener("load", this.testFunction());
    },
    mounted(){
      this.$root.getBasket(true);
      this.scrollTimeline()
      if(this.$root.mobileUserCheck() === true){
        this.scrollSetup = "top top"
      }
    },
  }
</script>

<style>

@import '../assets/styles/global.css';

</style>

<style scoped src='../assets/styles/pages/home.css'>
</style>
