<template>
    <div id="itemWrapper">
        <div id="itemContainer" style="margin-top: -10">
            <h1>{{ details[0] }}</h1>
            <!-- <hr> -->
            <!-- require('../assets/images/content-images/menu-pizzas/itemId-' + details[2] + '.jpg') -->
            <img class="pizza-image" v-bind:src="tryImage" :alt="details[0]">
            <p>{{ details[1] }}</p>
            <div class="itemBuyWindow buyWindowFlex">
                <h3>Buy Now</h3>
                <h2>{{ '£' + details[4] }}</h2>
                <h4>Available In-Store or Delivery</h4>
                <a class="orangeHyperLink">See Stores / Delivery</a>
                <br>
                <span><h4>Qty:</h4> <select class="dropdown-select" v-model="quantity">
                    <option selected>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select></span>
                <br>
                <router-link v-on:click="itemBought" class="buy-button" to="/menu">Add to Basket</router-link>
            </div>
            <br id="spacing-margin">
            <h1>Ingredients</h1>
            <p>{{ details[6] }}</p>
            <h1>Nutritional Info</h1>
            <a class="dropdown" v-bind:class="{ active: nutritionalDropdownDown }" >
                <h3 @click="nutritionalDropdownDown = !nutritionalDropdownDown">Nutrition Summary</h3>
                <div v-if="nutritionalDropdownDown" class="dropdown-wrapper">
                    <div class="nutritional-wrapper">
                        <span>
                            <h6> {{ details[8][0].energy }} kJ</h6>
                            <strong>Energy kJ ({{ details[8][0].energyRI }}% RI)</strong>
                        </span>
                        <span>
                            <h6> {{ details[8][0].energy2 }} kcal</h6>
                            <strong>Energy kcal ({{ details[8][0].energy2RI }}% RI)</strong>
                        </span>
                        <span>
                            <h6> {{ details[8][0].fat }}</h6>
                            <strong>Fat ({{ details[8][0].fatRI }}% RI)</strong>
                        </span> 
                    </div>
                    <div class="nutritional-wrapper">
                        <span>
                            <h6> {{ details[8][0].saturatedFat }}</h6>
                            <strong>Saturated Fat ({{ details[8][0].saturatedFatRI }}% RI)</strong>
                        </span>  
                        <span>
                            <h6> {{ details[8][0].sugars }}</h6>
                            <strong>Sugars ({{ details[8][0].sugarsRI }}% RI)</strong>
                        </span>          
                    </div>
                    <div class="nutritional-wrapper">
                        <span>
                            <h6> {{ details[8][0].salt }}</h6>
                            <strong>Salt ({{ details[8][0].saltRI }}% RI)</strong>
                        </span>             
                    </div>
                </div>
            </a>
            <a class="dropdown" v-bind:class="{ active : allergenDropdown}">
                 <h3 @click="allergenDropdown = !allergenDropdown">Allergen Info</h3>
                <div v-if="allergenDropdown" class="dropdown-wrapper">
                    <p>{{ details[7] }}</p>
                </div>
            </a>
            <br style="margin-bottom: 100px">
            <br style="margin-bottom: 100px">
        </div>
        <div class="itemBuyWindow">
            <h3>Buy Now</h3>
            <h2>{{ '£' + details[4] }}</h2>
            <h4>Available In-Store or Delivery</h4>
            <a class="orangeHyperLink">See Stores / Delivery</a>
            <br>
            <span><h4>Qty:</h4><select class="dropdown-select" v-model="quantity">
                <option selected>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select></span>
            <br>
            <router-link v-on:click="itemBought" class="buy-button" to="/menu">Add to Basket</router-link>
        </div>
    </div>
</template>

<script>
import defaultImage from '../assets/images/content-images/menu-pizzas/default.jpg'

export default {
    props:[ 'details' ],
    methods:{
        itemBought(){
            var self = this;
            if(sessionStorage.hasOwnProperty("itemId-" + this.details[2])){
                var existing = parseInt(sessionStorage.getItem("itemId-" + this.details[2]));
                sessionStorage.setItem("itemId-" + this.details[2], existing + parseInt(this.quantity));
            }else{
                sessionStorage.setItem("itemId-" + this.details[2], this.quantity);
            }
            self.$root.getBasket();
            self.$root.itemBoughtAlert();
        }
    },
    data(){
        return{
            quantity: 1,
            detailsName: this.details[0],
            detailsPrice: this.details[4],
            loadedquantity: null,
            nutritionalDropdownDown: false,
            allergenDropdown: false,
            imageSrc: null,
        }
    },
    computed:{
        tryImage(){
            try{
                return require('../assets/images/content-images/menu-pizzas/itemId-' + this.details[2] + '.jpg')
            }catch(e){
                return defaultImage
            }
        }
    }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/components/menuItemDisplay.css">

</style>