import axios from "axios";

class AuthService {
  signup = async (body) => {
    try {
      let result = await axios.post(
        "http://localhost:5000/api/auth/signup",
        body
      );
      return result.data;
    } catch (err) {
      throw err;
    }
  };

  signin = async (body) => {
    try {
      let result = await axios.post(
        "http://localhost:5000/api/auth/signin",
        body
      );
      return result.data;
    } catch (err) {
      throw err;
    }
  }

  updateuserProfile = async (body) => {
    console.log('update',body);
    try {
      let result = await axios.put("http://localhost:5000/api/user/", body);
      return result.data; 
    } catch (err) {
      throw err;
    }
  }
}

export default new AuthService();
