<template>
  <div
    v-if="isVisible"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-gray backdrop-blur-md z-50"
  >
    <div class="relative overflow-y-auto" :style="modalStyles">
      <div
        class="flex flex-row items-center justify-between !bg-light-lilac rounded-tl-2xl rounded-tr-2xl px-6 py-2"
      >
        <h2 class="!text-[20px] !font-semibold text-dm-blue m-0">
          More details
        </h2>
        <button
          @click="closeModal"
          class="text-dm-blue hover:text-black !text-2xl font-semibold"
          type="button"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div
        class="flex flex-col !bg-white-100 rounded-bl-2xl rounded-br-2xl px-6 py-3 shadow-soft-blue"
      >
        <h1 class="text-dm-blue !font-semibold !text-base mb-3">
          Lorem Ipsum Heading
        </h1>
        <p class="!text-dark-indigo-100 !text-base">
          Built the Oodles app as a Free app. This SERVICE is provided by Oodles
          at no cost and is intended for use as is. This page is used to inform
          visitors regarding our policies with the collection, use, and
          disclosure of Personal Information if anyone decided to use our
          Service. If you choose to use our Service, then you agree to the
          collection and use of information in relation to this policy. The
          Personal Information that we collect is used for providing and
          improving the Service. <br />
          We will not use or share your information with anyone except as
          described in this Privacy Policy. The terms used in this Privacy
          Policy have the same meanings as in our Terms and Conditions, which is
          accessible at Afach unless otherwise defined in this Privacy Policy.
          Information Collection and Use For a better experience, while using
          our Service, we may require you to provide us with certain personally
          identifiable information, including but not limited to Full name,
          Email, Phone number, . <br />
          The information that we request will be retained by us and used as
          described in this privacy policy. The app does use third party
          services that may collect information used to identify you. Link to
          privacy policy of third party service providers used by the ap
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };
  },
  computed: {
    modalStyles() {
      return {
        width: this.screenWidth < 768 ? "90vw" : "70vw",
        height: this.screenHeight < 600 ? "80vh" : "auto",
        maxHeight: "90vh",
      };
    },
  },
  methods: {
    closeModal() {
      this.isVisible = false;
      this.$emit("close");
    },
    updateScreenSize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
};
</script>
