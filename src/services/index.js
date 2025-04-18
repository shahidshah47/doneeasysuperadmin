import api, { authApi } from "../api";

export const getBasicValues = async () => {
    try {
        let response = false;
        const now = new Date();
        const ttl = 7 * 24 * 60 * 60 * 1000;
        const res = await authApi.get("api/" + "get-startup-values");
        if (res.data.success) {
            const item = {
                value: res.data.data,
                expiry: now.getTime() + ttl,
            };
            localStorage.setItem("basicValues", JSON.stringify(item));
            response = item;
        }
        return response;
    } catch (err) {
        return false;
    }
};


// Load Google Maps script
export const loadGoogleMapsScript = () => {
    return new Promise((resolve) => {
      if (typeof google !== "undefined") {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8iGeBjvYsaGeV66adjFtXmEmF9dgGxuI`;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  };
  