<template>
  <div>
    <img
      class="inline object-cover rounded-full"
      :src="`https://avatars.dicebear.com/api/avataaars/${value}.svg?background=%23e2e2e2`"
      alt="Profile image"
    />

    <div v-if="linked" class="w-1/2 border-r-2 border-gray-600  h-full"></div>
  </div>
</template>

<script>
export default {
  name: "FakeAvatar",

  props: {
    value: {
      required: false,
      default: "test",
    },
    linked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
