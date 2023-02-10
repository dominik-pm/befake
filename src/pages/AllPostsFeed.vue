<script>
import FriendPosts from '../components/posts/FriendPosts.vue';
import config from '../data/configClient.js'
import MyInput from '../components/ui/Input.vue'
import { Input } from 'postcss';
import singlePostViewVue from "../components/posts/singlePostView.vue";

let posts

export default {
    data() {
        return {
            posts: []
        }
    },
    components: {
        FriendPosts,
        MyInput,
        Input,
        singlePostViewVue
    },
    methods: {
        loadPosts() {
            const page = 0
            fetch(`${config.apiURL}/getPosts?site=${page}`)
            .then((response) => response.json())
            .then((data) => 
            {
                this.posts = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        loadDummyPosts() {
            this.posts.push({
                "id": "zSvXlUMIEBVqa5pYnbMhW",
                "username": "benn",
                "url1": "https://cdn.bereal.network/Photos/zZAlTbMw1ySk8wZTnunzHdrOb6l1/post/PEA86HmE91jcTMe5.webp",
                "url2": "https://cdn.bereal.network/Photos/zZAlTbMw1ySk8wZTnunzHdrOb6l1/post/g3u70SgaALNZbq-t.webp",
                "comment": "Ausmisten macht Spaß", // nullable
                "date": "2023-01-27T12:01:56",
                "user": {
                    "profilePicture": {
                        "url": "https://cdn.bereal.network/Photos/1CULHhV1G3PqK923EeJm4Xutw5F2/profile/LDcaieJY3A0_lQNrvc2JA.webp"
                    }
                },
                "lat": null, // nullable
                "long": null, // nullable
                "userId": "zZAlTbMw1ySk8wZTnunzHdrOb6l1",
                "seconds": null, // nullable
                "nanoseconds": null // nullable
            })
            this.posts.push({
                "id": "Z-NKjioTglzkCzD4ZqDcc",
                "username": "domm",
                "url1": "https://cdn.bereal.network/Photos/zZAlTbMw1ySk8wZTnunzHdrOb6l1/post/z2LHM2bVjeZdhINx.webp",
                "url2": "https://cdn.bereal.network/Photos/zZAlTbMw1ySk8wZTnunzHdrOb6l1/post/UENtQDI6YXiuAOsi.webp",
                "comment": null, // nullable
                "date": "2023-02-08T11:25:03",
                "user": {
                    "profilePicture": {
                        "url": "https://cdn.bereal.network/Photos/1CULHhV1G3PqK923EeJm4Xutw5F2/profile/LDcaieJY3A0_lQNrvc2JA.webp"
                    }
                },
                "lat": null, // nullable
                "long": null, // nullable
                "userId": "zZAlTbMw1ySk8wZTnunzHdrOb6l1",
                "seconds": 1675851347, // nullable
                "nanoseconds": 433000000 // nullable
            })
        },
        mapPostToBerealPost(post) {
            const createdAtSeconds = post.seconds != null ? post.seconds : this.getSecondsFromTimeString(post.date);
            const profilePicture = post.profilePicture

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
                "realMojis": []
            }
        },
        getSecondsFromTimeString(dateString) {
            let date = new Date(dateString)
            return Math.floor(date.getTime() / 1000)
        }
    },
    mounted() {
        if (config.test) {
            this.loadDummyPosts()
        } else this.loadPosts()
    }
}
</script>

<template>
    <div v-for="(post, index) in posts" class="m-auto">
        <single-post-view-vue :post="mapPostToBerealPost(post)" :realmojis="[]" class="mt-10" />
    </div>
</template>