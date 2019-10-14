export default {
  createTodo(state, payload) {
    state.todoList.push(payload);
  },
  updateTodo(state, payload) {
    state.todoList[payload.index] = payload.data;
  },
  deleteTodo(state, payload) {
    state.todoList.splice(payload.index, 1);
  },
  refreshList(state) {
    state.todoList.forEach((val, key) => {
      if (val.id !== key) val.id = key;
    });
  }
};
