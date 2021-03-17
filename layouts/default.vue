<template>
  <div>
    <Navbar/>

    <Nuxt />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";

export default {
    components: {
    Navbar,
  },
}
</script>
<style>
/* body {
  background-image: url(@/assets/fondo.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  opacity: 2.5;
} */
</style>
