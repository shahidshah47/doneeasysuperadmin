<template>
  <div :class="$style.navigationSide">
    <div :class="$style.navBackground" />
    <div :class="$style.logoContainer">
      <img :class="$style.logoIcon" loading="lazy" alt="" src="/logo@2x.png" />
    </div>
    <NavigationIcons />
    <div :class="$style.component7Parent">
      <div :class="$style.component7">
        <div :class="$style.vuesaxboldelement2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxboldelement2.svg"
          />
        </div>
        <div :class="$style.dashboard">Dashboard</div>
      </div>
      <div :class="$style.component8">
        <div :class="$style.vuesaxlinearcalendar2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxlinearcalendar2.svg"
          />
        </div>
        <div :class="$style.dashboard1">Appointment</div>
      </div>
      <div :class="$style.component8">
        <div :class="$style.vuesaxlinearcalendar2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxlineardocumentcopy.svg"
          />
        </div>
        <div :class="$style.dashboard2">Offers</div>
      </div>
      <div :class="$style.component8">
        <div :class="$style.vuesaxlinearcalendar2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxlinearnotificationbing.svg"
          />
        </div>
        <div :class="$style.dashboard3">Alerts</div>
      </div>
      <div :class="$style.component8">
        <div :class="$style.vuesaxlinearcalendar2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxlinearnotificationstatus.svg"
          />
        </div>
        <div :class="$style.dashboard4">Orders</div>
      </div>
      <div :class="$style.component8">
        <div :class="$style.vuesaxlinearcalendar2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxlinearprofile2user.svg"
          />
        </div>
        <div :class="$style.dashboard5">Vendor</div>
      </div>
      <div :class="$style.component8">
        <div :class="$style.vuesaxlinearcalendar2Wrapper">
          <img
            :class="$style.vuesaxboldelement2Icon"
            alt=""
            src="/vuesaxlinearnote.svg"
          />
        </div>
        <div :class="$style.dashboard6">Verticals</div>
      </div>
      <Component1
        vuesaxlinearbuildings="/vuesaxlinearbuildings.svg"
        accounts="Accounts"
        management="Management"
      />
    </div>
    <GroupComponent />
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import NavigationIcons from "./NavigationIcons.vue";
  import Component1 from "./Component1.vue";
  import GroupComponent from "./GroupComponent.vue";

  export default defineComponent({
    name: "NavigationSide",
    components: { NavigationIcons, Component1, GroupComponent },
  });
</script>
<style module>
  .navBackground {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0 !important;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: var(--neutrals-neutral-0);
  }
  .logoIcon {
    height: 56px;
    width: 56px;
    position: relative;
    object-fit: cover;
    z-index: 1;
  }
  .logoContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-9xs);
  }
  .vuesaxboldelement2Icon {
    height: 24px;
    width: 24px;
    position: relative;
  }
  .vuesaxboldelement2Wrapper {
    height: 48px;
    width: 48px;
    border-radius: var(--br-181xl);
    background: linear-gradient(
      149.74deg,
      #38e0b2,
      #442ae8 50.94%,
      #9e21ee 96.07%,
      #9e21ee
    );
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-xs);
    box-sizing: border-box;
  }
  .dashboard {
    width: 84px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .component7 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-base);
    color: var(--primary-purple);
  }
  .vuesaxlinearcalendar2Wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-xs);
  }
  .dashboard1 {
    width: 100px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .component8 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-base);
  }
  .dashboard2 {
    width: 47px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard3 {
    width: 44px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard4 {
    width: 52px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard5 {
    width: 54px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard6 {
    width: 65px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .component7Parent {
    border-radius: var(--br-81xl);
    background-color: var(--bg);
    display: none;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    gap: var(--gap-13xl);
    z-index: 3;
  }
  .navigationSide {
    border-radius: 0px var(--br-5xl) var(--br-5xl) 0px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-21xl) var(--padding-5xl);
    position: relative;
    gap: var(--gap-13xl);
    text-align: left;
    font-size: var(--heading-h5-size);
    color: var(--neutrals-neutral-90);
    font-family: var(--heading-h3);
  }

  @media screen and (max-width: 1200px) {
    .navigationSide {
      padding-top: var(--padding-7xl);
      padding-bottom: var(--padding-7xl);
      box-sizing: border-box;
    }
  }
</style>
