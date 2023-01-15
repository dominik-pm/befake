<script>
import FriendPosts from '../components/posts/FriendPosts.vue';
import config from '../data/config.js'




export default {
    data() {
        return {
            friends: []
        }
    },
    components: {
        FriendPosts
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
    <div v-for="(friend, index) in friends" class="m-auto">
        <FriendPosts :user-name="friend['username']"/>
    </div>
</template>