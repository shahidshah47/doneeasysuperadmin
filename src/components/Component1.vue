<template>
  <div :class="$style.component14" @click="onComponent18ContainerClick">
    <div :class="$style.vuesaxlinearbuildingsWrapper">
      <img
        :class="$style.vuesaxlinearbuildingsIcon"
        alt=""
        :src="vuesaxlinearbuildings"
      />
    </div>
    <div :class="$style.dashboard" :style="dashboardStyle">
      <p :class="$style.accounts">{{accounts}}</p>
      <p :class="$style.accounts">{{management}}</p>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Component1",
    props: {
      vuesaxlinearbuildings: { type: String },
      accounts: { type: String },
      management: { type: String },
      propColor: { type: String },
      onComponent18ContainerClick: { type: Function },
    },
    computed: {
      dashboardStyle() {
        return {
          color: this.propColor,
        };
      },
    },
  });
</script>
<style module>
  .vuesaxlinearbuildingsIcon {
    height: 24px;
    width: 24px;
    position: relative;
  }
  .vuesaxlinearbuildingsWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-xs);
  }
  .accounts {
    margin: 0;
  }
  .dashboard {
    width: 101px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: none;
  }
  .component14 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-base);
    text-align: left;
    font-size: var(--heading-h5-size);
    color: var(--neutrals-neutral-90);
    font-family: var(--heading-h3);
  }
</style>
