import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

class UserService {
  getPublicContent() {
    return axios.get("all");
  }

  getUserBoard() {
    return axios.get("user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "/customers", {
      headers: authHeader(),
    });
  }
}

export default new UserService();
