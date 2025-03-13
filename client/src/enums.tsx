export enum EndPoints {
  // messages = "http://localhost:5000/api/v1/messages",
  // admin = "http://localhost:5000/api/v1/admin",
  messages = "https://aniobi.onrender.com/api/v1/messages",
  admin = "https://aniobi.onrender.com/api/v1/admin",
}

export const LocalStorage = {
  token: localStorage.getItem("token"),
  admin: localStorage.getItem("admin"),
};
