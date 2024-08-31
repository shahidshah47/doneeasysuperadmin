<template>
  <div :class="$style.orderCardRow" :style="orderCardRowStyle">
    <div :class="$style.orderCardRowChild" :style="rectangleDivStyle" />
    <div :class="$style.orderCardValues">
      <div :class="$style.orderCardLabels">
        <div :class="$style.offers" :style="offersStyle">{{offers}}</div>
        <div :class="$style.thisWeek">This week</div>
      </div>
      <div :class="$style.orderCardTotalRow">
        <b :class="$style.orderCardTotal">{{orderCardTotalLabel}}</b>
        <div :class="$style.orderCardTotalValueContain">
          <div :class="$style.total">Total</div>
        </div>
      </div>
    </div>
    <div :class="$style.orderCardActiveRow">
      <b :class="$style.orderCardTotal">{{orderCardActiveLabel}}</b>
      <div :class="$style.orderCardActiveValueContai">
        <div :class="$style.active">Active</div>
      </div>
    </div>
    <div :class="$style.orderCardWeeklyRow">
      <div :class="$style.orderCardWeeklyDropdownCon">
        <div :class="$style.orderCardWeeklyDropdownRow">
          <div :class="$style.orderCardWeeklyDropdownLab">
            <div :class="$style.weekly">Weekly</div>
          </div>
          <img
            :class="$style.vuesaxboldarrowDownIcon"
            alt=""
            src="/vuesaxboldarrowdown.svg"
          />
        </div>
      </div>
      <div :class="$style.orderCardPendingRow">
        <b :class="$style.orderCardTotal">{{orderCardPendingLabel}}</b>
        <div :class="$style.orderCardPendingValueConta">
          <div :class="$style.pending">Pending</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "OrderCardRow",
    props: {
      offers: { type: String },
      orderCardTotalLabel: { type: String },
      orderCardActiveLabel: { type: String },
      orderCardPendingLabel: { type: String },
      propBorderRadius: { type: String },
      propMinWidth: { type: [Object, Array, String, Number, Boolean] },
      propBorderRadius1: { type: String },
      propMinWidth1: { type: [Object, Array, String, Number, Boolean] },
    },
    computed: {
      orderCardRowStyle() {
        return {
          borderRadius: this.propBorderRadius,
          minWidth: this.propMinWidth,
        };
      },
      rectangleDivStyle() {
        return {
          borderRadius: this.propBorderRadius1,
        };
      },
      offersStyle() {
        return {
          minWidth: this.propMinWidth1,
        };
      },
    },
  });
</script>
<style module>
  .orderCardRowChild {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-xs);
    background-color: var(--white);
    width: 100%;
    height: 100%;
    display: none;
  }
  .offers {
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 47px;
    z-index: 1;
  }
  .thisWeek {
    position: relative;
    font-size: var(--caption-1-12px-regular-size);
    line-height: 120%;
    font-weight: 600;
    color: var(--neutrals-neutral-60);
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 55px;
    z-index: 1;
  }
  .orderCardLabels {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-6xl) 0px 0px;
    gap: var(--gap-9xs);
  }
  .orderCardTotal {
    align-self: stretch;
    position: relative;
    line-height: 29px;
    mix-blend-mode: normal;
    z-index: 1;
  }
  .total {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 28px;
    z-index: 1;
  }
  .orderCardTotalValueContain {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-7xl);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
  }
  .orderCardTotalRow {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
    text-align: center;
    font-size: var(--heading-h1-size);
  }
  .orderCardValues {
    position: absolute;
    top: 24px;
    left: 16px;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-3xs);
  }
  .active {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 34px;
    z-index: 1;
  }
  .orderCardActiveValueContai {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-4xl);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
  }
  .orderCardActiveRow {
    position: absolute;
    top: 71px;
    left: 108px;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
    text-align: center;
    font-size: var(--heading-h1-size);
  }
  .weekly {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 48px;
  }
  .orderCardWeeklyDropdownLab {
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
  .orderCardWeeklyDropdownRow {
    flex: 1;
    border-radius: var(--br-5xs);
    background-color: var(--bg);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    gap: var(--gap-5xs);
    z-index: 1;
  }
  .orderCardWeeklyDropdownCon {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0px var(--padding-5xs) 0px 0px;
  }
  .pending {
    position: relative;
    line-height: 120%;
    display: inline-block;
    min-width: 46px;
    z-index: 1;
  }
  .orderCardPendingValueConta {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-mid);
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--primary-purple);
  }
  .orderCardPendingRow {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px 0px 0px var(--padding-base);
    gap: var(--gap-9xs);
    text-align: center;
    font-size: var(--heading-h1-size);
  }
  .orderCardWeeklyRow {
    position: absolute;
    top: 20px;
    left: 184px;
    width: 96px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: var(--gap-lgi);
    font-size: var(--caption-1-12px-regular-size);
  }
  .orderCardRow {
    height: 134px;
    flex: 1;
    position: relative;
    border-radius: var(--br-xs);
    background-color: var(--white);
    min-width: 222px;
    text-align: left;
    font-size: var(--heading-h5-size);
    color: var(--neutrals-neutral-100);
    font-family: var(--heading-h3);
  }
</style>
