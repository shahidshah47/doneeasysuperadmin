<template>
  <div
    :class="$style.button"
    @click="onComponent12ContainerClick"
    :style="buttonStyle"
  >
    <SizeSmallTypeTertiarySta :text="text" />
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import SizeSmallTypeTertiarySta from "./SizeSmallTypeTertiarySta.vue";

  export default defineComponent({
    name: "Button",
    components: { SizeSmallTypeTertiarySta },
    props: {
      text: { type: String },
      propFlex: { type: String },
      onComponent12ContainerClick: { type: Function },
    },
    methods: {
      onButtonContainerClick() {
        this.$router.push("/");
      },
    },
    computed: {
      buttonStyle() {
        return {
          flex: this.propFlex,
        };
      },
    },
  });
</script>
<style module>
  .button {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
    z-index: 3;
    text-align: center;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
    font-family: var(--heading-h3);
  }
</style>
