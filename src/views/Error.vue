<template>
  <h2>{{ notFoundPage.title }}</h2>
</template>

<script>
import { notFoundPage } from '@/resources';
export default {
  name: "ErrorPage",
  data(){
    return {
      notFoundPage
    }
  }
}
</script>

<style>

</style>
