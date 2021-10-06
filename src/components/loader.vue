<template>
  <div class="loader">
    <img :src="loadingImg" alt="Loading..." />
  </div>
</template>

<script lang="ts">
export default {
  name: "Loader",
  setup(): { loadingImg: string } {
    const loadingImg =
      "https://images.ctfassets.net/23aumh6u8s0i/6uIs4OSoWdWXxJmbR6fAeR/cb466b66b819d95ce148289b13655296/loader.svg";
    return {
      loadingImg,
    };
  },
};
</script>
