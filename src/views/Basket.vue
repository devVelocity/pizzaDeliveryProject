<template>
  <teleport to="body">
      <promptWarning v-if="warningPromptOpen" 
      :dataInput="warningArguments" 
      :description="'You are about to remove all ' + warningDescriptionItems + ' item(s) from your Basket, Are you sure you would like to Continue?'" 
      title="Warning!"
      warningType="1"
      confirmButton="Continue"
      cancelButton="Cancel"
      @continue="removeItemFromBasketFinal(warningPromptId)" 
      @cancel="warningPromptOpen = false, this.$root.warningPromptOpen = false"
      />
  </teleport>
  <div id="page-background" style="margin-top: -5px">
    <div id="centralWrapper">
        <div id="centralContainer">
            <div id="shop-basket-container">
                <h1 :class="{ noItems : basketItems === 0}">Shopping Basket</h1>
                <h3 v-if="basketItems != 0" class="itemsDisplay">{{ basketItems }} Items</h3>
                <span id="text-container-noItem">
                 <h2 v-if="basketItems === 0" class="noItems2">You dont have any items in your basket. </h2>
                 <router-link v-if="basketItems === 0" class="light-button" to="/menu">Add some items</router-link>
                </span>
            </div>
            <div v-if="basketItems > 0" id="shoppingContainer">
                <div id="itemColumn">
                    <div class="item" v-for="item in includedItems">
                        <span class="imageCover"></span>
                        <img :src="tryImage(item.itemId)">
                        <div class="flex-sideways">
                            <h1>{{item.name}}</h1>
                            <a id="button-1" class="button-style1 dark" @click="removeItemFromBasket(item.itemId)">Remove</a>
                        </div>
                        <div class="section-1">
                            <!-- Quantity: {{getQuantity(item.itemId)}} -->
                            <h2>
                                Quantity: 
                                <span class="quantityContainer">
                                    <select @change="changeQuantity($event, item.itemId)">
                                        <option v-if="getQuantity(item.itemId) >= maxItems" v-for="amount in maxItems" :selected="amount">{{ amount }}</option>
                                        <option v-if="getQuantity(item.itemId) < maxItems" v-for="amount in maxItems">{{ amount }}</option>
                                    </select>
                                </span>
                            </h2>
                        </div>
                        <div class="flex-sideways" id="priceTotal">
                            <h2>Individual: <strong>£{{item.price}}</strong></h2>
                            <h2>Total: <strong>£{{(item.price * parseInt(getQuantity(item.itemId))).toFixed(2)}}</strong></h2>
                        </div>
                        <div class="section-2"></div>
                        <a id="button-2" class="button-style1 dark" @click="removeItemFromBasket(item.itemId)">Remove</a>
                    </div>
                </div>
                <div v-if="confirmOrderDetails" class="stickyContainer">
                    <form @submit.prevent="" id="form1">
                        <div class="stickyItem">
                            <div class="stickyItemFlex2">
                                <hr class="spacing-hr">
                                <h2>Your Details</h2>
                                <input v-model="fullName" placeholder="Full Name">
                                <hr class="spacing-hr">
                                <input v-model="contactNumber" placeholder="Contact Number">
                                <hr class="spacing-hr">
                                <input v-model="emailAddress" placeholder="Email Address">
                                <hr class="spacing-hr">
                                
                                <input v-model="Address" placeholder="Address">
                                <hr class="spacing-hr">
                                <input v-model="postCode" placeholder="Postcode">
                                <hr class="spacing-hr">
                                <hr class="spacing-hr">
                                <h2>Delivery Details</h2>
                                <textarea :maxlength="maxWords2" @keyup="textAreaChangedTwo(e)" class="additionalNotes" v-model="deliveryDetails" placeholder="Do not give details about your order, only delivery instructions"></textarea>
                                <div id="word-limit-wrap">
                                    <h2 class="additionalh2">{{wordCount2}} / {{maxWords2}} Characters</h2>
                                    <div id="word-limit-bar-notes"><span id="word-limit-bar-move" :style="{width: wordLimitBarPerc2 + '%'}"></span></div>
                                </div>
                                <hr class="spacing-hr" style="margin-bottom: 13px">
                                <h2>Payment Method</h2>
                                <select v-model="paymentMethod" @change="changePaymentMethod($event)">
                                    <option>Cash</option>
                                    <option>Card</option>
                                    <option>Paypal</option>
                                </select>
                        </div>
                            <div class="stickyItemFlex1">
                                <hr class="spacing-hr">
                                <h2>Discount Codes</h2>
                                <input v-if="codeApplied === 0 || codeApplied === 2" :placeholder="discountCodePlaceholder" v-model="discountCodes" @keyup.enter="tryDiscountCode()" :disabled="codeApplied != 0">
                                <span @click="removeDiscountCodes" v-if="codeApplied != 0 && codeApplied != 2" class="discountAppliedSpan"><h3 class="hover">x</h3><h4 class="discountApplied">Discount {{ this.codeAppliedName }} Applied</h4></span>
                                <h4 class="h4codeRecognised" v-if="codeApplied === 0">Waiting for Code..</h4>
                                <h4 class="h4codeRecognised error" v-if="codeApplied === 2">Code not Valid</h4>
                                <hr class="spacing-hr">
                                <h2>Total</h2>
                                <div class="total-wrapper">
                                    <span>
                                        <h4>Subtotal (incl. VAT)</h4>
                                        <h5>£{{totalPrice.toFixed(2)}}</h5>
                                    </span>
                                    <!-- v-if="codeApplied != 0 && codeApplied != 2" -->
                                    <span>
                                        <h4>Discounts</h4>
                                        <h5 v-if="codeApplied != 0 && codeApplied != 2">- £{{totalDiscounts}}</h5>
                                        <h5 v-if="codeApplied === 0 || codeApplied === 2 && codeApplied != 1">£0.00</h5>
                                </span>
                                    <span>
                                        <h4>Final Subtotal</h4>
                                        <h5 v-if="codeApplied != 0 && codeApplied != 2">£{{ totalPriceDiscounts }}</h5>
                                        <h5 v-if="codeApplied === 0 || codeApplied === 2 && codeApplied != 1">£{{ totalPrice.toFixed(2) }}</h5>
                                    </span>
                                </div>
                                <hr class="spacing-hr">
                                <h2>Additional Information:</h2>
                                <textarea :maxlength="maxWords" @keyup="textAreaChanged(e)" placeholder="Anything specific you would like with your order?" class="additionalNotes" v-model="modelledAtr"></textarea>
                                <div id="word-limit-wrap">
                                    <h2 class="additionalh2">{{wordCount}} / {{maxWords}} Characters</h2>
                                    <div id="word-limit-bar-notes"><span id="word-limit-bar-move" :style="{width: wordLimitBarPerc + '%'}"></span></div>
                                </div>
                                <hr class="spacing-hr">
                                <hr class="spacing-hr">
                                <h4 class="terms">By continuing,  you agree to the <span><a class="orangeHyperLink">Terms and Conditions</a></span></h4>
                                <h4 class="mobileH4" v-if="paymentButtonDisabled && mobileUser">{{paymentDisabledMessage}}</h4>
                                <span class="tooltipContainer">
                                    <h2 class="toolTip" v-if="paymentDisabledMessage != null && !mobileUser">{{paymentDisabledMesage}}</h2>
                                    <button v-if="!paymentButtonHidden" :disabled="paymentButtonDisabled" :class="{disabled: paymentButtonDisabled}" @click="checkoutCommenced()" class="button-style4" form="form1">Confirm and Pay</button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-if="confirmOrderPayment" class="stickyContainer">
                    <form @submit.prevent="checkoutCommenced()" id="form1">
                        <div class="stickyItem">
                            <div class="stickyItemFlex2">
                                <hr class="spacing-hr">
                                <h2>Details</h2>
                            </div>
                            <div class="stickyItemFlex1">
                                <hr>
                                <h2>Discount Codes</h2>
                                <input v-if="codeApplied === 0 || codeApplied === 2" placeholder="Type code and press Enter" v-model="discountCodes" @keyup.enter="tryDiscountCode()" :disabled="codeApplied === 1">
                                <span @click="removeDiscountCodes" v-if="codeApplied != 0 && codeApplied != 2" class="discountAppliedSpan"><h3 class="hover">x</h3><h4 class="discountApplied">Discount {{ this.codeAppliedName }} Applied</h4></span>
                                <transition name="fade">
                                    <h4 class="h4codeRecognised" v-if="codeApplied === 2">Code unavailable</h4>
                                </transition>
                                <hr class="spacing-hr">
                                <h2>Total</h2>
                                <div class="total-wrapper">
                                    <span>
                                        <h4>Subtotal (incl. VAT)</h4>
                                        <h5>£{{totalPrice.toFixed(2)}}</h5>
                                    </span>
                                    <!-- v-if="codeApplied != 0 && codeApplied != 2" -->
                                    <span>
                                        <h4>Discounts</h4>
                                        <h5 v-if="codeApplied != 0 && codeApplied != 2">- £{{totalDiscounts}}</h5>
                                        <h5 v-if="codeApplied === 0 || codeApplied === 2 && codeApplied != 1">£0.00</h5>
                                </span>
                                    <span>
                                        <h4>Final Subtotal</h4>
                                        <h5 v-if="codeApplied != 0 && codeApplied != 2">£{{ totalPriceDiscounts }}</h5>
                                        <h5 v-if="codeApplied === 0 || codeApplied === 2 && codeApplied != 1">{{ totalPrice }}</h5>
                                    </span>
                                </div>
                                <hr class="spacing-hr">
                                <h2>Additional Information:</h2>
                                <textarea :maxlength="maxWords" @keyup="textAreaChanged(e)" placeholder="Anything specific you would like with your order?" class="additionalNotes" v-model="modelledAtr"></textarea>
                                <div id="word-limit-wrap">
                                    <h2 class="additionalh2">{{wordCount}} / {{maxWords}} Characters</h2>
                                    <div id="word-limit-bar-notes"><span id="word-limit-bar-move" :style="{width: wordLimitBarPerc + '%'}"></span></div>
                                </div>
                                <hr class="spacing-hr">
                                <h4 class="mobileH4" v-if="paymentButtonDisabled && mobileUser == true">{{paymentDisabledMessage}}</h4>
                                <span class="tooltipContainer">
                                    <h2 class="toolTip" v-if="paymentDisabledMessage != null && mobileUser == false">{{paymentDisabledMesage}}</h2>
                                    <button v-if="!paymentButtonHidden" :disabled="paymentButtonDisabled" :class="{disabled: paymentButtonDisabled}" @click="checkoutCommenced()" class="button-style4" form="form1">Confirm and Pay</button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<hr class="basketSpacing">
