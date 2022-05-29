<template>
	<div class="pt-3 pb-1 flex max-w-3xl border-b border-gray-300" > 
		<div class="flex  w-full">
			<FakeAvatar class="flex-shrink-0 w-10 h-10 mr-2" :value="comment.created_by.name"/>
			<div>
				<div class="flex justify-between">

					<a class="gap-1 inline-flex" :href="'/' + comment.created_by.username">

						<div class="hover:underline font-medium">{{comment.created_by.name}}</div>

						<div>@{{comment.created_by.username}}</div>

						<div class=" text-gray-500 font-normal"> - {{moment(comment.created_at).fromNow()}}</div>
					</a>
				</div>

				<router-link class=" text-gray-800 font-normal mb-2"  :to="'/thread/' + comment.id">{{comment.body}}</router-link>

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


						<div class="w-10 flex items-center hover:text-red-500">

							<button class="hover:bg-red-100 py-2 px-2 rounded-full flex gap-2 mr-2" @click="handleLikeClick">

								<HeartIconSolid v-if="comment.liked" class="text-red-500 h-5 w-5 "/>
								<HeartIcon v-else class=" h-5 w-5 "/>


							</button>
								<div v-if="comment.likes_count"> {{comment.likes_count}}</div>
						</div>
					
						<button class="hover:text-blue-500 hover:bg-blue-200 py-2 px-2 rounded-full">
							<UploadIcon class="h-5 w-5 "/>
						</button>
				</div>
			</div>
			<div>
				<button class="hover:bg-gray-200 py-2 px-2 rounded-full place-content-start text-gray-400" @click="showMenu =! showMenu">
					<DotsHorizontalIcon class="h-5 w-5"/>
				</button>

				<div class="relative inline-block text-left" v-if="showMenu">
  					<div class="fixed inset-0 bg-opacity-75 transition-opacity" @click="showMenu=false"></div>
					<div class=" origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
						<div class="py-1" role="none">
							<a href="#" class="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0"><BellIcon  class="text-gray-400 h-5 w-5 mr-2"/>Turn On Notification</a>
							<a href="#" class="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0"><UserRemoveIcon  class="text-gray-400 h-5 w-5 mr-2"/>Unfollow @{{comment.created_by.username}}</a>
							<a href="#" class="text-gray-700 flex px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1"><VolumeOffIcon  class="text-gray-400 h-5 w-5 mr-2"/>Mute  @{{comment.created_by.username}}</a>
							<a href="#" class="text-gray-700 flex px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-2"><CodeIcon  class="text-gray-400 h-5 w-5 mr-2"/>Ember Thread</a>
							<a href="#" class="text-gray-700 flex px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-2"><FlagIcon  class="text-gray-400 h-5 w-5 mr-2"/>Report Thread</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import moment from 'moment';
import { ref } from '@vue/reactivity';
import axios from 'axios';
import Comment from './Comment.vue';
import FakeAvatar from './FakeAvatar.vue';
import { ArrowRightIcon,
		RefreshIcon,
		AnnotationIcon,
		HeartIcon,
		UploadIcon,
		DotsHorizontalIcon,
		PlusSmIcon,
		UserRemoveIcon,
		VolumeOffIcon,
		FlagIcon,
		CodeIcon,
		BellIcon,
} from '@heroicons/vue/outline';

import {HeartIcon as HeartIconSolid} from '@heroicons/vue/solid';

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
		DotsHorizontalIcon,
		PlusSmIcon,
		UserRemoveIcon,
		VolumeOffIcon,
		FlagIcon,
		CodeIcon,
		BellIcon,
		HeartIconSolid
	},

	setup(props) {

		const showMenu = ref(false);

		const handleLikeClick = () => {


			if(props.comment.liked) {
				axios.delete(`http://aloware-api.test/api/thread/${props.comment.id}/unlike`);
				props.comment.likes_count--;
			} else {
				axios.post(`http://aloware-api.test/api/thread/${props.comment.id}/like`);
				props.comment.likes_count++;
			}

			props.comment.liked = !props.comment.liked
		}

		return {
        	moment,
			showMenu,

			handleLikeClick
		}
	}
}
</script>

<style>



</style>