<template>

  <Default :comment="comment.parent" :linked="true"/>

  <Default :comment="comment"/>
</template>

<script>
import Default from './Default.vue'
export default {
components: {
	Default
},
props: {
	comment: {
		type: Object,
		required: true
	}
}
}
</script>

<style>

</style>