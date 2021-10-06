<template>
  <div>
    <HeroBanner></HeroBanner>
    <NextSteps></NextSteps>
  </div>
</template>

<script lang="ts">
import HeroBanner from "@/components/hero-banner.vue";
import NextSteps from "@/components/next-steps.vue";

export default {
  name: "Home",
  components: { NextSteps, HeroBanner },
};
</script>
