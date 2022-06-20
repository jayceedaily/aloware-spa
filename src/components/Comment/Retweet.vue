<template>
  <div>
    <div class="flex dark:text-gray-500 px-3 pt-3">
      <div class="w-10 ml-2">
        <HeroIcon icon="RefreshIcon" class="h-5 w-5 flex-shrink mr-2" />
      </div>
      <div class="flex-1">{{ comment.created_by.username }} Retweeted</div>
    </div>

    <Default :comment="comment.shared" />
  </div>
</template>

<script>
import Default from "../Comment/Default.vue";
import HeroIcon from "../HeroIcon/Index.vue";

export default {
  name: "Retweet",
  components: {
    Default,
    HeroIcon,
  },
  props: {
    comment: {
      type: Object,
    },
  },
};
</script>

<style></style>
