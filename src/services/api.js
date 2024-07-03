import axios from "../utils/axiosCustomize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};
export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};
export const callFetchListUser = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};
export const callCreateUser = (fullName, password, email, phone) => {
  return axios.post("/api/v1/user", {
    fullName,
    password,
    email,
    phone,
  });
};
export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};
export const callUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", {
    _id,
    fullName,
    phone,
  });
};

export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callFetchCategory = () => {
  return axios.get("/api/v1/database/category");
};
export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const callCreateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callUpdateBook = (
  id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callDeleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
};

export const callFetchBookById = (id) => {
  return axios.get(`api/v1/book/${id}`);
};

export const callPlaceOrder = (data) => {
  return axios.post("api/v1/order", {
    ...data,
  });
};
export const callFetchHistory = () => {
  return axios.get("/api/v1/history");
};

export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};
export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
  return axios.put(`/api/v1/user`, {
    _id,
    phone,
    fullName,
    avatar,
  });
};
export const callUpdatePassword = (email, oldpass, newpass) => {
  return axios.post(`/api/v1/user/change-password`, {
    email,
    oldpass,
    newpass,
  });
};

export const callFetchDashBoard = () => {
  return axios.get('/api/v1/database/dashboard')
}
export const callFetchListOrder = (query) => {
  return axios.get(`/api/v1/order?${query}`);
};
