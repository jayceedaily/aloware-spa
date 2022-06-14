<template>
	<div>
		<div class="flex justify-center" v-if="!loading">
			<Comment :comment="comment"/>
		</div>
		<div class="flex justify-center">
			<div class="">Replies</div>
		</div>

		<div v-for="comment in comments" :key="comment.id" class="flex justify-center">
			<Comment :comment="comment"/>
		</div>
	</div>
</template>

<script>
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import axios from 'axios'
import { ref } from '@vue/reactivity';
import Comment from '../../components/Comment.vue'
import { onBeforeMount, onBeforeUnmount, watch } from '@vue/runtime-core';

export default {
	name: "Show",
	components: {
		Comment
	},
	setup() {
    	const route = useRoute();
		const comment = ref({});
		const comments = ref([]);
		const loading = ref(true);
		const repliesLoading = ref(true);
      	const currentPage = ref(1);
      	const lastPage = ref(1);

      	axios.defaults.headers.common['Authorization'] = 'Bearer 1|Rc1zv1csIksqQiDRWLnHE4q3oCZ0OVA0esT24u57';

		const loadReplies = (threadId, page = 1) => {

			repliesLoading.value = true;
			
			axios.get(`http://aloware-api.test/api/thread/${threadId}/replies?page=${page}`).then(response => {
				
				comments.value = comments.value.concat(response.data.data)

				currentPage.value = response.data.current_page;

				lastPage.value = response.data.last_page;

				repliesLoading.value = false;
			})
		};


		onBeforeRouteUpdate(async (to, from) => {

			if(to.params.id !== from.params.id) {

				loadThread(to.params.id);
			}
		});	

		const loadThread = (threadId) => {

			comments.value = [];

			axios.get(`http://aloware-api.test/api/thread/${threadId}`).then(response => {

				comment.value = response.data
				loading.value = false;

			}).then(() => {

				loadReplies(threadId);

			});
		}

		loadThread(route.params.id);
	
		return {
			comment,
			comments,
			loading,
			loadReplies
		}
	}
}
</script>

<style>

</style>