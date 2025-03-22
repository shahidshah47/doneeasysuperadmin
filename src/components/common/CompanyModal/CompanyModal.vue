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
          Company Profile
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
        <div class="flex items-center justify-between">
          <div class="flex flex-row items-center gap-6">
            <div class="h-28 w-28 rounded-lg flex items-center justify-center">
              <img
                :src="profileImageUrl"
                alt="Company Logo"
                class="w-full h-full rounded-md"
              />
            </div>
            <div>
              <h1 className="!text-[22px] !font-semibold !text-dm-blue m-0">
                XYZ Bito Group Pvt Ltd
              </h1>
              <p className="text-sm !text-vivid-purple m-0">
                Joined DE January 2022
              </p>
              <div className="flex items-center mt-1">
                <StarRating :rating="4" :width="16" :height="16" />
                <span class="ml-1 py-[2px] px-3 bg-light-lilac rounded-2xl">
                  <span className=" text-sm !font-semibold !text-dm-blue"
                    >4.5</span
                  ></span
                >
              </div>
            </div>
          </div>
          <button
            className=" sm:mt-0 px-3 py-2 bg-primary text-white-100 text-sm !font-semibold !rounded-lg hover:bg-indigo-700 transition-colors uppercase"
          >
            View Details
          </button>
        </div>
        <div>
          <h2 className="!text-[20px] !font-semibold">Summary</h2>
          <div className="flex flex-row gap-10">
            <OrderStat
              v-for="(stat, index) in stats"
              :key="index"
              :label="stat.label"
              :value="stat.value"
              :breakPoint="stat.breakPoint"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStat from "../OrderStat/OrderStat.vue";
import StarRating from "../StarRating/StarRating.vue";

export default {
  components: {
    StarRating,
    OrderStat,
  },
  data() {
    return {
      isVisible: true,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      profileImageSrc: "../../../assets/image/company-profile.png",
      stats: [
        { label: "No. of completed orders", value: 2304, breakPoint: "of" },
        { label: "No. of cancelled orders", value: 0, breakPoint: "of" },
        { label: "No. of work in progress", value: 12, breakPoint: "work" },
        { label: "Submitted orders on DocEasy", value: 312, breakPoint: "on" },
      ],
    };
  },
  computed: {
    modalStyles() {
      return {
        width: this.screenWidth < 768 ? "30vw" : "50vw",
        height: this.screenHeight < 600 ? "80vh" : "auto",
        maxHeight: "90vh",
      };
    },
    profileImageUrl() {
      return new URL(this.profileImageSrc, import.meta.url).href;
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
