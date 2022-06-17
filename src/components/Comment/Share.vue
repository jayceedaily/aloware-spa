<template>
  <Default :comment="comment">
    <template #body>
      <CommentMini
        :comment="comment.shared"
        class="p-3 border dark:border-gray-600 my-2 rounded-lg hover:bg-gray-800"
      />
    </template>
  </Default>
</template>

<script>
import CommentMini from "../CommentMini.vue";
import Default from "./Default.vue";

export default {
  components: { CommentMini, Default },
  name: "Share",
  props: {
    comment: {
      type: Object,
    },
  },
};
</script>

<style></style>
