<template>
  <div class="home">
    <to-do></to-do>
  </div>
</template>

<script>
import ToDo from "../components/Todo/ToDo"
export default {
  name: 'TodoHome',
  component:{ ToDo }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
