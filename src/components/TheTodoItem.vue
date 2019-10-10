<template>
  <div class="todo__item">
    <div class="item__header">
      <checkbox :model="todo.done" round />
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
    <button
      type="button"
      class="btn btn-outline-primary submit__button"
      @click="save"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import UICheckbox from "@project_src/components/UI/UICheckbox.vue";

export default {
  name: "TheTodoItem",
  props: {
    todo: Object,
    mode: {
      type: String,
      default: "read"
    },
    members: Array
  },
  components: {
    checkbox: UICheckbox
  },
  methods: {
    save() {
      this.todo.created = Date.now();
      this.$emit("save", this.todo);
    }
  }
};
</script>

<style lang="scss">
.todo__item {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  .item__header {
    display: flex;
    align-items: center;
    padding: 20px 0 20px 30px;
    .p-icon {
      margin-right: 32px;
    }
  }
  .item__content {
    margin-left: 95px;
    margin-bottom: 20px;
  }
  .submit__button {
    width: 150px;
    margin: 0 auto;
  }
}
</style>
