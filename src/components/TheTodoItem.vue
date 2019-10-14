<template>
  <div class="todo__item" v-if="todo">
    <section class="main">
      <h3 class="item__title" v-if="mode === 'new'">
        Добавить задачу
      </h3>
      <h3 class="item__title" v-if="mode === 'edit'">
        Изменить задачу
      </h3>
      <div class="item__header">
        <checkbox :model="todo.done" round @change="changeStatus" />
        <input
          v-if="mode !== 'read'"
          class="form-control"
          type="text"
          placeholder="Заголовок"
          v-model="todo.title"
        />
        <div class="title__block" v-else>
          <h3 class="title">{{ todo.title }}</h3>
          <span class="date">
            <i class="far fa-clock"></i> {{ parseDate(todo.created) }}</span
          >
        </div>
      </div>
      <div class="item__content">
        <textarea
          v-if="mode !== 'read'"
          class="form-control"
          placeholder="Текст задачи"
          v-model="todo.content.text"
        ></textarea>
        <p v-else v-text="todo.content.text"></p>
      </div>
    </section>
    <section class="steps" v-if="showSteps || todo.content.steps.length">
      <h4 class="item__subtitle">Этапы</h4>
      <ul class="item__steps">
        <li
          v-for="(step, key) in todo.content.steps"
          class="step__item"
          :key="key"
        >
          <template v-if="mode !== 'read'">
            <checkbox
              :model="step.done"
              @change="changeStepStatus(step.id, $event)"
            />
            <input
              class="form-control"
              type="text"
              placeholder="Название этапа"
              v-model="step.name"
            />
            <i
              class="far fa-trash-alt control__icon"
              @click="deleteStep(step.id)"
            ></i>
          </template>

          <checkbox
            v-else
            :model="step.done"
            :label="step.name"
            @change="changeStepStatus(step.id, $event)"
          />
        </li>
        <button
          v-if="mode !== 'read'"
          type="button"
          class="btn btn-outline-primary submit__button"
          @click="createStep"
        >
          Создать этап
        </button>
      </ul>
    </section>
    <section class="members">
      <h4 class="item__subtitle">Участники</h4>
      <div class="item__members">
        <multiselect
          v-if="mode !== 'read'"
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
        <div class="members__list" v-else>
          <img
            v-for="(member, index) in todo.members"
            :key="index"
            :src="member.avatar"
            class="member__item rounded-circle"
            :alt="member.name"
            :title="member.name"
          />
        </div>
      </div>
    </section>
    <button
      v-if="mode !== 'read'"
      type="button"
      class="btn btn-primary submit__button"
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
    members: Array,
    showSteps: Boolean
  },
  components: {
    checkbox: UICheckbox,
    Multiselect
  },
  data() {
    return {
      defaultStep: {
        id: 0,
        name: "",
        done: false
      }
    };
  },
  methods: {
    parseDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    save() {
      this.$emit("save", this.todo);
    },
    changeStatus(data) {
      if (this.mode === "read") {
        this.$emit("change", data);
      }
    },
    changeStepStatus(id, value) {
      const step = this.todo.content.steps.find(item => item.id === id);
      if (step) {
        step.done = value;
      }
    },
    createStep() {
      const newStep = Object.assign({}, this.defaultStep);
      newStep.id = this.todo.content.steps.length;
      this.todo.content.steps.push(newStep);
    },
    deleteStep(id) {
      const stepIndex = this.todo.content.steps.findIndex(
        item => item.id === id
      );
      if (stepIndex >= 0) {
        this.todo.content.steps.splice(stepIndex, 1);
        this.refreshStepIDs();
      }
    },
    refreshStepIDs() {
      this.todo.content.steps.forEach((val, key) => {
        if (val.id !== key) val.id = key;
      });
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

    .title__block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .title {
        font-size: 1.25rem;
        font-weight: bold;
        color: $text-primary-color;
      }

      .date {
        font-size: 0.85rem;
        font-weight: normal;
        color: $text-secondary-color;
      }
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

    .members__list {
      display: flex;
      justify-content: flex-start;

      .member__item {
        width: 50px;
        height: 50px;
        margin-right: 15px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .item__steps {
    list-style: none;

    .step__item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;

      .pretty {
        margin-right: 10px;
        label {
          font-weight: lighter;
        }
      }

      .form-control {
        max-width: 80%;
      }

      .control__icon {
        margin-left: 10px;
        color: $text-secondary-color;

        &:hover {
          cursor: pointer;
          color: $primary-color;
        }
      }
    }
  }

  .submit__button {
    width: 150px;
    margin: 30px auto 0;
  }
}
</style>
