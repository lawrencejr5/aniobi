export enum EndPoints {
  messages = "http://localhost:5000/api/v1/messages",
  admin = "http://localhost:5000/api/v1/admin",
  comment = "http://localhost:5000/api/v1/comment",
  like = "http://localhost:5000/api/v1/like",
  // messages = "https://aniobi-api.vercel.app/api/v1/messages",
  // admin = "https://aniobi-api.vercel.app/api/v1/admin",
  // comment = "https://aniobi-api.vercel.app/api/v1/comment",
  // like = "https://aniobi-api.vercel.app/api/v1/like",
}

export const LocalStorage = {
  token: localStorage.getItem("token"),
  admin: localStorage.getItem("admin"),
};
