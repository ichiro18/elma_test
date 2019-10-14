<template>
  <div class="row todo">
    <div class="col-md-4 todo__list">
      <div class="list__header">
        <select class="todo-filter" v-model.number="filter">
          <option value="-1" selected>Все</option>
          <option value="0">Завершенные</option>
          <option value="1">Незавершенные</option>
        </select>
      </div>
      <ul class="list-group list__items" v-if="!!filteredTodoList.length">
        <li
          class="list-group-item list__item"
          v-for="(item, key) in filteredTodoList"
          :key="key"
          :class="{
            completed: item.done,
            selected: selected && item.id === selected.id
          }"
          @click="selectTodo(key)"
        >
          <div class="item__status">
            <checkbox
              :model="item.done"
              round
              @change="toggleCompleteTodo(item.id, $event)"
            />
          </div>
          <div class="item__desc">
            <span class="item__title">{{ item.title }}</span>
            <div class="desc__content">
              <span class="item__date">{{ parseDate(item.created) }}</span>
              <span class="item__steps" v-if="!!item.content.steps.length">
                <i class="far fa-check-square"></i>
              </span>
            </div>
          </div>
          <div class="item item__members">
            <img
              v-for="(member, index) in item.members"
              :key="index"
              :src="member.avatar"
              class="member__item rounded-circle"
              :style="{ zIndex: item.members.length - index }"
              :alt="member.name"
              :title="member.name"
            />
          </div>
        </li>
      </ul>
      <div class="list__items--empty" v-else>
        Нет задач
      </div>
      <div class="list__footer">
        <button
          type="button"
          class="btn btn-primary button--create"
          @click="createTodo"
        >
          Добавить задачу
        </button>
      </div>
    </div>

    <div class="col todo__detail">
      <div class="controls">
        <!-- Steps -->
        <div
          class="control__item control--steps"
          v-if="type === 'edit' || type === 'new'"
          :class="{ active: showSteps }"
          @click="toggleStepVisible"
        >
          <i class="far fa-check-square"></i>
        </div>
        <!-- Edit -->
        <div
          class="control__item control--edit"
          v-if="type === 'edit' || type === 'read'"
          :class="{ active: editMode }"
          @click="toggleEditMode"
        >
          <i class="fas fa-pencil-alt"></i>
        </div>
        <!-- Delete -->
        <div
          class="control__item control--delete"
          v-if="type === 'edit' || type === 'read'"
          @click="deleteTodo"
        >
          <i class="far fa-trash-alt"></i>
        </div>
      </div>
      <todo-item
        v-if="selected"
        :todo="selected"
        :members="members"
        :mode="type"
        @save="saveTodo"
        @change="changeStatusSelected"
      />
    </div>
  </div>
</template>

<script>
import TheTodoItem from "@project_src/components/TheTodoItem.vue";
import UICheckbox from "@project_src/components/UI/UICheckbox.vue";

export default {
  name: "TheTodoApp",
  components: {
    todoItem: TheTodoItem,
    checkbox: UICheckbox
  },
  data() {
    return {
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
        created: null,
        done: false
      },
      filter: -1,
      editMode: false
    };
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
    members() {
      return this.$store.state.members;
    },
    filteredTodoList() {
      return this.todoList.filter(item => {
        switch (this.filter) {
          case -1:
            return true;
          case 0:
            return item.done;
          case 1:
            return !item.done;
        }
      });
    },
    type() {
      if (!this.selected) {
        return "none";
      }
      if (this.selected.id === this.todoList.length) {
        return "new";
      }
      if (this.editMode) {
        return "edit";
      }
      return "read";
    }
  },
  methods: {
    // * Utils
    parseDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    toggleStepVisible() {
      this.showSteps = !this.showSteps;
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    changeStatusSelected(data) {
      this.selected.done = data;
    },
    // * CRUD
    createTodo() {
      this.selected = JSON.parse(JSON.stringify(this.defaultTodo));
      this.selected.id = this.todoList.length;
    },
    saveTodo() {
      if (this.selected) {
        const action =
          this.selected.id === this.todoList.length
            ? "createTodo"
            : "updateTodo";
        this.$store.dispatch(action, this.selected);
      }
    },
    selectTodo(index) {
      this.selected = this.filteredTodoList[index];
      this.editMode = false;
    },
    deleteTodo() {
      if (this.selected) {
        this.$store.dispatch("deleteTodo", this.selected);
        this.selected = null;
      }
    },
    toggleCompleteTodo(id, data) {
      const todo = this.todoList.find(item => item.id === id);
      if (todo) {
        todo.done = data;
        this.$store.dispatch("updateTodo", todo);
      }
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
      border-left: 5px solid $primary-color;
      .todo-filter {
        display: flex;
        width: 100%;
        height: 82px;
        border: 1px solid $background-secondary-color;
        border-radius: 0;
        padding-left: 15px;
        font-weight: bold;
      }
    }
    .list__items {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      .list__item {
        display: flex;
        align-items: center;
        border-radius: 0;
        background: $background-primary-color;
        box-sizing: border-box;
        border-color: $background-secondary-color;
        .item__status {
          display: flex;
          justify-content: center;
          align-items: center;
          .p-icon {
            margin-right: 0;
          }
        }
        .item__desc {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          justify-content: center;
          padding-left: 1rem;
          .item__title {
            font-size: 1rem;
            font-weight: bold;
            color: $text-primary-color;
          }
          .desc__content {
            font-size: 0.8rem;
            font-weight: normal;
            color: $text-secondary-color;
          }
        }
        .item__members {
          display: flex;
          justify-content: flex-end;
          .member__item {
            width: 30px;
            height: 30px;
            margin-right: -15px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        &:hover {
          cursor: pointer;
          background: white;
        }
        &:first-child {
          border-top: none;
        }
        &.selected {
          background: white;
          /*box-shadow: ;*/
        }
        &.completed {
          .item__desc {
            text-decoration: line-through;
          }
        }
      }
    }
    .list__footer {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      min-height: 82px;
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
