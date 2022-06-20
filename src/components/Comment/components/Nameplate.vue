<template>
  <div>
    <a class="gap-1 inline-flex" :href="'/' + username">
      <div class="flex hover:underline font-medium">
        {{ name }}
        <HeroIcon icon="BadgeCheckIcon" type="solid" class="ml-1 w-5" />
      </div>

      <div class="flex">
        <span class="dark:text-gray-600"> @{{ username }} </span>
      </div>

      <div class="text-gray-600 font-normal">
        - {{ moment(datetime).fromNow() }}
      </div>
    </a>
  </div>
</template>

<script>
import moment from "moment";
import HeroIcon from "../../HeroIcon/Index";
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
  components: {
    HeroIcon,
  },
  setup() {
    return { moment };
  },
};
</script>

<style></style>
