<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="hero">
        <img :src="require('./assets/images/logo.png')" alt="App" />
        <h1>TODO List</h1>
      </div>
    </div>
    <todo-app />
  </div>
</template>

<script>
import TheTodoApp from "@project_src/components/TheTodoApp.vue";

export default {
  name: "App",
  components: {
    todoApp: TheTodoApp
  }
};
</script>

<style lang="scss">
.hero {
  padding: 30px 0;
  text-align: center;
  h1 {
    margin-top: 10px;
  }
}
</style>
