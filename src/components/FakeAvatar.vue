<template>
	<img class="inline object-cover rounded-full" :src="`https://avatars.dicebear.com/api/avataaars/${value}.svg?background=%23e2e2e2`" alt="Profile image"/>  
</template>

<script>
export default {
	name: "FakeAvatar",

	props: {
		value: {
			required: false,
			default: "test"
		}
	}

}
</script>

<style>

</style>