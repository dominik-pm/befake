<script>
import MyButton from "../ui/Button.vue";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Realmoji from "./Realmoji.vue";

export default {
  props: ["postID", "realmojis"],
  data() {
    return {
      file: null,
      imageurl: null,
      loading: false,
      image: {},
      user: this.$store.state.user,
      type: "instant"
    };
  },
  methods: {
    onFileChange(e) {
      console.log(e);
      this.file = e.target.files[0];
      this.imageurl = URL.createObjectURL(this.file);
      //   this.$emit("upload", this.file, this.secondary);
    },
    async uploadPhotoToBeReal(file) {
      //Smiling realmoji request template
      /*
      PUT https://mobile.bereal.com/api/person/me/realmojis HTTP/2.0
      bereal-platform: android
      bereal-app-language: en
      bereal-device-language: en
      bereal-app-version: 0.61.4
      bereal-os-version: 8.1.0
      bereal-device-id: e8c360e84a94e38e
      bereal-timezone: GMT
      x-datadog-trace-id: 8599253524156962857
      x-datadog-parent-id: 1205216895654499725
      x-datadog-origin: rum
      x-datadog-sampling-priority: 1
      x-datadog-sampled: 1
      authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ3dU5ITVNMUWtrV2dyVGdIRVJ5U3pOU0Jqc1IyIiwidXNlcl9pZCI6Ind1TkhNU0xRa2tXZ3JUZ0hFUnlTek5TQmpzUjIiLCJwaG9uZV9udW1iZXIiOiIrNDM2ODE4MTg0NjcxMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5iZXJlYWwudGVhbS8iLCJhdWQiOiJhbmRyb2lkIiwiaWF0IjoxNjc0MTM3NjgwLCJleHAiOjE2NzQxNDEyODB9.J-a6YCj01Pr8-aFo-f9lrMB5fJiyp3zKsfesz8WtAxc
      content-type: application/json; charset=utf-8
      content-length: 154
      accept-encoding: gzip
      user-agent: okhttp/4.10.0

      {"media":{"bucket":"storage.bere.al","path":"Photos/wuNHMSLQkkWgrTgHERySzNSBjsR2/realmoji/OIpUbA-dR6DAIqzo.webp","width":500,"height":500},"emoji":"😃"}
      */  
      //1: GET google signed url
      /*
      GET https://mobile.bereal.com/api/content/realmojis/upload-url?mimeType=image%2Fwebp HTTP/2.0
      bereal-platform: android
      bereal-app-language: en
      bereal-device-language: en
      bereal-app-version: 0.61.4
      bereal-os-version: 8.1.0
      bereal-device-id: e8c360e84a94e38e
      bereal-timezone: GMT
      x-datadog-trace-id: 4376104791417637882
      x-datadog-parent-id: 2973318169843754861
      x-datadog-origin: rum
      x-datadog-sampling-priority: 1
      x-datadog-sampled: 1
      authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ3dU5ITVNMUWtrV2dyVGdIRVJ5U3pOU0Jqc1IyIiwidXNlcl9pZCI6Ind1TkhNU0xRa2tXZ3JUZ0hFUnlTek5TQmpzUjIiLCJwaG9uZV9udW1iZXIiOiIrNDM2ODE4MTg0NjcxMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5iZXJlYWwudGVhbS8iLCJhdWQiOiJhbmRyb2lkIiwiaWF0IjoxNjc0MTI4NDE0LCJleHAiOjE2NzQxMzIwMTR9.i4WLRsrsu9HndtBI6Botqv2DlnlsURf1WFkwA86UAFc
      accept-encoding: gzip
      user-agent: okhttp/4.10.0
      if-none-match: W/"507-M16WxEgA1LffRgMAGSRIlonfNV8"
      */
      //2: PUT file into google storage
      /*
      PUT https://storage.googleapis.com/storage.bere.al/Photos/wuNHMSLQkkWgrTgHERySzNSBjsR2/realmoji/RcWoVe0kIqnk84Yb.webp?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=prod-backend-fasterstore%40alexisbarreyat-bereal.iam.gserviceaccount.com%2F20230117%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230117T125904Z&X-Goog-Expires=36000&X-Goog-SignedHeaders=cache-control%3Bcontent-type%3Bhost%3Bx-goog-content-length-range&X-Goog-Signature=33a5142ee84d2162875f7e0bd7314e63e6dd888e868e29ea1a0f253d2e9ffaab550698c5a17de7abb68dc4c82beccadc8c4b752e66e57ef1198fd1ba00c49510db06279c8415bb65dc9216f94186454925d4014472a1801acbd581dcd3112536439dac500722d0c33a54350de8c879b668c6bd7ba81af96ab3b21c8eb19fcb6a3115f61984140c619308f23f0afaf19c5ebbe5b4e59e062da4de7859569aab8b5ddfff667d36bb5317a41ea3e4dccadbde091b7a8f655852b1281875afd5534f3fe6876b09d556f0f68c581ea6d1b1ee142e1bcadcb579d479d498b7e306dec9399656060b8499680d6f06d5dbf904063431600bd898b29feb79c9dbb19636ee HTTP/2.0
      cache-control: public,max-age=2592000
      x-goog-content-length-range: 1024,1048576
      content-type: image/webp
      content-length: 2746
      body: WEBP
      */
      //3: PUT Reaction onto post
      /*
      PUT https://mobile.bereal.com/api/content/realmojis/instant?postId=K_d3uokwQYAkP1n-ZIgYA&postUserId=fH8Jk6M3BRRA3FdJco9MkpFCb823 HTTP/2.0
      bereal-platform: android
      bereal-app-language: en
      bereal-device-language: en
      bereal-app-version: 0.61.4
      bereal-os-version: 8.1.0
      bereal-device-id: e8c360e84a94e38e
      bereal-timezone: GMT
      x-datadog-trace-id: 2399124126074294684
      x-datadog-parent-id: 3527205391724013327
      x-datadog-origin: rum
      x-datadog-sampling-priority: 1
      x-datadog-sampled: 1
      authorization: Bearer #
      content-type: application/json; charset=utf-8
      content-length: 165
      accept-encoding: gzip
      user-agent: okhttp/4.10.0

      {"media":{"bucket":"storage.bere.al","path":"Photos/wuNHMSLQkkWgrTgHERySzNSBjsR2/realmoji/88k-w7eypgbXjR4lWwczPKTbkeoRDs8vXSo9EOi9RO.webp","width":500,"height":500}}
      */
      let response = await this.getSignedUploadURL(this.$type.realmoji)
      response = response.data
      await this.putFileIntoGoogleStorage(file, response)
      
    },
    async submitRealMoji(uploadToStorage = true, realmoji = null) {
      this.loading = true;
      console.log(this.postID);
      if (uploadToStorage) {
        try {
          await this.uploadPhotoToBeReal(this.file);
        } catch (err) {
          console.log(err);
          return;
        }
      }
     
      if (realmoji == null) {
        fetch(
        `${this.$store.state.proxyUrl}/https://mobile.bereal.com/api/content/realmojis/instant?postId=${this.postID}&postUserId=${this.user.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            media: {
              path: this.image.path,
              bucket: "storage.bere.al",
              width: 500,
              height: 500,
            },
          }),
        }
      )
        .then((res) => {
          if (res.status !== 200) throw new Error("Failed to upload");
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data);
          this.$store.dispatch("getPosts").then((d) => {
            this.loading = false;
            this.file = null;
            this.imageurl = null;
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$store.commit("error", "Failed to upload");
        });
      } else {
        fetch(
        `${this.$store.state.proxyUrl}/https://mobile.bereal.com/api/content/realmojis?postId=${this.postID}&postUserId=${this.user.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            emoji: realmoji.emoji
          }),
        }
      )
        .then((res) => {
          if (res.status !== 200) throw new Error("Failed to upload");
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data);
          this.$store.dispatch("getPosts").then((d) => {
            this.loading = false;
            this.file = null;
            this.imageurl = null;
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$store.commit("error", "Failed to upload");
        });
      }
      
    },
    async setRealMoji() {
      fetch(
        `${this.$store.state.proxyUrl}/https://mobile.bereal.com/api/person/me/realmojis`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            media: {
              path: this.image.path != null ? this.image.path : realmoji.media.url.substring(realmoji.media.url.search("Photos")),
              bucket: "storage.bere.al",
              width: 500,
              height: 500,
            },
            emoji: realmoji.emoji
          }),
        }
      )
        .then((res) => {
          if (res.status !== 200) throw new Error("Failed to upload");
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data);
          this.$store.dispatch("getPosts").then((d) => {
            this.loading = false;
            this.file = null;
            this.imageurl = null;
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$store.commit("error", "Failed to upload");
        });
    }
  },

  components: { MyButton, Realmoji },
};
</script>
<template>
  <div class="flex items-center gap-3">
    <!-- <div>Hi</div> -->
    <div class="flex flex-row flex-wrap">
      <Realmoji :emoji="'👍'" @clicked=" () => submitRealMoji(false, realmojis.find(element => element.emoji == '👍'))" :realmoji="realmojis.find(element => element.emoji == '👍')" :own="true"></Realmoji>
      <Realmoji :emoji="'😃'" @clicked=" () => submitRealMoji(false, realmojis.find(element => element.emoji == '😃'))" :realmoji="realmojis.find(element => element.emoji == '😃')" :own="true"></Realmoji>
      <Realmoji :emoji="'😂'" @clicked=" () => submitRealMoji(false, realmojis.find(element => element.emoji == '😂'))" :realmoji="realmojis.find(element => element.emoji == '😂')" :own="true"></Realmoji>
      <Realmoji :emoji="'😮'" @clicked=" () => submitRealMoji(false, realmojis.find(element => element.emoji == '😮'))" :realmoji="realmojis.find(element => element.emoji == '😮')" :own="true"></Realmoji>
      <Realmoji :emoji="'😍'" @clicked=" () => submitRealMoji(false, realmojis.find(element => element.emoji == '😍'))" :realmoji="realmojis.find(element => element.emoji == '😍')" :own="true"></Realmoji>

      <!--
      <div v-for="(realmoji, index) in realmojis"> 
        <Realmoji @clicked=" () => submitRealMoji(false, realmoji)" :realmoji="realmoji" :own="true"></Realmoji>
      </div>
      -->
        <!--
        <select v-model="type" class="w-80">
          <option disabled>Choose Emoji Type to upload</option>
          <option>😃</option>
          <option>😂</option>
          <option>👍</option>
          <option>😮</option>
          <option>😍</option>
        </select>
        -->
      <div>
        <label :for="postID">
          <div
            class="border-white w-24 h-24 rounded-[50%] border-2 cursor-pointer relative">
            <input
              type="file"
              :id="postID"
              style="display: none"
              name="image"
              @change="onFileChange" />

            <div v-if="!file">
              <svg
                class="w-24 h-24 rp"
                width="107"
                height="107"
                viewBox="0 0 107 107"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="18.3429"
                  y="45.8571"
                  width="69.8048"
                  height="15.2857"
                  fill="white" />
                <rect
                  x="45.8571"
                  y="88.1476"
                  width="69.8048"
                  height="15.2857"
                  transform="rotate(-90 45.8571 88.1476)"
                  fill="white" />
              </svg>
            </div>
            <div v-else class="cursor-pointer">
              <img :src="imageurl" class="w-24 rounded-[50%]" />
            </div>
            <span class="absolute top-[50px] left-[60px] text-5xl">
              ⚡
            </span>
          </div>
        </label>
      </div>
        <MyButton @clickedd="submitRealMoji" :loading="loading">Upload </MyButton>
    </div>
  </div>
</template>