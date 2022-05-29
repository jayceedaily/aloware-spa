<template>
	<router-link class="pt-3 pb-1 flex max-w-3xl border-b border-gray-300" :to="'/thread/' + comment.id"> 
		<div class="flex w-full">
			<FakeAvatar class="flex-shrink-0 w-10 h-10 mr-2" :value="comment.created_by.name"/>
			<div>
				<div class="flex justify-between">

					<a class="gap-1 inline-flex" :href="'/' + comment.created_by.username">

						<div class="hover:underline font-medium">{{comment.created_by.name}}</div>

						<div>@{{comment.created_by.username}}</div>

						<div class=" text-gray-500 font-normal"> - {{moment(comment.created_at).fromNow()}}</div>
					</a>
				</div>

				<div class=" text-gray-800 font-normal mb-2">{{comment.body}}</div>

				<div class="w-full flex  gap-10 text-sm justify-between max-w-xl text-gray-400">

						<div class="w-10 flex items-center hover:text-blue-500">
							<button class="hover:bg-blue-100  py-2 px-2 rounded-full  flex gap-2 mr-2">
								<AnnotationIcon class="h-5 w-5"/>
							</button>
							<div v-if="comment.replies_count"> {{comment.replies_count}}</div>
						</div>

						<button class="hover:bg-green-100 hover:text-green-500 py-2 px-2 rounded-full">
							<RefreshIcon class="h-5 w-5 "/>
						</button>
					
						<button class="hover:bg-red-100 hover:text-red-500 py-2 px-2 rounded-full">
							<HeartIcon class="h-5 w-5 "/>
						</button>
					
						<button class="hover:text-blue-500 hover:bg-blue-200 py-2 px-2 rounded-full">
							<UploadIcon class="h-5 w-5 "/>
						</button>
				</div>
			</div>
			<div>
				<button class="hover:bg-gray-200 py-2 px-2 rounded-full place-content-start text-gray-400">
					<DotsHorizontalIcon class="h-5 w-5"/>
				</button>
			</div>
		</div>
	</router-link>
</template>

<script>

import moment from 'moment';
import { ref } from '@vue/reactivity';
import axios from 'axios';
import Comment from './Comment.vue';
import FakeAvatar from './FakeAvatar.vue';
import { ArrowRightIcon, RefreshIcon, AnnotationIcon, HeartIcon, UploadIcon, DotsHorizontalIcon } from '@heroicons/vue/outline';

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
		Comment,
		FakeAvatar,
		ArrowRightIcon,
		RefreshIcon,
		AnnotationIcon,
		HeartIcon,
		UploadIcon,
		DotsHorizontalIcon
	},

	setup(props) {

		const comments = ref([]);

		const showReplies = ref(false);

		const repliesLoading = ref(false);

		const showReplyForm = ref(false);

		const currentPage = ref(1);
    	
		const lastPage = ref(1);

		const newComment = ref({
			name: null,
			body: null
		});

		const newCommentIsLoading = ref(false);

		return {
        	moment,
			comments,
			showReplies,
			newComment,
			newCommentIsLoading,
			showReplyForm,
			currentPage,
			lastPage,
			repliesLoading,
		}
	}
}
</script>

<style>



</style>