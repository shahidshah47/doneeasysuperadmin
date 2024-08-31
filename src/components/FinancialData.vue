<template>
  <div :class="$style.financialData">
    <div :class="$style.financialDataChild" />
    <div :class="$style.financialItems">
      <div :class="$style.financialItem">
        <img
          :class="$style.vuesaxlinearemptyWalletIcon"
          loading="lazy"
          alt=""
          :src="vuesaxlinearemptyWallet"
        />
        <div :class="$style.paidInvoices" :style="paidInvoicesStyle">
          {{paidInvoices}}
        </div>
      </div>
      <div :class="$style.weeklyChange">
        <div :class="$style.weeklyPeriods">
          <div :class="$style.weekly">Weekly</div>
        </div>
        <img
          :class="$style.vuesaxboldarrowDownIcon"
          alt=""
          src="/vuesaxboldarrowdown.svg"
        />
      </div>
    </div>
    <div :class="$style.aed32029323">
      <span :class="$style.aed">AED</span>
      <b :class="$style.b">{{prop}}</b>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "FinancialData",
    props: {
      vuesaxlinearemptyWallet: { type: String },
      paidInvoices: { type: String },
      prop: { type: String },
      propMinWidth: { type: [Object, Array, String, Number, Boolean] },
    },
    computed: {
      paidInvoicesStyle() {
        return {
          minWidth: this.propMinWidth,
        };
      },
    },
  });
</script>
<style module>
  .financialDataChild {
    width: 296px;
    height: 167px;
    position: relative;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: none;
  }
  .vuesaxlinearemptyWalletIcon {
    width: 24px;
    height: 24px;
    position: relative;
    z-index: 1;
  }
  .paidInvoices {
    position: relative;
    line-height: 20px;
    display: inline-block;
    mix-blend-mode: normal;
    min-width: 85px;
    z-index: 1;
  }
  .financialItem {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-5xl);
  }
  .weekly {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: inline-block;
    min-width: 48px;
  }
  .weeklyPeriods {
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
  .weeklyChange {
    width: 88px;
    border-radius: var(--br-5xs);
    background-color: var(--bg);
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    box-sizing: border-box;
    gap: var(--gap-5xs);
    z-index: 1;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--neutrals-neutral-100);
  }
  .financialItems {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--gap-xl);
  }
  .aed {
    font-weight: 600;
  }
  .b {
    font-size: var(--font-size-17xl);
  }
  .aed32029323 {
    align-self: stretch;
    position: relative;
    line-height: 120%;
    color: var(--neutrals-neutral-100);
    mix-blend-mode: normal;
    white-space: nowrap;
    z-index: 1;
    font-size: var(--heading-h3-size);
  }
  .financialData {
    align-self: stretch;
    border-radius: var(--br-xs);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xl);
    gap: var(--gap-5xs);
    text-align: left;
    font-size: var(--body-2-14px-semibold-size);
    color: var(--primary-purple);
    font-family: var(--heading-h3);
  }
</style>
