// * Global
import Vue from "vue";
import App from "@project_src/App.vue";
// * Modules
import store from "@project_src/store";
// * Assets
import "@project_src/assets/styles/theme.scss";
// * Vendors
import PrettyCheckbox from "pretty-checkbox-vue";

Vue.use(PrettyCheckbox);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
