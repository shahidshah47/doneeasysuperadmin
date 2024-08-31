<template>
  <div :class="$style.weeklyPerformance">
    <div :class="$style.performanceIndicators">
      <div :class="$style.performancePeriods">
        <div :class="$style.weekly">Weekly</div>
      </div>
      <img
        :class="$style.vuesaxboldarrowDownIcon"
        alt=""
        src="/vuesaxboldarrowdown.svg"
      />
    </div>
    <img
      :class="$style.weeklyPerformanceChild"
      loading="lazy"
      alt=""
      :src="group48096132"
    />
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "WeeklyPerformance",
    props: {
      group48096132: { type: String },
    },
  });
</script>
<style module>
  .weekly {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 48px;
  }
  .performancePeriods {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-12xs) 0px 0px;
  }
  .vuesaxboldarrowDownIcon {
    height: 16px;
    width: 16px;
    position: relative;
    min-height: 16px;
  }
  .performanceIndicators {
    width: 88px;
    border-radius: var(--br-5xs);
    background-color: var(--bg);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    box-sizing: border-box;
    gap: var(--gap-5xs);
    z-index: 1;
  }
  .weeklyPerformanceChild {
    width: 118px;
    height: 118px;
    position: relative;
    z-index: 1;
  }
  .weeklyPerformance {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: var(--gap-75xl);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--neutrals-neutral-100);
    font-family: var(--heading-h3);
  }
</style>
