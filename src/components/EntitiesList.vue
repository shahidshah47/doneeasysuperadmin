<template>
  <div :class="$style.entitiesList">
    <div :class="$style.organizationList">
      <div :class="$style.organization">
        <div :class="$style.organizationData">
          <div :class="$style.organizationCode" :style="organizationCodeStyle">
            <div :class="$style.separator">{{separator}}</div>
            <div :class="$style.or">{{oR}}</div>
          </div>
          <div
            :class="$style.organizationNames"
            :style="organizationNamesStyle"
          >
            <div :class="$style.name">Tenneese Office</div>
            <div :class="$style.name1">CEO: Sham Idress</div>
          </div>
          <b :class="$style.separator1">3000</b>
        </div>
        <div :class="$style.organizationData">
          <div
            :class="$style.organizationCode1"
            :style="organizationCode1Style"
          >
            <div :class="$style.separator2">{{separator1}}</div>
            <div :class="$style.or">{{oR1}}</div>
          </div>
          <div :class="$style.organizationNames1">
            <div :class="$style.name2">SA Transports</div>
            <div :class="$style.name3">Manager : Alex Smith</div>
          </div>
          <b :class="$style.separator1">3000</b>
        </div>
        <div :class="$style.organizationData">
          <div
            :class="$style.organizationCode2"
            :style="organizationCode2Style"
          >
            <div :class="$style.separator4">{{separator2}}</div>
            <div :class="$style.or">{{oR2}}</div>
          </div>
          <div :class="$style.organizationNames1">
            <div :class="$style.name2">Jack & Brother ltd.</div>
            <div :class="$style.name3">Manager : Alex Smith</div>
          </div>
          <b :class="$style.separator1">3000</b>
        </div>
        <div :class="$style.organizationData">
          <div
            :class="$style.organizationCode2"
            :style="organizationCode3Style"
          >
            <div :class="$style.separator4">{{separator3}}</div>
            <div :class="$style.or">{{oR3}}</div>
          </div>
          <div :class="$style.organizationNames1">
            <div :class="$style.name2">Shine Private Logitech</div>
            <div :class="$style.name3">Role: Manager</div>
          </div>
          <b :class="$style.separator1">3000</b>
        </div>
        <div :class="$style.organizationData4">
          <div :class="$style.organizationCode4">
            <div :class="$style.organizationCode5">
              <div :class="$style.separator8">4211</div>
              <div :class="$style.ofc">OFC</div>
            </div>
            <div :class="$style.organizationNames4">
              <div :class="$style.name8">Jack & Brother ltd.</div>
              <div :class="$style.name9">Role: Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.viewMore">
      <img :class="$style.viewMoreChild" alt="" :src="rectangle2332" /><button
        :propFlex="propFlex"
        text="view all"
      />
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import Button from "./Button.vue";

  export default defineComponent({
    name: "EntitiesList",
    components: { Button },
    props: {
      separator: { type: String },
      oR: { type: String },
      separator1: { type: String },
      oR1: { type: String },
      separator2: { type: String },
      oR2: { type: String },
      separator3: { type: String },
      oR3: { type: String },
      rectangle2332: { type: String },
      propFlex: { type: String },
      propBackgroundColor: { type: String },
      propPadding: { type: [Object, Array, String, Number, Boolean] },
      propBackgroundColor1: { type: String },
      propWidth: { type: [Object, Array, String, Number, Boolean] },
      propBackgroundColor2: { type: String },
      propBackgroundColor3: { type: String },
    },
    computed: {
      organizationCodeStyle() {
        return {
          backgroundColor: this.propBackgroundColor,
        };
      },
      organizationNamesStyle() {
        return {
          padding: this.propPadding,
        };
      },
      organizationCode1Style() {
        return {
          backgroundColor: this.propBackgroundColor1,
          width: this.propWidth,
        };
      },
      organizationCode2Style() {
        return {
          backgroundColor: this.propBackgroundColor2,
        };
      },
      organizationCode3Style() {
        return {
          backgroundColor: this.propBackgroundColor3,
        };
      },
    },
  });
