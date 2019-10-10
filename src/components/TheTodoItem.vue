<template>
  <div class="todo__item">
    <template v-if="todo">
      <div class="item__header">
        <input
          class="form-control"
          type="text"
          placeholder="Заголовок"
          v-model="todo.title"
        />
      </div>
      <div class="item__content">
        <textarea
          class="form-control"
          placeholder="Текст задачи"
          v-model="todo.content.text"
        ></textarea>
      </div>
    </template>
    <div class="status__bar" v-else>
      Status bar
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTodoItem",
  props: {
    todo: Object,
    mode: {
      type: String,
      default: "read"
    }
  }
};
</script>

<style scoped></style>
