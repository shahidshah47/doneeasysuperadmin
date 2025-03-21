import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    companies: [],
    companyId: "",
    companyData: null,
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
  },
  persist: true,
});