</script>
<style module>
  .separator {
    position: relative;
    line-height: 100%;
    font-weight: 600;
    display: inline-block;
    min-width: 19px;
  }
  .or {
    position: relative;
    font-size: var(--button-very-small-size);
    line-height: 100%;
    font-weight: 600;
    color: var(--primary-90);
    display: inline-block;
    min-width: 15px;
  }
  .organizationCode {
    width: 38px;
    border-radius: var(--br-9xs);
    background-color: var(--alert-green-10);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--padding-5xs) var(--padding-4xs);
    box-sizing: border-box;
  }
  .name {
    align-self: stretch;
    position: relative;
    line-height: 17px;
    font-weight: 600;
  }
  .name1 {
    align-self: stretch;
    position: relative;
    font-size: var(--caption-1-12px-regular-size);
    line-height: 120%;
    color: var(--neutrals-neutral-50);
  }
  .organizationNames {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0px var(--padding-3xs) 0px 0px;
    gap: var(--gap-9xs);
    font-size: var(--body-2-14px-semibold-size);
  }
  .separator1 {
    width: 44px;
    position: relative;
    font-size: var(--font-size-lg);
    line-height: 22px;
    display: inline-block;
    color: var(--primary-purple);
  }
  .organizationData {
    align-self: stretch;
    border-bottom: 1px solid var(--neutral-20);
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-5xs) 0px var(--padding-7xs);
    gap: var(--gap-base);
  }
  .separator2 {
    position: relative;
    line-height: 100%;
    font-weight: 600;
    display: inline-block;
    min-width: 18px;
  }
  .organizationCode1 {
    border-radius: var(--br-9xs);
    background-color: var(--alert-green-10);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--padding-5xs) var(--padding-3xs);
  }
  .name2 {
    width: 207px;
    position: relative;
    line-height: 17px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .name3 {
    width: 207px;
    position: relative;
    font-size: var(--caption-1-12px-regular-size);
    line-height: 120%;
    color: var(--neutrals-neutral-50);
    display: inline-block;
  }
  .organizationNames1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 0px 0px 0px;
    gap: var(--gap-9xs);
    font-size: var(--body-2-14px-semibold-size);
  }
  .separator4 {
    position: relative;
    line-height: 100%;
    font-weight: 600;
    display: inline-block;
    min-width: 21px;
  }
  .organizationCode2 {
    width: 38px;
    border-radius: var(--br-9xs);
    background-color: var(--alert-green-10);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--padding-5xs);
    box-sizing: border-box;
  }
  .separator8 {
    position: relative;
    line-height: 100%;
    font-weight: 600;
    display: inline-block;
    min-width: 24px;
  }
  .ofc {
    position: relative;
    font-size: var(--button-very-small-size);
    line-height: 100%;
    font-weight: 600;
    color: var(--primary-90);
    display: inline-block;
    min-width: 22px;
  }
  .organizationCode5 {
    width: 39px;
    border-radius: var(--br-9xs);
    background-color: var(--alert-blue-10);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--padding-5xs) var(--padding-6xs);
    box-sizing: border-box;
  }
  .name8 {
    width: 207px;
    position: relative;
    line-height: 100%;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .name9 {
    width: 207px;
    position: relative;
    font-size: var(--caption-1-12px-regular-size);
    line-height: 100%;
    color: var(--neutral-70);
    display: inline-block;
  }
  .organizationNames4 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 0px 0px 0px;
    gap: var(--gap-5xs);
    font-size: var(--body-2-14px-semibold-size);
    color: var(--primary-90);
    font-family: var(--caption-1-12px-regular);
  }
  .organizationCode4 {
    align-self: stretch;
    border-bottom: 1px solid var(--neutral-20);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-5xs) 0px var(--padding-7xs);
    gap: var(--gap-base);
  }
  .organizationData4 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .organization {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
    z-index: 1;
  }
  .organizationList {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-5xl);
  }
  .viewMoreChild {
    height: 99px;
    width: 296px;
    position: relative;
    display: none;
  }
  .viewMore {
    align-self: stretch;
    background: linear-gradient(0deg, #fff 21.99%, rgba(255, 255, 255, 0));
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: var(--padding-16xl) var(--padding-xl) var(--padding-5xl);
    z-index: 2;
    margin-top: -84px;
  }
  .entitiesList {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--neutrals-neutral-100);
    font-family: var(--heading-h3);
  }
</style>
