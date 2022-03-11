import axios from "axios";

// Login Method
const postLogin = (data) => {
  console.log("api:", data);
  axios
    .post("https://discordapp.com/api/oauth2/token", data)
    .then((response) => {
      console.log("response", response);
    });
};

export { postLogin };
