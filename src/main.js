import devtools from "@vue/devtools";
import Vue from "vue";
import katex from "katex";
import "katex/dist/katex.min.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */);

Vue.use(katex);

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";

if (process.env.NODE_ENV === "development") {
  devtools.connect(/* host, port */);
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
