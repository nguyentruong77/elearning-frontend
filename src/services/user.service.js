import { api, USER_API } from "../config/api";

export const userService = {
  signup(data) {
    return api.post(`${USER_API}/register`, data);
  },
  getProfile() {
    return api.get(`${USER_API}`);
  },
};
