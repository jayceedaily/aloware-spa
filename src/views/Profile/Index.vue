<template>
	<p>Hello {{user.name}}</p>
</template>

<script>
import { ref, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import axios from 'axios';
export default {
	name: "Profile",
	setup() {
		const route = useRoute();

		const user = ref({});

      	axios.defaults.headers.common['Authorization'] = 'Bearer 1|Rc1zv1csIksqQiDRWLnHE4q3oCZ0OVA0esT24u57';

		const routeUsernameWatcher = watch(()=> route.params.username, (username) => {
			
			axios.get(`http://aloware-api.test/api/user/${username}`).then(response => {

				console.log(response);

				user.value = response.data;

			});

		}, {immediate: true});

		return {
			user
		}
	}
}
</script>

<style>

</style>