<template>
  <div id="semiOpaqueBackground">
      <div id="warningItem">
          <hr class="spacingHR">
          <svg v-if="warningType == '1'" class="warningSVG" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle id="circle1" cx="256" cy="256" r="241" stroke="#FFA723" stroke-width="30"/>
            <path id="path" d="M298 106H213L230 302H280L298 106Z" fill="#FFA723"/>
            <circle id="circle2" cx="255.5" cy="363.5" r="42.5" fill="#FFA723"/>
        </svg>
        <hr class="spacingHR">
        <hr class="spacingHR">
        <h1>{{ title }}</h1>
        <h3>{{ description }}</h3>
        <a class="button-style-warning" @click="this.$emit('continue')">{{ confirmButton }}</a>
        <a class="button-style-warning" @click="this.$emit('cancel')">{{ cancelButton }}</a>
      </div>
  </div>
</template>

<script>
export default {
    props:[
      'warningArguments', 
      'description',
      'title',
      'warningType',
      'confirmButton',
      'cancelButton',
    ],
    // mounted(){
    //     console.log(this.warningArguments)
    // }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>

<style scoped src="../assets/styles/components/warning.css">
</style>