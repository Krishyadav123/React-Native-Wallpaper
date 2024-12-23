import axios from "axios";

const API_KEY = "47805514-f91f8d9c5791b3f3e80d4d757";

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formateUrl = (params) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";

  if (!params) {
    return url;
  }
  let paramsKeys = Object.keys(params);
  paramsKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log("Final url: ", url);
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formateUrl(params));
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error.message);
    return { success: false, msg: error.message };
  }
};
