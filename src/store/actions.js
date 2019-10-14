export default {
  createTodo({ commit, state }, payload) {
    const newItem = payload;
    newItem.id = state.todoList.length;
    newItem.created = Date.now();
    commit("createTodo", newItem);
  },
  updateTodo({ commit, state }, payload) {
    const todoIndex = state.todoList.findIndex(item => item.id === payload.id);
    if (todoIndex >= 0) {
      const data = Object.assign(state.todoList[todoIndex], payload);
      commit("updateTodo", { index: todoIndex, data });
    }
  },
  deleteTodo({ commit, state }, payload) {
    const todoIndex = state.todoList.findIndex(item => item.id === payload.id);
    if (todoIndex >= 0) {
      commit("deleteTodo", { index: todoIndex });
      commit("refreshList");
    }
  }
};
