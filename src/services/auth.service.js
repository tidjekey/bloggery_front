import axios from "axios";
import { Cookies } from 'react-cookie';
//import Cookies from 'js-cookie';


const API_URL = ( process.env.REACT_APP_BACKEND_API || "http://localhost:8080/api/" ) + "auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  }, { withCredentials: true });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    }, { withCredentials: true })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      //const cookies = new Cookies();
      //cookies.set('x-access-token', response.data.accessToken, {path: '/'});

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  let u = JSON.parse(localStorage.getItem("user"));
  if(u.expires < Date.now()) 
    logout();
  return u;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};