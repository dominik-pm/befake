<style>
img[src*="https://cdn.bereal.network/cdn-cgi"]
{
  border-radius: 50%;
}
img[src*="ui-avatars.com"] {
  border-radius: 50%;
}
</style>
<template>
  <GMapMap
    :center="center"
    :zoom="4"
    map-type-id="terrain"
    style="height: 100vh"
    :options="mapStyles">
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :icon="{
        url: m.pic,
        scaledSize: { width: 50, height: 50 },
      }"
      @click="
        center = m.position;
        openMarker(index, m);
      ">
      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID === index" 
        v-if="openedMarkerID === index">
        <singlePostComponent :post="m.post" :realmojis="realmojis" class="" /> 
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>
<script>
import singlePostComponent from "../components/posts/singlePostComponent.vue";
import sha256 from "js-sha256";
import config from '../data/configClient.js'

export default {
  name: "App",
  data() {
    return {
      mapStyles: {
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#242f3e",
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#746855",
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#242f3e",
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#d59563",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#d59563",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#263c3f",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6b9a76",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#38414e",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#212a37",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9ca5b3",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#746855",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#1f2835",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#f3d19c",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#2f3948",
              },
            ],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#d59563",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#17263c",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#515c6d",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#17263c",
              },
            ],
          },
        ],
      },
      openedMarkerID: null,
      center: { lat: 0, lng: 0 },
      markers: [],
      posts: [],
      realmojis: []
    };
  },
  async beforeMount() {
    await fetch(`${config.apiURL}/getLocationPosts`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((post, index, data) => {
            data[index] = this.mapPostToBerealPost(post)
        });
        this.posts = data
    })
    .catch(err => {
        console.log(err)
    })

    await this.getRealmojis()

    this.markers = this.posts
      .filter((p) => p.location)
      .map((post) => {

        return {
          position: {
            lat: post.location._latitude,
            lng: post.location._longitude,
            // gravatar identicon
          },
          pic: post.user.profilePicture.url
            ? post.user.profilePicture.url
            : `https://ui-avatars.com/api/?length=1&name=${
                post.user.username
              }&background=${sha256(post.user.username).substring(0, 3)}`,
          post: post,
        };
      });
    // find the center of lat and lng for markers and make this the center

    this.markers.forEach((m) => {
      this.center.lat += m.position.lat;
      this.center.lng += m.position.lng;
    });
    this.center.lat /= this.markers.length;
    this.center.lng /= this.markers.length; 
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
    mapPostToBerealPost(post) {
      const createdAtSeconds = post.seconds != null ? post.seconds : getSecondsFromTimeString(post.date);
      const profilePicture = post.profilePicture
      const location = post.long && post.lat ? {
          "_latitude": post.lat,
          "_longitude": post.long
      } : null

      return {
          "id": post.id,
          "notificationID": "",
          "ownerID": post.userId,
          "userName": post.username,
          "user": {
              "id": post.userId,
              "username": post.username,
              "profilePicture": {
                  "height": 200,
                  "width": 200,
                  "url": profilePicture
              }
          },
          "caption": post.comment,
          "photoURL": post.url1,
          "imageWidth": 1500,
          "imageHeight": 2000,
          "secondaryPhotoURL": post.url2,
          "secondaryImageHeight": 2000,
          "secondaryImageWidth": 1500,
          "retakeCounter": 0,
          "creationDate": {
              "_seconds": createdAtSeconds,
              "_nanoseconds": 0
          },
          "updatedAt": createdAtSeconds*1000,
          "takenAt": {
              "_seconds": createdAtSeconds*1000,
              "_nanoseconds": 0
          },
          "location": location,
          "realMojis": []
      }
    },
    async getRealmojis() {
      fetch(`${this.$store.state.proxyUrl}/https://mobile.bereal.com/api/person/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => this.realmojis = data.realmojis)
    }
  },
  components: {
    singlePostComponent,
  },
};
</script>
