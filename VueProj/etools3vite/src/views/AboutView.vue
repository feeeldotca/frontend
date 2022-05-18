<template>
  <div class="about">
    <h1>This is an about page </h1>
    <hr>
    Count: {{counter.count}}
    <br>
    <button @click="counter.count++">counter++</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
import { use } from "chai";
import { useCounterStore } from "../stores/counter";
export default {
  setup(){
    const counter = useCounterStore()

    counter.count++
  }
}
</script>