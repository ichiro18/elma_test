<template>
  <div class="todo__item">
    <h3 class="item__title">
      Добавить задачу
    </h3>
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
    <h4 class="item__subtitle">Участники</h4>
    <div class="item__members">
      <multiselect
        v-model="todo.members"
        placeholder="Выберите участников"
        label="name"
        track-by="id"
        :options="members"
        multiple
      >
        <template slot="tag" slot-scope="props">
          <div class="member__tag">
            <img
              class="tag__image rounded-circle"
              :src="props.option.avatar"
              :alt="props.option.name"
            />
            <div class="tag__desc">
              <span class="tag__title">{{ props.option.name }}</span>
            </div>
          </div>
        </template>
        <template slot="option" slot-scope="props">
          <div class="member__option">
            <img
              class="option__image rounded-circle"
              :src="props.option.avatar"
              :alt="props.option.name"
            />
            <div class="option__desc">
              <span class="option__title">{{ props.option.name }}</span>
            </div>
          </div>
        </template>
      </multiselect>
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
import Multiselect from "vue-multiselect";

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
    checkbox: UICheckbox,
    Multiselect
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
@import "../assets/styles/config/variables";

.todo__item {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  .item__header {
    display: flex;
    align-items: center;
    padding: 20px 0;
    .p-icon {
      margin-right: 32px;
    }
  }
  .item__content {
    margin-left: 65px;
    margin-bottom: 20px;
  }
  .item__members {
    .member__option {
      display: flex;
      align-items: center;
      padding: 0 1em;
      .option__image {
        width: 50px;
        height: 50px;
        margin-right: 1em;
      }
      .option__desc {
        color: $text-primary-color;
      }
    }
    .member__tag {
      position: relative;
      display: inline-flex;
      align-items: center;
      margin: 1px 2px;
      cursor: default;
      max-width: 300px;
      vertical-align: middle;
      min-width: 0;
      user-select: none;
      outline: transparent;
      border-radius: 15px;
      background: rgba($text-secondary-color, 0.5);
      padding: 0 5px;
      .tag__image {
        width: 20px;
        height: 20px;
        margin-right: 1em;
      }
      .tag__desc {
        color: $text-primary-color;
      }
    }
  }
  .submit__button {
    width: 150px;
    margin: 30px auto 0;
  }
}
</style>
