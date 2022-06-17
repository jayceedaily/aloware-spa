<template>
  <div class="dark:text-gray-300">
    <div class="flex">
      <div class="flex-1">
        <div class="flex content-center">
          <FakeAvatar
            class="flex-shrink-0 w-5 h-5 mr-1"
            :value="comment.created_by.name"
          />
          <Nameplate
            :username="comment.created_by.username"
            :name="comment.created_by.name"
            :datetime="comment.created_at"
          />
        </div>

        <router-link
          class="text-gray-800 dark:text-white font-light mb-2"
          :to="'/thread/' + comment.id"
          >{{ comment.body }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import Option from "../components/Option/Index.vue";
import { ref } from "@vue/reactivity";
import axios from "axios";
import FakeAvatar from "./FakeAvatar.vue";
import resolveOptions from "./Comment/comment-option";
import HeroIcon from "./HeroIcon/Index.vue";
import Nameplate from "./Comment/components/Nameplate.vue";

export default {
  name: "CommentMini",
  props: {
    comment: {
      type: Object,
      required: false,
    },
  },

  components: {
    // Comment,
    FakeAvatar,
    HeroIcon,
    Option,
    Nameplate,
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
