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
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios'
import { ref } from '@vue/reactivity';
import Comment from '../../components/Comment.vue'
import { watch } from '@vue/runtime-core';

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

		  
		const loadReplies = (page = 1) => {

			repliesLoading.value = true;
			
			axios.get(`http://aloware-api.test/api/thread/${route.params.id}/replies?page=${page}`).then(response => {
				
				comments.value = comments.value.concat(response.data.data)

				currentPage.value = response.data.current_page;

				lastPage.value = response.data.last_page;

				repliesLoading.value = false;
			})
		};


		watch(() => route.params.id, (value) => {

			console.log('here', value);

			comments.value = [];

			axios.get(`http://aloware-api.test/api/thread/${route.params.id}`).then(response => {

				comment.value = response.data
				loading.value = false;
			});

			loadReplies();

		}, {immediate: true})



		// loadReplies();
	
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