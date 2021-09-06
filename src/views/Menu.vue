<template>
  <div id="page-background">
    <div id="mobileFilterButtons">
      <a class="mobileMenu" >
        <h3>Filter By</h3>
        <div class="mobileFilterContainer">
          <a @click="allFilter()" :class="{active : allMenuActive}">
            All Menu
          </a>
          <a @click="pizzaFilter()" :class="{active : isPizzaActive}">
            Pizzas
          </a>
          <a @click="drinkFilter()" :class="{active : isDrinkActive}">
            Drinks
          </a>
        </div>
      </a>
    </div>
    <div id="pageWrapperWrapper">
      <div id="pageWrapper1">
        <div class="menu-list-wrapper">
          <div class="menu-filter-grid">
            <a class="button-style2" v-on:click="allFilter()" :class="{active : allMenuActive}">All Menu</a>
            <hr>
            <h2>Filter By</h2>
            <a class="button-style2" v-on:click="pizzaFilter()" :class="{active : isPizzaActive}">Pizzas</a>
            <a class="button-style2" v-on:click="drinkFilter()" :class="{active : isDrinkActive}">Drinks</a>
          </div>
        </div>
        <div id="pageWrapper2">
          <!-- <div class="page-box">
            <h2>Page: <strong>{{ currentPage }}</strong></h2>
            <a :disabled="currentPage == 0" :class="{disabled: currentPage == 0}" @click="currentPage -= 1">Previous Page</a>
            <a :disabled="currentPage == totalPages" :class="{disabled: currentPage == totalPages}" @click="currentPage += 1">Next Page</a>
          </div> -->
          <div class="menu-grid" v-if="allMenuActive">
            <div v-for="item in getParsedArray().splice((currentPage * itemsPerPage), ((currentPage * itemsPerPage) + itemsPerPage))" class="menu-item">
              <div class="inYourBasket" v-if="getQuantity(item.itemId) > 0">
                <h2>{{getQuantity(item.itemId)}} in your basket</h2>
              </div>
              <div class="cover-background"></div>
              <img :src="tryImage(item.itemId)" :alt="item.name">
              <h1>{{ item.name }}</h1>
              <h3>{{ item.shortDetails }}</h3>
              <span style="margin-bottom: 30px"></span>
              <router-link class="button-style3" :to="'/menu/'+ item.itemId ">More Information</router-link>
            </div>
          </div>
          <div class="menu-grid" v-if="!allMenuActive">
            <!-- Pizza Filter -->
            <template v-for="item in getParsedArray().splice((currentPage * itemsPerPage), ((currentPage * itemsPerPage) + itemsPerPage))">
              <div class="menu-item" v-if="item.type==this.filterCriteria">
                <div class="inYourBasket" v-if="getQuantity(item.itemId) > 0">
                <h2>{{getQuantity(item.itemId)}} in your basket</h2>
                </div>
                <div class="cover-background"></div>
                <img :src="tryImage(item.itemId)" :alt="item.name">
                <h1>{{ item.name }}</h1>
                <h3>{{ item.shortDetails }}</h3>
                <span style="margin-bottom: 30px"></span>
                <router-link class="button-style3" :to="'/menu/'+ item.itemId ">More Information</router-link>
              </div>
            </template>
          </div>
          <div class="page-box">
            <h2>Page: <strong>{{ currentPage }}</strong></h2>
            <a :disabled="currentPage == 0" :class="{disabled: currentPage == 0}" @click="goToTop(),currentPage -= 1">Previous Page</a>
            <a :disabled="currentPage == totalPages" :class="{disabled: currentPage == totalPages}" @click="goToTop(),currentPage += 1">Next Page</a>
          </div>
        </div>
      </div>
      <br style="margin-bottom: 100px">
    </div>
  </div>
</template>

