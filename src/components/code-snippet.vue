<template>
  <div class="code-snippet__container">
    <div class="code-snippet__wrapper">
      <pre class="code-snippet__body">{{ code }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CodeSnippet",
  props: {
    code: String,
  },
};
</script>
