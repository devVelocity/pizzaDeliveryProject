<template>
    <div id="page-background" style="padding-top: 25px">
        <div id="paymentContainer">
            <h1 v-if="paymentMethod != 'Cash'">Payment</h1>
            <h1 v-if="paymentMethod == 'Cash'">Confirm Order</h1>
            <div id="paymentInfoWrapper">
                <h4>Estimated Delivery Time: <br><strong>20-50 Minutes</strong></h4>
                <h4>Payment Method: <br><strong>{{paymentMethod}}</strong></h4>
                <h4>Please Pay: <br><strong>£{{ pricetoPay }}</strong></h4>
            </div>
            <div id="paymentOptionsContainer">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

            pricetoPay: null,
            paymentMethod: null,
        }
    },
    mounted(){
        this.pricetoPay = this.$root.finalPrice
        this.paymentMethod = this.$root.finalPaymentMethod
    }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src='../assets/styles/pages/payment.css'>
</style>