<script>
import menuDataItems from '../data/data.json';
import defaultImage from '../assets/images/content-images/menu-pizzas/default.jpg'
export default {
  data(){
    return{
      buyAlert: false,
      boughtBarTimeShown: 5000,
      jsonArray: null,
      grabId: null,
      allMenuActive: true,
      isPizzaActive: false,
      isDrinkActive: false,
      filterCriteria: null,
      isMobileFilterOpen: false,
      itemsPerPage: 4,
      totalPages: null,
      currentPage: 0,
      counter: 0,
      mobileUser: false,

    }
  },
  methods:{
    runBoughtCheckEnd(){
      this.buyAlert = false;
      sessionStorage.setItem("boughtItem", false)
    },
    runBoughtCheck(){
      var checkItem = sessionStorage.getItem("boughtItem")
      // console.log(checkItem)
      if(checkItem === "true"){
        this.buyAlert = true;
        setTimeout(this.runBoughtCheckEnd, (this.boughtBarTimeShown + 500))
        this.allFilter();
      }
    },
    getParsedArray(){
      this.jsonArray = JSON.parse(JSON.stringify(menuDataItems));
      return this.jsonArray
    },
    getPages(){
      var counter = 0
      for(const item in this.jsonArray){
        counter = counter + 1
      }
      this.totalPages = Math.ceil((counter / this.itemsPerPage))
      this.currentPage = 0
    },
    getPagesFilter(argumentId){
      var newArray = []
      var counter = 0
      this.totalPages = 0
      for(const item in this.jsonArray){
        if(this.jsonArray[item].type===String(argumentId)){
          counter = counter + 1
        }else{
          counter = counter
        }
      }
      console.log("aaaa", counter)
      if(counter > 1){
        this.totalPages = Math.ceil((counter / this.itemsPerPage))
      }else{
        this.totalPages = 0
      }
      this.currentPage = 0

      
    },
    tryImage(argumentId){
      try{
        var findImage = require('../assets/images/content-images/menu-pizzas/itemId-' + argumentId + '.jpg')
        return findImage
      }catch(e){
        return defaultImage
      }
    },

    allFilter(){
      this.totalPages = 0;
      this.allMenuActive = true;
      this.isPizzaActive = false;
      this.isDrinkActive = false;
      this.filterCriteria = null;
      this.getPages()
      sessionStorage.setItem('menuFiltered', null)
    },

    pizzaFilter(){
      this.allMenuActive = false;
      this.isPizzaActive = true;
      this.isDrinkActive = false;
      this.filterCriteria = 'pizza';
      this.getPagesFilter("pizza")
      sessionStorage.setItem('menuFiltered', 'pizza')
    },

    drinkFilter(){
      this.allMenuActive = false;
      this.isPizzaActive = false;
      this.isDrinkActive = true;
      this.filterCriteria = 'drink';
      this.getPagesFilter("drink");
      console.log(this.totalPages)
      sessionStorage.setItem('menuFiltered', 'drink')
    },

    runFilterCheck(){
      var getStorage = sessionStorage.getItem("menuFiltered");
      if(getStorage === null){
        this.allFilter();
      }else if(getStorage === 'pizza'){
        this.pizzaFilter();
      }else if(getStorage === 'drink'){
        this.drinkFilter();
      }else{
        // console.log('Error running filter')
      }
    },
    getQuantity(argumentId){
        var self = this;
        if(sessionStorage.getItem("itemId-" + argumentId)){
          var getQuantity = sessionStorage.getItem("itemId-" + argumentId);
          return getQuantity;
        }
    },
    goToTop(){
      window.scroll(0,0)
    },

  },
  mounted(){
    this.runBoughtCheck();
    this.runFilterCheck();
    this.getParsedArray();
    this.getPages();
    this.$root.getBasket(true);
    if(this.$root.mobileUserCheck() === true){
      this.mobileUser = true;
    }else{
      this.mobileUser = false;
    }
  },
  computed:{
    // tryImageComputed(){
    //   try{
    //     return require('../assets/images/content-images/menu-pizzas/itemId-' + ${item.itemId} + '.jpg')
    //   }catch(e){
    //     return defaultImage
    //   }
    // },
  }
}
</script>

<style>
    @import '../assets/styles/global.css';
</style>

<style scoped src='../assets/styles/pages/menu.css'>
</style>
