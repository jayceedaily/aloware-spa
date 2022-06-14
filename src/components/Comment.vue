<template>
  <div
    class="pt-3 pb-1 px-3 border-b dark:border-gray-700 border-gray-300 dark:text-gray-300"
  >
    <div class="flex">
      <FakeAvatar
        class="flex-shrink-0 w-10 h-10 mr-2"
        :value="comment.created_by.name"
      />
      <div class="flex-1">
        <div>
          <a
            class="gap-1 inline-flex"
            :href="'/' + comment.created_by.username"
          >
            <div class="hover:underline font-medium">
              {{ comment.created_by.name }}
            </div>

            <div>@{{ comment.created_by.username }}</div>

            <div class="text-gray-600 font-normal">
              - {{ moment(comment.created_at).fromNow() }}
            </div>
          </a>
        </div>

        <router-link
          class="text-gray-800 dark:text-white font-light mb-2 "
          :to="'/thread/' + comment.id"
          >{{ comment.body }}</router-link
        >

        <div class="flex gap-10 text-sm justify-between text-gray-400 dark:text-gray-600">
          <div class="w-10 flex items-center hover:text-blue-500">
            <button
              class="hover:bg-blue-100 py-2 px-2 rounded-full flex gap-2 mr-2"
            >
              <HeroIcon icon="AnnotationIcon" class="h-5 w-5" />
            </button>
            <div v-if="comment.replies_count">{{ comment.replies_count }}</div>
          </div>

          <button
            class="hover:bg-green-100 hover:text-green-500 py-2 px-2 rounded-full"
          >
            <HeroIcon icon="RefreshIcon" class="h-5 w-5" />
          </button>

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
            <div v-if="comment.likes_count">{{ comment.likes_count }}</div>
          </div>

          <button
            class="hover:text-blue-500 hover:bg-blue-200  hover-dark:bg-red-100  py-2 px-2 rounded-full"
          >
            <HeroIcon icon="UploadIcon" class="h-5 w-5 " />
          </button>
        </div>
      </div>
      <div>
        <button
          class="hover:bg-gray-200 py-2 px-2 rounded-full place-content-start text-gray-400"
          @click="showMenu = !showMenu"
        >
          <HeroIcon icon="DotsHorizontalIcon" class="h-5 w-5" />
        </button>
        <Option
          v-if="showMenu"
          @close="showMenu = !showMenu"
          @selected="handleSelect"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Option from "../components/Option/Index.vue";
import { ref } from "@vue/reactivity";
import axios from "axios";
import Comment from "./Comment.vue";
import FakeAvatar from "./FakeAvatar.vue";
import resolveOptions from "./Comment/comment-option";
import HeroIcon from "./HeroIcon/Index.vue";

export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: false,
    },
  },

  components: {
    Comment,
    FakeAvatar,
    HeroIcon,
    Option,
  },

  setup(props) {
    const showMenu = ref(false);
    const options = resolveOptions(props.comment.created_by.username);

    const handleSelect = (e) => {
      console.log(e);
    };

    const likeThread = () => {
      if (props.comment.liked) {
        axios.delete(
          `http://aloware-api.test/api/thread/${props.comment.id}/unlike`
        );
        props.comment.likes_count--;
      } else {
        axios.post(
          `http://aloware-api.test/api/thread/${props.comment.id}/like`
        );
        props.comment.likes_count++;
      }

      props.comment.liked = !props.comment.liked;
    };

    return {
      moment,
      showMenu,
      options,

      likeThread,
      handleSelect,
    };
  },
};
</script>

<style></style>
