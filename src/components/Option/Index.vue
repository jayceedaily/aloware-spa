<template>
  <div class="relative inline-block text-left">
	  <Overlay @click="$emit('close')"/>
		<div class=" origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
			<div class="py-1" role="none">
				<OptionItem
					v-for="(item, index) in options"
					:key="index"
					:item="item"
					@selected="(e) => $emit('selected', e)"
					/>
			</div>
		</div>
	</div>
</template>

<script>
import OptionItem from 'OptionItem.vue';
import Overlay from 'Overlay.vue';
export default {
	name: "Option",

	components: {
		OptionItem,
		Overlay
	},
	emits: ['close', 'selected'],
	props: {
		options: {
			type: Array,
			required: true
		}
	}
}
</script>

<style>

</style>