<script>
export default {
  props: {
    realmoji: {
      type: Object,
      default: null
    },
    own: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<template>
  <div v-if="own == false" class="flex items-center mb-2">
    <div class="relative">
      <img
        referrerpolicy="no-referrer"
        v-bind:src="realmoji.uri"
        class="w-24 rounded-[50%]" />

      <span class="absolute top-[50px] left-[60px] text-5xl"
        >{{ realmoji.emoji }}
      </span>
    </div>
    <span class="font-bold ml-4">{{ realmoji.userName }}</span>
  </div>
  <div v-else-if="realmoji != null">
    <img
        referrerpolicy="no-referrer"
        v-bind:src="realmoji.uri"
        class="w-24 rounded-[50%]" />

      <span class="absolute top-[50px] left-[60px] text-5xl"
        >{{ realmoji.emoji }}
      </span>
  </div>
  <div v-else>
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
</template>
