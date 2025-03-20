<template>
  <div class="card border-0 rounded-3 flex-grow">
    <div class="card-body">
      <p class="!text-vivid-purple text-base font-normal font-theme mb-1">
        {{ title }}
      </p>
      <p class="mb-0">
        {{ content }}
        <a
          :href="link"
          class="!text-vivid-purple font-semibold text-sm font-theme appearance-none !no-underline hover:underline"
          >{{ linkText }}</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
}
</style>
