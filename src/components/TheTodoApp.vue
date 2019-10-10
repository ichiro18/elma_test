<template>
  <div class="row todo">
    <div class="col-md-4 todo__list">
      <div class="list__header">
        <select class="custom-select">
          <option value="-1" selected>Все</option>
          <option value="1">Завершенные</option>
          <option value="2">Незавершенные</option>
        </select>
      </div>
      <ul class="list-group list__items" v-if="todo.length">
        <li class="list-group-item list__item">Cras justo odio</li>
        <li class="list-group-item list__item">Dapibus ac facilisis in</li>
        <li class="list-group-item list__item">Morbi leo risus</li>
        <li class="list-group-item list__item">Porta ac consectetur ac</li>
        <li class="list-group-item list__item">Vestibulum at eros</li>
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
        controls
      </div>
      <todo-item :todo="selected" />
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
    .list__items {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .todo__detail {
    background: palegreen;
  }
}
</style>
