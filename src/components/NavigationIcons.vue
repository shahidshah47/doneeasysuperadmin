<template>
  <div :class="$style.navigationIcons">
    <div :class="$style.component7">
      <div :class="$style.vuesaxboldelement2Wrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxboldelement2.svg"
        />
      </div>
      <div :class="$style.dashboard">Dashboard</div>
    </div>
    <div :class="$style.component12" @click="onComponent12ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearprofile2user.svg"
        />
      </div>
      <div :class="$style.dashboard1">Vendor</div>
    </div>
    <div :class="$style.component12" @click="onComponent19ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearbuilding.svg"
        />
      </div>
      <div :class="$style.dashboard2">Organisations</div>
    </div>
    <div :class="$style.component12" @click="onComponent13ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearnote.svg"
        />
      </div>
      <div :class="$style.dashboard3">Verticals</div>
    </div>
    <div :class="$style.component12" @click="onComponent11ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearnotificationstatus.svg"
        />
      </div>
      <div :class="$style.dashboard4">Orders</div>
    </div>
    <div :class="$style.component12" @click="onComponent8ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearcalendar2.svg"
        />
      </div>
      <div :class="$style.dashboard5">Appointment</div>
    </div>
    <div :class="$style.component12" @click="onComponent9ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlineardocumentcopy.svg"
        />
      </div>
      <div :class="$style.dashboard6">Offers</div>
    </div>
    <Component1
      :onComponent18ContainerClick="onComponent18ContainerClick"
      vuesaxlinearbuildings="/vuesaxlinearbriefcase.svg"
      propColor="#0e0d35"
      accounts="Business"
      management="Development"
    />
    <div :class="$style.component15" @click="onComponent15ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlinearbook.svg"
        />
      </div>
      <div :class="$style.dashboard7">Learning</div>
    </div>
    <div :class="$style.component15" @click="onComponent17ContainerClick">
      <div :class="$style.vuesaxlinearprofile2userWrapper">
        <img
          :class="$style.vuesaxboldelement2Icon"
          loading="lazy"
          alt=""
          src="/vuesaxlineardollarcircle.svg"
        />
      </div>
      <div :class="$style.dashboard8">Finance</div>
    </div>
    <Component1
      :onComponent18ContainerClick="onComponent14ContainerClick"
      vuesaxlinearbuildings="/vuesaxlinearlock.svg"
      propColor="#0e0d35"
      accounts="Accounts"
      management="Management"
    /><Component1
      :onComponent18ContainerClick="onComponent20ContainerClick"
      vuesaxlinearbuildings="/vuesaxlinearstatusup.svg"
      propColor="#0e0d35"
      accounts="Accounts"
      management="Management"
    />
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import Component1 from "./Component1.vue";

  export default defineComponent({
    name: "NavigationIcons",
    components: { Component1 },
    methods: {
      onComponent18ContainerClick() {
        // Please sync "Business development dashboard" to the project
      },
      onComponent14ContainerClick() {
        // Please sync "Role" to the project
      },
      onComponent20ContainerClick() {
        // Please sync "Report-Order Summary" to the project
      },
      onComponent12ContainerClick() {
        this.$router.push("/");
      },
      onComponent19ContainerClick() {
        // Please sync "Oranization" to the project
      },
      onComponent13ContainerClick() {
        // Please sync "Vertical" to the project
      },
      onComponent11ContainerClick() {
        // Please sync "Order" to the project
      },
      onComponent8ContainerClick() {
        // Please sync "Appointment" to the project
      },
      onComponent9ContainerClick() {
        // Please sync "offers" to the project
      },
      onComponent15ContainerClick() {
        // Please sync "Learning & Development" to the project
      },
      onComponent17ContainerClick() {
        // Please sync "Finance-Copy" to the project
      },
    },
  });
</script>
<style module>
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
  .vuesaxlinearprofile2userWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: var(--padding-xs);
  }
  .dashboard1 {
    width: 54px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .component12 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-base);
    cursor: pointer;
  }
  .dashboard2 {
    width: 106px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard3 {
    width: 65px;
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
    width: 100px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard6 {
    width: 47px;
    position: relative;
    line-height: 150%;
    font-weight: 600;
    display: none;
  }
  .dashboard7 {
    width: 67px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: none;
  }
  .component15 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-base);
    cursor: pointer;
    color: var(--neutrals-neutral-100);
  }
  .dashboard8 {
    width: 60px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: none;
  }
  .navigationIcons {
    border-radius: var(--br-24xl);
    background-color: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs);
    gap: var(--gap-base);
    z-index: 1;
    text-align: left;
    font-size: var(--heading-h5-size);
    color: var(--neutrals-neutral-90);
    font-family: var(--heading-h3);
  }
</style>
