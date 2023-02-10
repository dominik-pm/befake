import { createApp } from "vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Friends from "./pages/Friends.vue";
import Map from "./pages/Map.vue";
import AllFriendPosts from "./pages/AllFriendPosts.vue"
import AllPostsFeed from "./pages/AllPostsFeed.vue"
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
  { path: "/allfriendposts", component: AllFriendPosts},
  { path: "/allpostsfeed", component: AllPostsFeed}
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
app.mixin({
  methods: {
      async getSignedUploadURL(type) {
      const apiURL = `${this.$store.state.proxyUrl}/https://mobile.bereal.com/api/content/${type}/upload-url?mimeType=image%2Fwebp`
      const headers = {
        "authorization": `Bearer ${localStorage.getItem("token")}`,  
        "accept-encoding": "gzip",
        "user-agent": "okhttp/4.10.0",
        "if-none-match": 'W/"507-M16WxEgA1LffRgMAGSRIlonfNV8"'
      };
      let returnData
      await fetch(apiURL, {
        method: "GET",
        headers: headers
      })
      .then(res => res.json())
      .then(data => {       
         returnData = data
      })
      return returnData
    },
    async putFileIntoGoogleStorage(file, response) {
      let bucket = response.bucket
      let expireAt = response.expireAt
      let headers = response.headers
      let imagePath = response.path
      let url = response.url
      fetch(`${this.$store.state.proxyUrl}/${url}`, {
        method: "PUT",
        headers,
        body: file
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  }
})
app.config.globalProperties.$type = {
  realmoji: "realmojis",
  post: "posts"
}
app.mount("#app");

