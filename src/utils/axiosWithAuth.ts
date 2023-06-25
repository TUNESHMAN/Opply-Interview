import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    // config object
    baseURL: `https://february-21.herokuapp.com/`,
    headers: {
      Authorization: `Token ${localStorage.getItem(`token`)}`,
    },
  });
};
