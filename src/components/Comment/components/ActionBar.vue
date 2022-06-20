<template>
  <div
    class="flex gap-10 text-sm justify-between text-gray-400 dark:text-gray-600"
  >
    <div class="w-10 flex items-center hover:text-blue-500">
      <button class="hover:bg-blue-100 py-2 px-2 rounded-full flex gap-2 mr-2">
        <HeroIcon icon="AnnotationIcon" class="h-5 w-5" />
      </button>
      <div v-if="comment.replies_count">
        {{ comment.replies_count }}
      </div>
    </div>
    <div class="w-10 flex items-center">
      <button
        class="hover:bg-green-100 hover:text-green-500 py-2 px-2 rounded-full"
        @click="showShareOption = !showShareOption"
      >
        <HeroIcon icon="RefreshIcon" class="h-5 w-5" />
      </button>
      <div v-if="comment.children_count">
        {{ comment.children_count }}
      </div>
      <Option
        v-if="showShareOption"
        @close="showShareOption = !showShareOption"
        :options="shareOptions"
      />
    </div>

    <div class="w-10 flex items-center hover:text-red-500">
      <button
        class="hover:bg-red-100 py-2 px-2 rounded-full flex gap-2 mr-2"
        @click="likeThread"
      >
        <HeroIcon
          icon="HeartIcon"
          type="solid"
          v-if="comment.liked"
          class="text-red-500 h-5 w-5"
        />
        <HeroIcon icon="HeartIcon" v-else class="h-5 w-5" />
      </button>
      <div v-if="comment.likes_count">
        {{ comment.likes_count }}
      </div>
    </div>

    <button
      class="hover:text-blue-500 hover:bg-blue-200 hover-dark:bg-red-100 py-2 px-2 rounded-full"
    >
      <HeroIcon icon="UploadIcon" class="h-5 w-5" />
    </button>
    <!-- <button
      v-if="comment.created_by.id === 1"
      class="hover:text-blue-500 hover:bg-blue-200 hover-dark:bg-red-100 py-2 px-2 rounded-full"
    >
      <HeroIcon icon="ChartBarIcon" class="h-5 w-5" />
    </button> -->
  </div>
</template>

<script>
import HeroIcon from "../../HeroIcon/Index.vue";
import Option from "../../Option/Index.vue";
import { ref } from "vue";
export default {
  components: {
    HeroIcon,
    Option,
  },
  props: {
    comment: { type: Object },
  },
  setup() {
    const showShareOption = ref(false);
    const shareOptions = ref([
      {
        label: "Retweet",
        icon: {
          name: "RefreshIcon",
        },
        event: "retweet",
      },
      {
        label: "Share",
        icon: {
          name: "PencilAltIcon",
        },
        event: "share",
      },
    ]);
    return {
      showShareOption,
      shareOptions,
    };
  },
};
</script>

<style></style>
