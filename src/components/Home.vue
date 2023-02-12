<template>
  <v-img
  src="https://images.unsplash.com/photo-1592892111425-15e04305f961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvY2ElMjBjb2xhfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  :aspect-ratio="1"
  cover
  style="height: 100%;">
    <div class="d-flex align-end" style="height: 100%">
      <v-btn @click="() => $router.push('/vending-machine')" prepend-icon="mdi-cursor-pointer" class="rounded-0 text-none" color="blue-darken-3" height="60" block>
        Touch anywhere to start
      </v-btn>
    </div>
  </v-img>
</template>

<script>
</script>

<style scoped>
</style>
