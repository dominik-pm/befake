<script>
import { now } from 'moment'
import config from '../../data/config.js'
import 'tw-elements'

let posts = []

export default {
    props: ["userName"],
    data() {
        return {
            count: 0
        }
    },
    methods: {
        loadPosts() {
            fetch(
                `${config.apiURL}/getPostsByUsername/${this.userName}`
                )
                .then((response) => response.json())
                .then((data) => {
                    for (let post of data) {
                        document.getElementById(`collapse${this.userName.replaceAll('.','')}`).innerHTML += `<li class="rounded-lg border-4"><h3 class="text-center mb-8">${post.date}</h3><img src="${post.url1}" class="m-auto mb-8"><img src="${post.url2}" class="m-auto mb-8"></li>`
                        
                    }
                })
        },
        loadPostsDummy() {
            this.posts.push({
                url1: "https://media.discordapp.net/attachments/765996355696197643/1063871996867391619/image.png",
                url2: "https://media.discordapp.net/attachments/765996355696197643/1063871933386600448/image.png",
                date: new Date()
            })
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
        <button @click="loadPosts()" class="m-auto transition duration-1000 ease-in-out text-center"  type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + userName.replaceAll('.','')" aria-expanded="false" aria-controls="collapseExample">
            <h1 class="inline-block mr-5">{{ userName }}</h1>
            <font-awesome-icon icon="fa-arrow-down" size="2x" />
        </button>
        <ul class="collapse overflow-y-scroll" v-bind:id="'collapse' + userName.replaceAll('.','')">
            
        </ul>
    </div>

</template>

<style>
h1 {
    font-size: xx-large !important;
}
img {
    max-height: 500px;
}
</style>