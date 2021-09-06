<template>
    <div id="page-background" style="padding-top: 25px">
        <div id="paymentContainer">
            <h1>Payment</h1>
            <h4>Please Pay <strong>{{ pricetoPay }}</strong></h4>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

            pricetoPay: null,
        }
    },
    mounted(){
        this.pricetoPay = this.$root.finalPrice
    }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src='../assets/styles/pages/payment.css'>
</style>