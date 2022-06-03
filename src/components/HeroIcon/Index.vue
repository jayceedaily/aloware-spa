<template>
	<component :is="Icon"/>
</template>
<script>

import * as SolidIcon from '@heroicons/vue/solid';
import * as OutlineIcon from '@heroicons/vue/outline';
import { computed } from '@vue/runtime-core';

export default {
	name: "HeroIcon",
	props: {
		type: {
			type: String,
			default: 'outline'
		},
		icon: {
			type: String,
			required: true
		}
	},
	setup(props) {
		
		const Icon = computed(() => {

			if(props.type === 'solid') {
				return SolidIcon[props.icon];
			}

			return OutlineIcon[props.icon];
		});

		return {
			Icon
		}
	}
}
</script>

<style>

</style>