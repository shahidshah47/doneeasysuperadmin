<template>
  <main class="flex flex-col w-full bg-lavender min-h-screen">
    <TopBar />
    <div class="flex justify-center items-center flex-col gap-8 min-h-full py-20">
      <div>
        <p class="text-dm-blue text-2xl font-bold">I am</p>
      </div>
      <div class="flex flex-col md:flex-row self-center gap-6 justify-center mx-auto">
        <div class="register-btn w-[290px]">
          <a href="company/register"
             class="bg-white border border-lavender rounded-2xl p-5 flex flex-col items-center h-[250px]">
            <div class="p-2">
              <!-- Image component handling must be done via the `img` tag in Vue -->
              <img src="../../..//assets/image/DoneEasy_HowToGetOffer.webp" alt="Customer" width="75" height="75" />
            </div>
            <h3 class="text-dm-blue text-lg font-bold pt-2">Here to get offers</h3>
            <p class="text-center text-ds-blue text-sm pt-1">
              If you are looking to get quotation for any service or product feel free to select here to get offers
            </p>
          </a>
        </div>
        <div class="register-btn w-[290px]">
          <a href="vendor/register"
             class="bg-white border border-lavender rounded-2xl p-5 flex flex-col items-center h-[250px]">
            <img src="../../..//assets/image/DoneEasy_HowToGetSale.webp" alt="Vendor" width="75" height="75" />
            <h3 class="text-dm-blue text-lg font-bold pt-2">Here for more sales</h3>
            <p class="text-center text-ds-blue text-sm pt-1">
              If you are seeking more business by expanding your offering on DoneEasy feel free to select here for more sales
            </p>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TopBar from "../../../components/TopBar.vue"; // Adjust the import path as needed

export default {
  name: 'Page',
  components: {
    TopBar,
  },
  mounted() {
    // Clearing local storage on component mount, equivalent to useEffect in React
    if (typeof window !== 'undefined') {
      localStorage.removeItem("currentStep");
      localStorage.removeItem("formData");
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
