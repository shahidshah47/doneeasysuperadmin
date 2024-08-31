<template>
  <header :class="$style.topNav">
    <div :class="$style.dateContainer">
      <div :class="$style.feb132023">Feb 13, 2023</div>
      <div :class="$style.greetingContainer">
        <h1 :class="$style.heyJaneCooper">Hey, Jane Cooper</h1>
      </div>
    </div>
    <div :class="$style.fieldParent">
      <div :class="$style.field">
        <div :class="$style.fieldChild" />
      </div>
      <img :class="$style.messagesIcon" alt="" src="/messages@2x.png" />
      <div :class="$style.arrowLeftParent">
        <div :class="$style.arrowLeft" />
        <div :class="$style.search">Search</div>
      </div>
      <div :class="$style.search1" />
    </div>
    <div :class="$style.actions">
      <div :class="$style.masterButtonContainer">
        <div :class="$style.masterSmall">
          <div :class="$style.plusWrapper">
            <img :class="$style.plusIcon" alt="" src="/plus@2x.png" />
          </div>
          <b :class="$style.text">Add</b>
        </div>
        <div :class="$style.notificationButtonContainer">
          <div :class="$style.notificationButton">
            <img
              :class="$style.notificationIcon"
              loading="lazy"
              alt=""
              src="/messages-1.svg"
              @click="onMessagesIconClick"
            />
            <img
              :class="$style.notificationIcon"
              loading="lazy"
              alt=""
              src="/messages-2.svg"
              @click="onMessagesIconClick1"
            />
            <!-- <img
              :class="$style.notificationButtonChild"
              alt=""
              src="/messages1.svg"
            /> -->
            <img
              :class="$style.notificationIcon"
              loading="lazy"
              alt=""
              src="/notification.svg"
              @click="onNotificationIconClick"
            />
            <img
              :class="$style.notificationButtonChild"
              alt=""
              src="/group-48096139.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "TopNav",
    methods: {
      onMessagesIconClick() {
        // Please sync "Setting" to the project
      },
      onMessagesIconClick1() {
        // Please sync "Support" to the project
      },
      onNotificationIconClick() {
        // Please sync "Dashboard" to the project
      },
    },
  });
</script>
<style module>
  .feb132023 {
    position: relative;
    line-height: 17px;
    font-weight: 600;
    display: inline-block;
    min-width: 80px;
    white-space: nowrap;
  }
  .heyJaneCooper {
    margin: 0;
    flex: 1;
    position: relative;
    font-size: inherit;
    line-height: 29px;
    font-weight: 700;
    font-family: inherit;
    mix-blend-mode: normal;
    white-space: nowrap;
  }
  .greetingContainer {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: var(--heading-h1-size);
    color: var(--primary-90);
  }
  .dateContainer {
    width: 272px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-9xs);
  }
  .fieldChild {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: var(--br-5xs);
    background-color: var(--neutrals-neutral-0);
    border: 1px solid var(--neutrals-neutral-10);
    box-sizing: border-box;
  }
  .field {
    position: absolute;
    width: 100%;
    top: 0px;
    right: 0px;
    left: 0px;
    height: 100%;
  }
  .messagesIcon {
    position: absolute;
    height: 75%;
    width: 6.45%;
    top: 12.5%;
    right: 2.13%;
    bottom: 12.5%;
    left: 91.42%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: contain;
  }
  .arrowLeft {
    height: 24px;
    width: 24px;
    position: relative;
    display: none;
  }
  .search {
    align-self: stretch;
    flex: 1;
    position: relative;
  }
  .arrowLeftParent {
    position: absolute;
    top: calc(50% - 8px);
    left: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-5xs);
  }
  .search1 {
    position: absolute;
    top: 12px;
    right: -297px;
    width: 24px;
    height: 24px;
    overflow: hidden;
    display: none;
  }
  .fieldParent {
    height: 48px;
    width: 558px;
    position: relative;
    display: none;
    max-width: 100%;
    color: var(--neutrals-neutral-50);
  }
  .plusIcon {
    width: 16px;
    height: 16px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: contain;
  }
  .plusWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-3xs) 0px 0px;
  }
  .text {
    position: relative;
    letter-spacing: 0.01em;
    line-height: 300%;
    text-transform: uppercase;
    display: inline-block;
    min-width: 27px;
  }
  .masterSmall {
    border-radius: var(--br-5xs);
    background-color: var(--primary-purple);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-xs);
    gap: var(--gap-9xs);
  }
  .notificationIcon {
    height: 32px;
    width: 32px;
    position: relative;
    min-height: 32px;
    cursor: pointer;
  }
  .notificationButtonChild {
    height: 32px;
    width: 32px;
    position: relative;
    display: none;
    min-height: 32px;
  }
  .notificationButton {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-base);
  }
  .notificationButtonContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-11xs) 0px 0px;
  }
  .masterButtonContainer {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-5xl);
  }
  .actions {
    width: 223px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-6xs) 0px 0px;
    box-sizing: border-box;
    text-align: center;
    font-size: var(--caption-1-12px-regular-size);
    color: var(--neutrals-neutral-0);
  }
  .topNav {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px var(--padding-5xs) 0px 0px;
    box-sizing: border-box;
    max-width: 100%;
    gap: var(--gap-xl);
    text-align: left;
    font-size: var(--body-2-14px-semibold-size);
    color: var(--neutrals-neutral-100);
    font-family: var(--heading-h3);
  }
</style>
