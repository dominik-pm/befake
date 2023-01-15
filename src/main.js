import { createApp } from "vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Friends from "./pages/Friends.vue";
import Map from "./pages/Map.vue";
import AllFriendPosts from "./pages/AllFriendPosts.vue"
import "./index.css";
import App from "./App.vue";
import VueClipboard from "vue3-clipboard";
import { createRouter, createWebHistory } from "vue-router";
import VueGtag from "vue-gtag";
import store from "./store/index.js";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowDown)



const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/search", component: Friends },
  { path: "/map", component: Map },
  { path: "/allfriendposts", component: AllFriendPosts}
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(
  VueGtag,
  {
    config: { id: "G-ZJ1LQLNXRG" },
  },
  router
);
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCEYjMqd66uqA-4AXsI0V-1ZyLz23dFEyY",
  },
});
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");

