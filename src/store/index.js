import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    companies: [],
    companyId: "",
    companyData: null,
    isDetail: false, // Ensure it's initialized correctly
  }),
  actions: {
    setCompanies(data) {
      this.companies = data;
    },
    setCompanyData(data) {
      this.companyData = data;
    },
    setCompanyId(id) {
      this.companyId = id;
    },
    toggleDetail() {
      this.isDetail = !this.isDetail;
    },
  },
  persist: {
    paths: ["companies", "companyId", "companyData"],
  },
});

export const useUserStore = defineStore("userStore", {
  state: () => ({
    legDocDetails: null,
  }),
  actions: {
    setLegDocDetails(data) {
      this.legDocDetails = data;
    },
  },
});
