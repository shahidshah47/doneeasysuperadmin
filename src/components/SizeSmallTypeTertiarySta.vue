<template>
  <div :class="$style.sizesmallTypetertiarySta">
    <b :class="$style.text">{{text}}</b>
    <img
      :class="$style.vuesaxbulkarrowLeftIcon"
      alt=""
      src="/vuesaxbulkarrowleft@2x.png"
    />
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "SizeSmallTypeTertiarySta",
    props: {
      text: { type: String },
    },
  });
</script>
<style module>
  .text {
    position: relative;
    letter-spacing: 0.01em;
    line-height: 300%;
    text-transform: uppercase;
    display: inline-block;
    min-width: 62px;
  }
  .vuesaxbulkarrowLeftIcon {
    height: 24px;
    width: 24px;
    position: relative;
    object-fit: contain;
    display: none;
  }
  .sizesmallTypetertiarySta {
    border-radius: var(--br-5xs);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs) var(--padding-2xl);
    gap: var(--gap-9xs);
    text-align: center;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
    font-family: var(--heading-h3);
  }
</style>
