<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>

<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
