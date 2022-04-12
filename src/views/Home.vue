<template>

  <div class="container mx-auto pt-10 pb-10">
    <div class="mb-5">
      <h1 class="text-3xl font-bold">Fake Post</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat labore odio eum adipisci? Iure et perspiciatis perferendis doloribus, quidem quisquam facere saepe hic reprehenderit atque maxime voluptatem labore? Provident, rem.</p>
    </div>

    <div class="mb-10">
      <form action="" @submit.prevent="createPostComment">
        <input placeholder="Username" required type="text" name="" id="" class="w-full border mb-3 rounded-sm" v-model="newComment.name">
        <textarea placeholder="Write something here..." name=""  required  id="" cols="30" rows="5" class="w-full border rounded-sm" v-model="newComment.body"></textarea>
        <button :disabled="newCommentIsLoading" class="  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :class="[newCommentIsLoading && 'bg-gray-300 cursor-not-allowed', !newCommentIsLoading && 'bg-blue-500 hover:bg-blue-700']"
              type="submit">
          Post Comment
      </button>
      </form>
    </div>

    <div v-for="comment in comments" :key="comment.id" class="mb-3">
      <Comment :comment="comment" :maxDepth="3"/>
    </div>
    
    <div class="text-center">
      
      <button v-if="currentPage <= lastPage" @click="postCommentIndex(currentPage+1)" class="border rounded-md px-5 py-3" :disabled="commentsLoading">
        <RefreshIcon v-if="commentsLoading" class="h-5 w-5  inline-block mr-2 animate-reverse-spin" />
        <span>{{commentsLoading ? 'Loading' : 'Load More'}}</span>
      </button>

    </div>

  </div>
    
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Comment from '../components/Comment.vue';
import { RefreshIcon } from '@heroicons/vue/outline';

import axios from 'axios'
import { ref } from '@vue/reactivity';
export default {
  name: 'Home',
  components: {
    HelloWorld,
    Comment,
    RefreshIcon
  },
  setup() {

      const comments = ref([]);

      const currentPage = ref(1);
      const lastPage = ref(1);

      const newComment = ref({
        name: null,
        body: null
      });

      const newCommentIsLoading = ref(false);
      const commentsLoading = ref(false);

      const postCommentIndex = (page = 1) => {

        commentsLoading.value = true;

        axios.get(`https://aloware-api.test/api/posts/1/comments?page=${page}`).then(response => {

          comments.value = comments.value.concat(response.data.data);

          currentPage.value = response.data.current_page;

          lastPage.value = response.data.last_page;

          commentsLoading.value = false;

        })
      }

      const createPostComment = () => {

        newCommentIsLoading.value = true;

        axios.post('https://aloware-api.test/api/posts/1/comments', newComment.value).then(response => {

          comments.value.unshift(response.data)

          newComment.value = {
            name: null,
            body: null
          }
          newCommentIsLoading.value = false;
        })
      }

      postCommentIndex();

      return {
        comments,
        newComment,
        newCommentIsLoading,
        currentPage,
        lastPage,
        commentsLoading,

        createPostComment,
        postCommentIndex
      }

  }
}
</script>
