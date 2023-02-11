<script>
import FriendPosts from '../components/posts/FriendPosts.vue';
import config from '../data/configClient.js'
import MyInput from '../components/ui/Input.vue'
import { Input } from 'postcss';
import singlePostViewVue from "../components/posts/singlePostView.vue";

export default {
    data() {
        const posts = []
        return {
            posts,
            page: 1,
            loadPostsAvailable: true
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
            console.log('loading posts - page: ' + this.page)

            this.disablePostLoadingForSeconds(1)

            if (config.test) {
                this.posts = this.posts.concat(getDummyPosts())
                return
            }

            fetch(`${config.apiURL}/getPosts?site=${this.page}`)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((post, index, data) => {
                    data[index] = this.mapPostToBerealPost(post)
                });
                console.log("data object")
                console.log(data)
                this.posts = this.posts.concat(data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        disablePostLoadingForSeconds(seconds) {
            this.loadPostsAvailable = false
            setTimeout(() => {
                this.loadPostsAvailable = true
            }, 1000 * seconds)
        },
        loadMorePosts() {
            if (this.loadPostsAvailable) {
                this.page = this.page + 1
                this.loadPosts()
            }
        },
        handleScroll(e) {
            let element = this.$refs.scrollComponent
            if (element.getBoundingClientRect().bottom < window.innerHeight + 100) {
                this.loadMorePosts()
            }
        },
        mapPostToBerealPost(post) {
            const createdAtSeconds = post.seconds != null ? post.seconds : getSecondsFromTimeString(post.date);
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
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll)
        this.loadPosts()
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll)
    },
}
const getSecondsFromTimeString = (dateString) => {
    let date = new Date(dateString)
    return Math.floor(date.getTime() / 1000)
}
const getDummyPosts = () => {
    const posts = []
    posts.push({
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
    posts.push({
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
    return posts
}
</script>

<template>
    <div class="scrolling-component" ref="scrollComponent">
        <div v-for="(post, index) in posts" class="m-auto">
            <single-post-view-vue :post="post" :realmojis="[]" class="mt-10" />
        </div>
    </div>
</template>