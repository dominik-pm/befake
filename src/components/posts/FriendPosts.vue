<script>
import { now } from 'moment'
import config from '../../data/config.js'
import 'tw-elements'
import RealMoji from '../posts/Realmoji.vue'



export default {
    props: ["userName"],
    components: {
        RealMoji
    },
    data() {
        return {
            posts: [],
            realmojis: [],
            fetched: false
        }
    },
    methods: {
        loadPosts() {
            if (!this.fetched) {
                fetch(
                `${config.apiURL}/getPostsByUsername/${this.userName}`
                )
                .then((response) => response.json())
                .then((data) => {
                    this.posts = data
                })
                this.fetched != this.fetched
            }
            
        },
        loadRealmojis() {
            if (!this.fetched) {
                fetch(
                `${config.apiURL}/getRealMojisByUsername/${this.userName}`
                )
                .then((response) => response.json())
                .then((data) => {
                    this.realmojis = data
                })
            }
        },
        loadInformation() {
            this.loadRealmojis()
            this.loadPosts()
        },
        loadPostsDummy() {
            this.posts.push({
                url1: "https://media.discordapp.net/attachments/765996355696197643/1063871996867391619/image.png",
                url2: "https://media.discordapp.net/attachments/765996355696197643/1063871933386600448/image.png",
                date: new Date()
            })
        },
        getDateFormatted(post) {
            let date = new Date(post.date)
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    },
    mounted() {
        if (config.test) {
            this.loadPostsDummy()
        }
        
    }
}
</script>

<template>
    <div class="m-auto text-center">
        <button @click="loadInformation()" class="m-auto transition duration-1000 ease-in-out text-center"  type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + userName.replaceAll('.','')" aria-expanded="false" aria-controls="collapseExample">
            <h1 class="inline-block mr-5">{{ userName }}</h1>
            <font-awesome-icon icon="fa-arrow-down" size="2x" />
        </button>
        <div class="collapse" v-bind:id="'collapse' + userName.replaceAll('.','')">
            <div class="flex flex-wrap flex-row m-auto justify-center">
                <RealMoji v-for="(realmoji, index) in realmojis" :realmoji="{uri: realmoji.url, emoji: '', userName: ''}"/>
            </div>
            <ul v-for="(post, index) of posts">
                <li class="rounded-lg border-4">
                    <h2 class="text-center mb-8 mt-8">{{getDateFormatted(post)}}</h2>
                    <img :src="post.url1" class="m-auto mb-8">
                    <img :src="post.url2" class="m-auto mb-8">
                </li>
            </ul>
        </div>
    </div>

</template>

<style>
h1 {
    font-size: xx-large !important;
}
h2 {
    font-size: x-large !important;
}
img {
    max-height: 500px;
}
</style>