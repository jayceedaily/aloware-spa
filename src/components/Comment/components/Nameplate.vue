<template>
  <div>
    <a class="gap-1 inline-flex" :href="'/' + username">
      <div class="hover:underline font-medium">
        {{ name }}
      </div>

      <div>@{{ username }}</div>

      <div class="text-gray-600 font-normal">
        - {{ moment(datetime).fromNow() }}
      </div>
    </a>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    datetime: {
      type: String,
    },
  },
  setup() {
    return { moment };
  },
};
</script>

<style></style>
