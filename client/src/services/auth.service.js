import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

/**
 * Represents the Authentication Service
 */
class AuthService {
  /**
   * Logs the user in
   * @param {String} username 
   * @param {String} password 
   */
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  /**
   * Logs the user out
   */
  logout() {
    localStorage.removeItem("user");
  }

  /**
   * registers a new user
   * @param {String} username 
   * @param {String} email 
   * @param {String} password 
   * @param {String} experience 
   * @param {String} country 
   */
  register(username, email, password, experience, country) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      experience,
      country
    });
  }

  /**
   * returns the current user
   */
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();