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