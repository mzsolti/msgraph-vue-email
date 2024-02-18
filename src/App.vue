<script setup lang="ts">
import EmailMessageForm from "./components/EmailMessageForm.vue";
import { onMounted } from "vue";
onMounted(() => {
  if (window.location.hash !== "") {
    //sometimes the hash get stuck - we close the popup
    window.close();
  }
});
</script>

<template>
  <EmailMessageForm />
</template>

<style scoped></style>
