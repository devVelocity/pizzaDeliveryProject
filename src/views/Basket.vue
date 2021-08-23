<template>
  <div id="page-background" style="margin-top: 5px">
    <div id="centralContainer">
        <div id="shop-basket-container">
            <h1 :class="{ noItems : basketItems === 0}">Shopping Basket</h1>
            <h3 v-if="basketItems != 0" class="itemsDisplay">{{ basketItems }} Items</h3>
            <h2 v-if="basketItems === 0" class="noItems2">You dont have any items in your basket. <router-link class="light-button" to="/menu">Add some items</router-link></h2>
        </div>
        <div id="shoppingContainer">
            <div id="itemColumn">
                <div class="item" v-for="item in includedItems">
                    <span class="imageCover"></span>
                    <img :src="tryImage(item.itemId)">
                    <div class="section-1">
                        <h1>{{item.name}}</h1>
                        <h1>{{getQuantity(item.itemId)}}</h1>
                    </div>
                    <div class="section-2"></div>
                </div>
            </div>
            <div v-if="basketItems != 0" id="stickyColumn">
                <div id="stickyItem">
                    <h2>Discount Codes</h2>
                    <input v-model="discountCodes">
                    <h4 class="codeAppliedButton" v-if="codeApplied != 0" :class="{codeApplied : codeApplied === 1}, {codeDenied : codeApplied === 2}">Hello</h4>
                    <hr>
                    <h2>Total</h2>
                    <div class="total-wrapper">
                        <span>
                            <h4>Subtotal</h4>
                            <h5>00.00</h5>
                        </span>
                        <span>
                            <h4>Subtotal</h4>
                            <h5>00.00</h5>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import data from '../data/data.json';
import defaultImage from '../assets/images/content-images/menu-pizzas/default.jpg';
export default {
    data(){
        return{
            basketItems: 0,
            parsedArray: null,
            basketArray: null,
            includedItems: [],
            codeApplied: 0,
        }
    },
    methods:{
        pingBasket(){
            var self = this;
            var pinged = self.$root.basketItemsPing()
            console.log(pinged)
            self.basketItems = pinged;
        },
        getParsedArray(){
            var self = this;
            self.parsedArray = JSON.parse(JSON.stringify(data))
        },
        tryImage(argumentId){
            try{
                var findImage = require('../assets/images/content-images/menu-pizzas/itemId-' + argumentId + '.jpg')
                return findImage
            }catch(e){
                return defaultImage
            }
        },
        basketCheckArray(){
            var self = this;
            for(var arrayItems in self.basketArray){
                var itemKey = parseInt(self.basketArray[arrayItems].itemKey.split("-")[1]);
                var filteredFind = self.parsedArray.filter(function(e){return e.itemId === itemKey})
                self.includedItems.push(filteredFind[0]);
                console.log(self.includedItems[0]);
            
            }
        },
        getQuantity(argumentId){
            var self = this;
            console.log(argumentId)
            for(var arrayItems in self.includedItems){
               var getQuantity = sessionStorage.getItem("itemId-" + argumentId);
               return getQuantity;
            }
        },
        removeItem(argumentId){

        }
        // basketCheck(parametersToGet){
        //     var self = this;
        //     //First Part
        //     console.log(parametersToGet)
        //     for(var arrayItems in self.basketArray){
        //         // console.log(self.basketArray[arrayItems].itemKey)
        //         var itemKey = self.basketArray[arrayItems].itemKey;
        //         var splitId = parseInt(itemKey.split("-")[1]);
        //         // console.log(splitId);
        //         if(splitId === parametersToGet.itemId){
        //             console.log("find")
        //             return [true]
        //         }
        //     }

        //     return parametersToGet
        //     var grabJSONData = self.parsedArray;
        //     var grabObjectId = parametersToGet.itemKey;
        //     var splitIdFunction = parametersToGet.itemKey.split('-');
        //     var splitId = parseInt(splitIdFunction[1]);
        //     console.log(splitId)
        //     //Second Part
        //     for(var singleData in self.parsedArray){
        //         console.log(singleData.name)
        //         if(singleData.itemId === splitId){
        //             console.log(singleData.name)
        //         }
        //     }
        // }
    },
    mounted(){
        var self = this;
        this.$root.getBasket(true)
        self.pingBasket();
        self.getParsedArray();
        self.basketArray = this.$root.componentGrabBasketItems();
        self.basketCheckArray();
    }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/pages/basket.css">
</style>