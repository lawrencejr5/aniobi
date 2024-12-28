export enum EndPoints {
  messages = "https://aniobi.onrender.com/api/v1/messages",
  passkey = "https://aniobi.onrender.com/api/v1/passkey",
}

export const LocalStorage = {
  token: localStorage.getItem("token"),
};
