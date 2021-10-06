<template>
  <a
    :href="resourceUrl"
    class="next-step"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3 class="next-step__headline">
      <img class="next-step__icon" :src="icon" alt="external link icon" />
      {{ title }}
    </h3>
    <p class="next-step__description">{{ description }}</p>
  </a>
</template>

<script lang="ts">
export default {
  name: "NextStep",
  props: {
    title: String,
    description: String,
    resourceUrl: String,
    icon: String,
  },
};
</script>
