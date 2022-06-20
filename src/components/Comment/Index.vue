<template>
  <div class="border-b dark:border-gray-700 border-gray-300">
    <component :is="tweetType" :comment="comment" class="" />
  </div>
</template>

<script>
import moment from "moment";
// import Option from "../Option/Index.vue";
import { ref, computed } from "@vue/reactivity";
import axios from "axios";
import FakeAvatar from "../FakeAvatar.vue";
import resolveOptions from "./comment-option";
import HeroIcon from "../HeroIcon/Index";
import { defineAsyncComponent } from "@vue/runtime-core";

export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: false,
    },
  },

  components: {
    FakeAvatar,
    HeroIcon,
    Option,
  },

  setup(props) {
    const showMenu = ref(false);

    const tweetType = computed(() => {
      if (props.comment.parent) {
        return defineAsyncComponent(() => import("./Reply.vue"));
      }

      if (props.comment.shared && props.comment.body === null) {
        return defineAsyncComponent(() => import("./Retweet.vue"));
      }

      if (props.comment.shared && props.comment.body !== null) {
        return defineAsyncComponent(() => import("./Share.vue"));
      }

      return defineAsyncComponent(() => import("./Default.vue"));
    });

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

      tweetType,
      likeThread,
      handleSelect,
    };
  },
};
</script>

<style></style>
