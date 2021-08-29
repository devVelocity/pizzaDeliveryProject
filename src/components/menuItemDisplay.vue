<template>
    <div id="itemWrapper">
        <div id="itemContainer" style="margin-top: -10">
            <h1>{{ details[0] }}</h1>
            <!-- <hr> -->
            <!-- require('../assets/images/content-images/menu-pizzas/itemId-' + details[2] + '.jpg') -->
            <img class="pizza-image" v-bind:src="tryImage" :alt="details[0]">
            <p>{{ details[1] }}</p>
            <div class="itemBuyWindow buyWindowFlex" :class="{ shrink : getQuantity(this.itemId) > maxItems}">
                <div>
                    <span v-if="getQuantity(this.itemId) < maxItems">
                        <h4>Available In-Store or Delivery</h4>
                        <a class="orangeHyperLink">See Stores / Delivery</a>
                        <br>
                    </span>
                    <span v-if="getQuantity(this.itemId) < maxItems">
                        <span><h4>Qty:</h4> <select class="dropdown-select" v-model="quantity">
                            <option v-for="item in parseInt(maxItems)" selected="1"> {{item}} </option>
                        </select></span>
                        <br>
                        <router-link v-on:click="itemBought" class="buy-button" to="/menu">Add to Basket</router-link>
                    </span>
                    <span v-if="getQuantity(this.itemId) > maxItems">
                        <h3>Sorry! You have reached the maximum quantity for this item </h3>
                        <router-link class="buy-button maxed" to="/basket">See Basket</router-link>
                    </span>
                </div>
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
        <div class="itemBuyWrapper">
            <div class="itemBuyWindow" :class="{ shrink : getQuantity(this.itemId) > maxItems}">
                <div>
                    <span v-if="getQuantity(this.itemId) < maxItems">
                        <h4>Available In-Store or Delivery</h4>
                        <a class="orangeHyperLink">See Stores / Delivery</a>
                        <br>
                    </span>
                    <span v-if="getQuantity(this.itemId) < maxItems">
                        <span><h4>Qty:</h4> <select class="dropdown-select" v-model="quantity">
                            <option v-for="item in parseInt(maxItems)" selected="1"> {{item}} </option>
                        </select></span>
                        <br>
                        <router-link v-on:click="itemBought" class="buy-button" to="/menu">Add to Basket</router-link>
                    </span>
                    <span v-if="getQuantity(this.itemId) > maxItems">
                        <h4>Sorry! You have reached the maximum quantity for this item </h4>
                        <router-link class="buy-button maxed" to="/basket">See Basket</router-link>
                    </span>
                </div>
            </div>
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
        },

        getQuantity(argumentId){
            if(sessionStorage.getItem("itemId-" + argumentId)){
                return sessionStorage.getItem("itemId-" + argumentId)
            }
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
            maxItems: null,
            itemId: this.details[2]
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
    },
    mounted(){
        this.maxItems = this.$root.maxAmountItems;
        this.itemId = this.details[2]
    }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/components/menuItemDisplay.css">

</style>