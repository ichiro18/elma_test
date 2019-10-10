// * Global
import Vue from "vue";
import App from "@project_src/App.vue";
// * Assets
import "@project_src/assets/styles/theme.scss";
// import "@project_src/assets/scripts/index";
// * Vendors
import PrettyCheckbox from "pretty-checkbox-vue";

Vue.use(PrettyCheckbox);

new Vue({
  render: h => h(App)
}).$mount("#app");
