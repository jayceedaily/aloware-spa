<template>

  <div class="container mx-auto pt-10 pb-10 flex">
    
      <div class="w-1/4 border-r dark:border-gray-700"></div>
      <div class="w-2/4">
        <Comment  v-for="comment in comments" :key="comment.id" :comment="comment" :maxDepth="3"/>
      </div>
      <div class="w-1/4 border-l dark:border-gray-700"></div>



  </div>

    <div class="text-center">
      
      <button v-if="currentPage <= lastPage" @click="postCommentIndex(currentPage+1)" class="border rounded-md px-5 py-3" :disabled="commentsLoading">
        <RefreshIcon v-if="commentsLoading" class="h-5 w-5  inline-block mr-2 animate-reverse-spin" />
        <span>{{commentsLoading ? 'Loading' : 'Load More'}}</span>
      </button>

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


      axios.defaults.headers.common['Authorization'] = 'Bearer 1|Rc1zv1csIksqQiDRWLnHE4q3oCZ0OVA0esT24u57';

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

        axios.get(`http://aloware-api.test/api/threads?page=${page}`).then(response => {

          comments.value = comments.value.concat(response.data.data);

          currentPage.value = response.data.current_page;

          lastPage.value = response.data.last_page;

          commentsLoading.value = false;

        })
      }

      const createPostComment = () => {

        newCommentIsLoading.value = true;

        axios.post('http://aloware-api.test/api/threads', newComment.value).then(response => {

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
