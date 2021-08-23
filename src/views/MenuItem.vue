<template>
  <div id="page-background">
      <div id="menuItemContainer" v-if="showMenuItem">
            <itemDisplay :details="
            [this.currentName, this.currentDetails, this.currentItemId, this.currentSrc, this.currentPrice,this.currentAvailable,this.currentIngredients,this.currentAllergen, this.nutritionalInfo]"/>
      </div>
  </div>
</template>

<script>

import menuDataItems from '../data/data.json'
import itemDisplay from '../components/menuItemDisplay.vue'

export default {
    name: 'app',
    components:{
        itemDisplay
    },
    data(){
        return{
            id: this.$route.params.id,
            currentName: "null",
            currentDetails: "null",
            currentItemId: "null",
            currentSrc: "null",
            currentPrice: "null",
            currentAvailable: false,
            currentIngredients: "null",
            currentAllergen: "null",
            nutritionalInfo: "null",
            showMenuItem: false,
        }
    },
    methods:{
        grabMenuItem(){
            let editedMenu = JSON.parse(JSON.stringify(menuDataItems))
            for(let item in editedMenu){
                if(parseInt(editedMenu[item].itemId) == this.id){
                    console.log(editedMenu[item].src);
                    this.currentName = editedMenu[item].name;
                    this.currentDetails = editedMenu[item].details;
                    this.currentItemId = editedMenu[item].itemId;
                    this.currentPrice = editedMenu[item].price;
                    this.currentAvailable = editedMenu[item].available;
                    this.currentSrc = editedMenu[item].src;
                    this.currentIngredients = editedMenu[item].ingredients;
                    this.currentAllergen = editedMenu[item].currentAllergen;
                    this.nutritionalInfo = Object.values(editedMenu[item].nutritionalInfo)
                    this.showMenuItem = true;
                    console.log(this.nutritionalInfo)
    
                }
            }
        },
    },
    computed:{

    },
    mounted(){
        setTimeout(this.grabMenuItem(),100)
        this.$root.getBasket(true)
    }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/pages/menuItem.css">
</style>