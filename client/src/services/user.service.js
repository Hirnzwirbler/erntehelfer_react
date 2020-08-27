  
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

/**
 * Represents the User Service
 */
class UserService {

  /**
   * gets content thats public (no login required)
   */
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  /**
   * gets content exlusively to users
   */
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  /**
   * gets content exclusively to admins
   */
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();