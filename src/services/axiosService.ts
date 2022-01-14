import axios from "axios";

const baseUrl = "http://localhost:3000/api/";

const service = {
  post: (endpoint:string, token?:any, payload?:any) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        token: token,
      },
    });
    return instance.post(baseUrl + endpoint, payload);
  },
};

export default service;