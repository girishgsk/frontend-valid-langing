import axios from "axios";

const axiosObj = axios.create({
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "https://backend-valid-landing.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosObj.interceptors.request.use((config) => {
//   const useremail = localStorage.getItem("emoployeeDatabase");
//   if (useremail) {
//     config.headers = {
//       ...config.headers,
//       userName: useremail,
//     };
//   }
//   return config;
// });

export const login = (data) => {
  return axiosObj.post("/login", data);
};

export const signup = (data) => {
  return axiosObj.post("/signup", data);
};
