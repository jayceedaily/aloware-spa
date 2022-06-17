<template>
  <router-link
    class="text-gray-800 dark:text-white font-light mb-2"
    :to="'/thread/' + comment.id"
    >{{ comment.body }}</router-link
  >
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
    },
  },
};
</script>

<style></style>
