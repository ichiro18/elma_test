<template>
  <div class="row todo">
    <div class="col-md-4 todo__list">
      <div class="list__header">
        <select class="todo-filter">
          <option value="-1" selected>Все</option>
          <option value="1">Завершенные</option>
          <option value="2">Незавершенные</option>
        </select>
      </div>
      <ul class="list-group list__items" v-if="todo.length">
        <li class="list-group-item list__item">Cras justo odio</li>
      </ul>
      <div class="list__items--empty" v-else>
        Нет задач
      </div>
      <div class="list__footer">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="createTodo"
        >
          Добавить задачу
        </button>
      </div>
    </div>

    <div class="col todo__detail">
      <div class="controls">
        <div class="control__item control--delete">
          <i class="far fa-trash-alt"></i>
        </div>
        <div
          class="control__item control--steps"
          :class="{ active: showSteps }"
          @click="toggleStepVisible"
        >
          <i class="far fa-check-square"></i>
        </div>
      </div>
      <todo-item
        v-if="selected"
        :todo="selected"
        :members="members"
        v-on:save="saveTodo"
      />
    </div>
  </div>
</template>

<script>
import TheTodoItem from "@project_src/components/TheTodoItem.vue";

export default {
  name: "TheTodoApp",
  components: {
    todoItem: TheTodoItem
  },
  data() {
    return {
      todo: [],
      selected: null,
      showSteps: false,
      defaultTodo: {
        id: 0,
        title: "",
        type: "simple",
        content: {
          text: "",
          steps: []
        },
        members: [],
        created: "",
        done: false
      },
      filter: -1,
      members: [
        {
          id: 0,
          name: "Agent 47",
          avatar:
            "https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP0082-BLUS30835_00-AVAHITAB47000000/1520492986000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000"
        },
        {
          id: 1,
          name: "Freeman",
          avatar: "https://psd-box.ru/wp-content/uploads/2019/03/41750297.jpg"
        },
        {
          id: 2,
          name: "Ciri",
          avatar: "http://i.imgur.com/gqgKhi4.jpg"
        },
        {
          id: 3,
          name: "Shurik",
          avatar: "https://b1.m24.ru/c/1108227.730xp.jpg"
        }
      ]
    };
  },
  methods: {
    createTodo() {
      this.selected = Object.assign({}, this.defaultTodo);
      this.selected.id = this.todo.length;
    },
    saveTodo() {
      this.todo.push(this.selected);
    },
    toggleStepVisible() {
      this.showSteps = !this.showSteps;
    },
    toggleMembersVisible() {
      this.showSteps = !this.showSteps;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/config/variables";

.todo {
  display: flex;

  .todo__list {
    display: flex;
    flex-direction: column;
    padding: 0;
    .list__header {
      border-left: 3px solid $primary-color;
      .todo-filter {
        display: flex;
        width: 100%;
        height: 82px;
        border: 1px solid $background-secondary-color;
        border-radius: 0;
      }
    }
    .list__items {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .todo__detail {
    padding: 0;
    .controls {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 20px 30px;
      border-top: 1px solid $background-secondary-color;
      border-bottom: 1px solid $background-secondary-color;
      box-sizing: border-box;
      .control__item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: $background-secondary-color;
        color: $primary-color;
        margin-left: 15px;

        &:first-child {
          margin-left: 0;
        }
        &:hover {
          cursor: pointer;
          background-color: darken($background-secondary-color, 10);
        }
        &.active {
          background-color: $primary-color;
          color: white;
        }
      }
    }
  }
}
</style>
