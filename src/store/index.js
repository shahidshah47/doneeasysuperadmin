import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    companies: [],
    companyId: "",
    companyData: null,
    isDetail: false,
    isCompanyDetail: false,
    modalDesc: "",
    companyDetails: null
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
    setCompanyDetails(data) {
      this.companyDetails = data;
    },
    resetDetails() {
      this.isDetail = false;
      this.isCompanyDetail = false;
    },
  },
  persist: {
    paths: ["companies", "companyId", "companyData"],
  },
});

export const useAppointmentStore = defineStore("appointmentStore", {
  state: () => ({
    isServiceDetails: false,
    isMaterialDetails: false,
    serviceDetails: null,
    materialDetails: null,
    appointmentDetails: null,
    isServiceUpdated: false,
    isMaterialUpdated: false,
  }),
  actions: {
    toggleIsServiceDetails(data) {
      this.isServiceDetails = !this.isServiceDetails;
      if (data) {
        this.serviceDetails = data;
      } else {
        this.serviceDetails = null;
      }
    },
    toggleIsMaterialDetails(data) {
      this.isMaterialDetails = !this.isMaterialDetails;
      if (data) {
        this.materialDetails = data;
      } else {
        this.materialDetails = null;
      }
    },
    setAppointmentDetails(data) {
      this.appointmentDetails = data;
    },
    setIsServiceUpdated(data) {
      this.isServiceUpdated = data;
    },
    resetDetails() {
      this.isServiceDetails = false;
      this.isMaterialDetails = false;
    },
  }
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
