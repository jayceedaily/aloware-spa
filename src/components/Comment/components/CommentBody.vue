<template>
  <router-link
    class="text-gray-800 dark:text-white font-light mb-2"
    :to="'/thread/' + comment.id"
    ><span v-html="body"></span
  ></router-link>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    comment: {
      type: Object,
    },
  },
  setup(props) {
    /**
     * Encode hashtags and user tags
     */
    const parseBody = (content) => {
      return content
        .replace(/#(\w+)/g, '<a class="text-blue-400" href="tag/$1">#$1</a>')
        .replace(/@(\w+)/g, '<a class="text-blue-400" href="/$1">@$1</a>');
    };

    const body = ref(parseBody(props.comment.body));

    return {
      body,
    };
  },
};
</script>

<style></style>