</template>

<script>
import data from '../data/data.json';
import discountCodesJson from '../data/discountCodes.json';
import defaultImage from '../assets/images/content-images/menu-pizzas/default.jpg';
import promptWarning from '../components/deleteWarning.vue'

export default {
    components:{
        promptWarning
    },
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
            wordLimitBarPerc2: 0,

            wordCount: 0,
            modelledAtr: null,
            maxWords: 200,

            wordCount2: 0,
            maxWords2: 200,
            modelledAtr2: null,
            deliveryDetails: "",

            discountCodes: null,
            parsedItemsArray: null,
            parsedDiscountArray: null,
            totalPrice: null,
            totalDiscounts: null,
            totalPriceDiscounts: null,

            confirmOrderDetails: true,
            confirmOrderPayment: false,

            discountCodePlaceholder: "Type code and press Enter",
            changeQuantityAmount: null,
            maxItems: 20,

            paymentMethod: "Card",
            paymentButtonDisabled: false,
            paymentDisabled: ['Cash'],
            paymentDisabledMesage: null,
            mobileUser: false,
            paymentButtonHidden: false,

            warningArguments: [],

            warningPromptOpen: false,
            warningDescriptionItems: "",
            warningPromptId: null,

            finalBasketArray: [],


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
        textAreaChangedTwo(e){
            var self = this;
            var getWords = self.deliveryDetails;
            var spaces = 0;
            for(var letter in getWords){
                spaces += 1;
            }
            self.wordCount2 = spaces;
            self.wordLimitBarPerc2 = ((self.wordCount2 / self.maxWords2) * 100);
            
        },
        tryDiscountCodeLocalStorage(argumentId){
            if(localStorage.getItem("code-" + argumentId)){
                if(localStorage.getItem("code-" + argumentId) === true){
                    return true;
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        resetCodeApplied(){
            var self = this;
            self.codeApplied = 0;
            self.codeAppliedName = "";
            this.discountCodePlaceholder = "Type code and press Enter"

        },
        workoutDiscount(argumentId){
            var self = this;
            self.parsedDiscountArray = JSON.parse(JSON.stringify(discountCodesJson))
            for(const item in self.parsedDiscountArray){
                if(self.parsedDiscountArray[item].name === argumentId){
                    // console.log("match");
                    var getSubtotal = self.totalPrice.toFixed(2);
                    if(self.parsedDiscountArray[item].discountPerc === null){
                        if(self.parsedDiscountArray[item].discountAmount === null){
                            // console.log("No Discount")
                        }else{
                            // console.log(self.parsedDiscountArray[item].discountAmount)
                            var getFloat = parseFloat(self.parsedDiscountArray[item].discountAmount);
                            // console.log(getFloat)
                            var newTotal = getSubtotal - getFloat;
                            var difference = getSubtotal - newTotal;
                            console.log(getFloat, newTotal, difference)
                            self.totalPriceDiscounts = newTotal.toFixed(2);
                            self.totalDiscounts = getFloat.toFixed(2);
                        }
                    }else{
                        var floatConvertPerc = parseFloat(self.parsedDiscountArray[item].discountPerc) / 100
                        var getPercentageTotal = getSubtotal * floatConvertPerc;
                        var finalWorkedOut = (getSubtotal - getPercentageTotal).toFixed(2);
                        self.totalPriceDiscounts = finalWorkedOut
                        self.totalDiscounts = (getSubtotal - self.totalPriceDiscounts).toFixed(2)
                    }
                }
            }
        },
        tryDiscountCode(){
            var self = this;
            var found = false;
            var enteredCode = self.discountCodes;
            self.parsedDiscountArray = JSON.parse(JSON.stringify(discountCodesJson));
            for(const item in self.parsedDiscountArray){
                // console.log(self.parsedDiscountArray[item]);
                if(self.parsedDiscountArray[item].name == enteredCode){
                    if(localStorage.getItem("code-" + enteredCode)){
                        if(localStorage.getItem("code-" + enteredCode) === "true"){
                            self.codeApplied = 2;
                            self.discountCodes = ""
                            this.discountCodePlaceholder = ""
                            setTimeout(this.resetCodeApplied, 3000)
                        }else{  
                            // console.log("code not used");
                            self.codeAppliedName = enteredCode;
                            self.codeApplied = 1;
                            found = true;
                            this.workoutDiscount(enteredCode);
                        }
                    }else{
                        self.codeAppliedName = enteredCode;
                        self.codeApplied = 1;
                        found = true;
                        // console.log("code not used");
                        this.workoutDiscount(enteredCode);
                    }
                }
            }
            if(!found){
                self.codeApplied = 2;
                self.discountCodes = ""
                this.discountCodePlaceholder = ""
                setTimeout(this.resetCodeApplied, 2000)
            }
        },
        removeDiscountCodes(){
            var self = this;
            self.discountCodes = null,
            self.codeApplied = 0;
            self.codeAppliedName = "";
        },
        checkoutCommenced(){
            // console.log("Checkout");
            //Lock Discount Code
            this.$root.finalPrice = null;
            this.$root.finalItems = null;
            this.$root.finalPaymentMethod = null;
            var self = this;
            if(self.codeAppliedName != ""){
                localStorage.setItem("code-" + self.codeAppliedName, "true")
            }
            if(self.codeAppliedName == ""){
                this.$root.finalPrice = this.totalPrice.toFixed(2)
            }else{
                this.$root.finalPrice = this.totalPriceDiscounts
            }
            for(const item in this.includedItems){
                console.log(this.includedItems[item].name)
            }
            this.$root.finalPaymentMethod = this.paymentMethod
            this.$router.push('/basket/payment');
            console.log("Final Price " + this.$root.finalPrice)
            console.log(this.$root.finalItems)
            
        },
        getQuantity(argumentId){
            var self = this;
            for(var arrayItems in self.includedItems){
               var getQuantity = sessionStorage.getItem("itemId-" + argumentId);
               return getQuantity;
            }
        },
        getTotal(){
            var self = this;
            self.parsedItemsArray = JSON.parse(JSON.stringify(data))
            self.totalPrice = null;
            for(const item in self.parsedItemsArray){
                if(sessionStorage.getItem("itemId-" + self.parsedItemsArray[item].itemId)){
                    // console.log("match");
                    self.totalPrice = self.totalPrice + (parseFloat(self.parsedItemsArray[item].price * parseInt(sessionStorage.getItem("itemId-" + self.parsedItemsArray[item].itemId))))
                }
                // console.log(self.parsedItemsArray[item]);
            }
        },
        changeQuantity(e,itemIdArgument){
            console.log(itemIdArgument);
            console.log(e.target.value);
            for(const item in sessionStorage){
                if(item == "itemId-" + itemIdArgument){
                    console.log("Found");
                    sessionStorage.setItem("itemId-" + itemIdArgument, e.target.value)
                    this.$root.getBasket()
                    this.getTotal()
                    this.workoutDiscount(this.codeAppliedName);
                }
            }
        },
        removeItemFromBasket(itemIdArguement){
            this.warningPromptOpen = true;
            this.warningDescriptionItems = this.getQuantity(parseInt(itemIdArguement))
            console.log(this.warningDescriptionItems);
            this.warningPromptId = itemIdArguement;
            this.$root.warningPromptOpen = true;
        },
        removeItemFromBasketFinal(itemIdArguement){
            if(sessionStorage.getItem("itemId-" + itemIdArguement)){
                sessionStorage.removeItem("itemId-" + itemIdArguement)
                var self = this;
                self.parsedArray = null
                self.basketArray = null
                self.includedItems = []
                self.$root.getBasket(true)
                self.pingBasket();
                self.getParsedArray();
                self.basketArray =  self.$root.componentGrabBasketItems();
                self.basketCheckArray();
                self.getTotal();
                self.maxItems = self.$root.maxAmountItems;
                self.warningPromptOpen = false;
            }
        },
        changePaymentMethod(){
            var value = this.paymentMethod
            if(this.paymentDisabled.includes(value)){
                this.paymentButtonDisabled = true;
                this.paymentDisabledMessage = "Sorry! Cash is not currently accepted due to the COVID-19 Pandemic"
                if(this.mobileUser){
                    this.paymentButtonHidden = true
                }
            }else{
                this.paymentButtonDisabled = false;
                if(this.mobileUser){
                    this.paymentButtonHidden = false;
                }
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
        // },
    },
    computed:{
        finalPrice(){
            var self = this;
            var finalCalculate = self.totalPrice - self.totalDiscounts;
            if(finalCalculate < 0){
                return 0.00
            }else{
                return finalCalculate.toFixed(2)
            }
        }
    },
    mounted(){
        var self = this;
        this.$root.getBasket(true)
        self.pingBasket();
        self.getParsedArray();
        self.basketArray = this.$root.componentGrabBasketItems();
        self.basketCheckArray();
        self.getTotal();
        this.maxItems = this.$root.maxAmountItems
        if(this.$root.mobileUserCheck() === true){
            this.mobileUser = true;
        }else{
            this.mobileUser = false;
        }
    },
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/pages/basket.css">
</style>