<template>
  <div>
    <a class="gap-1 inline-flex" :href="'/' + username">
      <div class="hover:underline font-medium">
        {{ name }}
      </div>

      <div class="flex">
        @{{ username }}
        <span><HeroIcon icon="BadgeCheckIcon" type="solid" class="ml-1 w-5"/></span>
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
