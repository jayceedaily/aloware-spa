<template>
	<a
		href="#"
		class="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-100"
		role="menuitem"
		tabindex="-1"
		@click="handleClick">
			<HeroIcon
			  :icon="item.icon.name"
			  :type="item.icon.type"
			  class="text-gray-400 h-5 w-5 mr-2"/>
	  			{{item.label}}
	</a>
	
</template>

<script>

import { computed } from 'vue';
import HeroIcon from '../HeroIcon/Index.vue';


export default {
	name: "OptionItem",
	components: {
		HeroIcon
	},
	emits: ['selected'],
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	setup(props, {emit}) {
		const handleClick = () => {
			emit('selected', props.item);
		};

		return {
			handleClick
		}
	}
}
</script>

<style>

</style>