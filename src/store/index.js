import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    companies: JSON.parse(localStorage.getItem("companies")) || [],
    companyId: "",
    companyData: null,
  }),
  actions: {
    setCompanies(data) {
      this.companies = data;
      localStorage.setItem("companies", JSON.stringify(data));
    },
    setCompanyData(data) {
      this.companyData = data;
    },
    setCompanyId(id) {
      this.companyId = id;
    },
  },
});

export const useUserStore = defineStore('userStore', {
    state: () => ({
        legDocDetails: null,
    }),
    actions: {
        setLegDocDetails(data) {
            this.legDocDetails = data;
        }
    }
});
