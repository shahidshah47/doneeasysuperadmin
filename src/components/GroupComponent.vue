<template>
  <div :class="$style.profileBackgroundParent">
    <div :class="$style.profileBackground" />
    <div :class="$style.avatarContainer">
      <img
        :class="$style.avatarIcon"
        loading="lazy"
        alt=""
        src="/avatar@2x.png"
      />
      <div :class="$style.shamIdress">Sham Idress</div>
    </div>
    <div :class="$style.logoutButtonContainer">
      <div :class="$style.vuesaxoutlinelogoutParent">
        <img
          :class="$style.vuesaxoutlinelogoutIcon"
          loading="lazy"
          alt=""
          src="/vuesaxoutlinelogout.svg"
        />
        <div :class="$style.logout">Logout</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "GroupComponent",
  });
</script>
<style module>
  .profileBackground {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0 !important;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: var(--br-81xl);
    background-color: var(--bg);
  }
  .avatarIcon {
    height: 56px;
    width: 56px;
    position: relative;
    object-fit: cover;
  }
  .shamIdress {
    width: 103px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: none;
  }
  .avatarContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-sm-5);
    z-index: 1;
  }
  .vuesaxoutlinelogoutIcon {
    height: 24px;
    width: 24px;
    position: relative;
  }
  .logout {
    width: 54px;
    position: relative;
    line-height: 120%;
    font-weight: 600;
    display: none;
  }
  .vuesaxoutlinelogoutParent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-xl);
    z-index: 1;
  }
  .logoutButtonContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-base);
    font-size: var(--heading-h5-size);
  }
  .profileBackgroundParent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-9xs) var(--padding-9xs) var(--padding-base);
    position: relative;
    gap: var(--gap-xs);
    z-index: 1;
    text-align: left;
    font-size: var(--font-size-lg);
    color: var(--neutrals-neutral-90);
    font-family: var(--heading-h3);
  }
</style>
