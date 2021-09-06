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
        mobileCheck(){
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
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
        if(this.mobileCheck() === true){
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