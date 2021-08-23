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
                    <hr>
                    <h2>Discount Codes</h2>
                    <input v-if="codeApplied != 0" placeholder="Type code and press Enter" v-model="discountCodes" @keyup.enter="tryDiscountCode()" :disabled="codeApplied === 1">
                    <span v-if="codeApplied != 0, codeApplied != 2" class="discountAppliedSpan"><h3 class="hover">x</h3><h4 class="discountApplied">Discount {{ this.codeAppliedName }} Applied</h4></span>
                    <transiton type="fade">
                         <h4 v-if="codeApplied === 2">Code not valid / not recognised</h4>
                    </transiton>
                    <hr>
                    <h2>Total</h2>
                    <div class="total-wrapper">
                        <span>
                            <h4>Subtotal (incl. VAT)</h4>
                            <h5>00.00</h5>
                        </span>
                        <span v-if="codeApplied != 0, codeApplied != 2">
                            <h4>Discounts</h4>
                            <h5>00.00</h5>
                        </span>
                        <span v-if="codeApplied != 0, codeApplied != 2">
                            <h4>Final Subtotal (incl. VAT)</h4>
                            <h5>00.00</h5>
                        </span>
                    </div>
                    <hr>
                    <h2>Additional Information:</h2>
                    <textarea :maxlength="maxWords" @keyup="textAreaChanged(e)" placeholder="Anything specific you would like with your order?" class="additionalNotes" v-model="modelledAtr"></textarea>
                    <div id="word-limit-wrap">
                        <h2 class="additionalh2">{{wordCount}} / {{maxWords}} Characters</h2>
                        <div id="word-limit-bar-notes"><span id="word-limit-bar-move" :style="{width: wordLimitBarPerc + '%'}"></span></div>
                    </div>
                    <hr>
                    <router-link to="/checkout" class="button-style4">Checkout</router-link>
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
            additionalNotes: "",
            codeAppliedName: "",

            wordLimitBarPerc: 0,
            wordCount: 0,
            modelledAtr: null,
            maxWords: 200,
            discountCodes: null,


        }
    },
    methods:{
        pingBasket(){
            var self = this;
            var pinged = self.$root.basketItemsPing()
            // console.log(pinged)
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
                // console.log(self.includedItems[0]);
            
            }
        },
        textAreaChanged(e){
            var self = this;
            var getWords = self.modelledAtr;
            var spaces = 0;
            for(var letter in getWords){
                spaces += 1;
            }
            self.wordCount = spaces;
            self.wordLimitBarPerc = ((self.wordCount / self.maxWords) * 100);
            
        },
        tryDiscountCode(){

        },
        getQuantity(argumentId){
            var self = this;
            for(var arrayItems in self.includedItems){
               var getQuantity = sessionStorage.getItem("itemId-" + argumentId);
               return getQuantity;
            }
        },
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
    },
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/pages/basket.css">
</style>