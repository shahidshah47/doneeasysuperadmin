import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    companies: [],
    companyId: "",
    companyData: null,
    isDetail: false,
    isCompanyDetail: false,
    isServiceDetails: false,
    isMaterialDetails: false,
    modalDesc: ""
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
    toggleDetail(detail) {
      this.isDetail = !this.isDetail;
      this.modalDesc = detail;
    },
    toggleCompanyDetail() {
      this.isCompanyDetail = !this.isCompanyDetail;
    },
    toggleIsServiceDetails() {
      this.isServiceDetails = !this.isServiceDetails;
    },
    toggleIsMaterialDetails() {
      this.isMaterialDetails = !this.isMaterialDetails;
    },
    resetDetails() {
      this.isDetail = false;
      this.isCompanyDetail = false;
      this.isServiceDetails = false;
      this.isMaterialDetails = false;
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

export const useSurveyStore = defineStore("surveyStore", {
  state: () => ({
    selectedNote: null,
  }),
  actions: {
    setSelectedNote(data) {
      this.selectedNote = data;
    },
  },
});
