export enum EndPoints {
  messages = "http://localhost:5000/api/v1/messages",
  passkey = "http://localhost:5000/api/v1/passkey",
  admin = "http://localhost:5000/api/v1/admin",
  // messages = "https://aniobi.onrender.com/api/v1/messages",
  // passkey = "https://aniobi.onrender.com/api/v1/passkey",
}

export const LocalStorage = {
  token: localStorage.getItem("token"),
};
