<template>
  <div
    class="pt-3 pb-1 px-3 border-b dark:border-gray-700 border-gray-300 dark:text-gray-300"
  >
    {{ type }}
    <div class="flex">
      <FakeAvatar
        class="flex-shrink-0 w-10 h-10 mr-2"
        :value="comment.created_by.name"
      />
      <div class="flex-1">
        <div>
          <Nameplate
            :username="comment.created_by.username"
            :name="comment.created_by.name"
            :datetime="comment.created_at"
          />
        </div>
		<div>

		<CommentBody :comment="comment"/>
		<slot name="body" />
		</div>
		
       <ActionBar :comment="comment"/>
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
import Option from "../Option/Index.vue";
import { ref, computed } from "@vue/reactivity";
import axios from "axios";
import FakeAvatar from "../FakeAvatar.vue";
import resolveOptions from "./comment-option";
import HeroIcon from "../HeroIcon/Index.vue";
import Nameplate from "./components/Nameplate.vue";
import ActionBar from './components/ActionBar.vue';
import CommentBody from './components/CommentBody.vue';
import CommentMini from '../CommentMini.vue';

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
    Nameplate,
    ActionBar,
    CommentBody,
    CommentMini,
	
  },

  setup(props) {
    const showMenu = ref(false);


    const type = computed(() => {
      if (props.comment.parent) {
        return "reply";
      }

      if (props.comment.shared && props.comment.body === null) {
        return "retweet";
      }

      if (props.comment.shared && props.comment.body !== null) {
        return "share";
      }

      return "default";
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
     

      type,
      likeThread,
      handleSelect,
    };
  },
};
</script>

<style></style>
