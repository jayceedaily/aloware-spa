<template>
	<div>
		<div class="font-medium">
			{{comment.name}} <span class="ml-1 text-gray-500 font-normal text-sm ">{{moment(comment.created_at).fromNow()}}</span>
		</div>
		<div>
			{{comment.body}}
		</div>
		<div class="text-xs font-medium pb-2">
			<button v-if="maxDepth != level" class="mr-3" @click="showReplyForm = !showReplyForm">Reply</button>
		</div>
		<div class=" font-medium">
			<span v-if=" !showReplies &&  comment.replies_count > 0" class="mr-3"> <button href="#" @click="handleShowReplies(1)">{{comment.replies_count}} Replies </button></span>
		</div>
		<form action="" @submit.prevent="createCommentReply" v-if="showReplyForm" class="mb-3">
			<input type="text" name="" id="" class="w-full border mb-3 rounded-sm" v-model="newComment.name">
			<textarea name="" id="" cols="30" rows="5" class="mb-3 w-full border rounded-sm" v-model="newComment.body"></textarea>
			<div class="w-full">

				<button :disabled="newCommentIsLoading" class="mr-3  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						:class="[newCommentIsLoading && 'bg-gray-300 cursor-not-allowed', !newCommentIsLoading && 'bg-blue-500 hover:bg-blue-700']"
						type="submit">
					Post Comment
				</button>
				<button @click="showReplyForm = !showReplyForm" class="bg-gray-300  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
					Close
				</button>
			</div>
		</form>

		<div v-if="showReplies">

			<div class="pl-5 border-l pb-3" v-for="comment in comments" :key="comment.id">
				<Comment :comment="comment" :level="level+1" :maxDepth="maxDepth"/>
			</div>

			<button v-if="currentPage < lastPage" @click="handleShowReplies(currentPage+1)">Load More</button>
			
		</div>
	</div>

</template>

<script>

import moment from 'moment';
import { ref } from '@vue/reactivity';
import axios from 'axios';
import Comment from './Comment.vue';

export default {
	name: "Comment",
	props: {
		comment: {
			type: Object,
			required: false
		},
		level: {
			type: Number,
			default: 1
		},
		maxDepth: {
			type: Number,
			required: true
		}
	},

	components:{
		Comment
	},

	setup(props) {

		const comments = ref([]);

		const showReplies = ref(false);

		const showReplyForm = ref(false);

		const currentPage = ref(1);
    	
		const lastPage = ref(1);

		const newComment = ref({
			name: null,
			body: null
		});

		const newCommentIsLoading = ref(false);

		const handleShowReplies = (page = 1) => {
			
			axios.get(`https://aloware-api.test/api/comments/${props.comment.id}/replies?page=${page}`).then(response => {
				
				comments.value = comments.value.concat(response.data.data)

				showReplies.value = true;

				currentPage.value = response.data.current_page;

				lastPage.value = response.data.last_page;
			})
		};

		const createCommentReply = () => {

			showReplies.value = true;

			newCommentIsLoading.value = true;

			axios.post(`https://aloware-api.test/api/comments/${props.comment.id}/replies`, newComment.value).then(response => {

				comments.value.unshift(response.data)

				newComment.value = {
					name: null,
					body: null
				}

				newCommentIsLoading.value = false;
			})

		};

		return {
        	moment,
			comments,
			showReplies,
			newComment,
			newCommentIsLoading,
			showReplyForm,
			currentPage,
			lastPage,
			
			handleShowReplies,
			createCommentReply,
		}
	}
}
</script>

<style>



</style>