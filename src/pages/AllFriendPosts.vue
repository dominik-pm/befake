<script>
import FriendPosts from '../components/posts/FriendPosts.vue';
import config from '../data/config.js'
import MyInput from '../components/ui/Input.vue'
import { Input } from 'postcss';



export default {
    data() {
        return {
            friends: []
        }
    },
    components: {
    FriendPosts,
    MyInput,
    Input
},
    methods: {
        loadFriends() {
            fetch(config.apiURL)
            .then((response) => response.json)
            .then((data) => {this.friends = [...data]})
        },
        loadFriendsDummy() {
            this.friends.push({
                username: "ben"
            })
            this.friends.push({
                username: "mann"
            })
        },
        filter(name) {
            for (let friendpost of document.getElementsByClassName("friendpost")) {
                if (!friendpost.innerText.includes(name.toLowerCase())) {
                    friendpost.style = "display:none"
                } else {
                    friendpost.style.display = "block"
                }
            }
        }
    },
    mounted() {
        if (config.test) {
            this.loadFriendsDummy()
        } else this.loadFriends()
    }
}
</script>

<template>
    <div>
        <input type="search" id="search" @input="event => {filter(event.target.value)}" class="m-auto mb-5 block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Filter user"/>
    </div>
    <div v-for="(friend, index) in friends" class="m-auto">
        <FriendPosts class="friendpost" :user-name="friend['username']"/>
    </div>
</template>