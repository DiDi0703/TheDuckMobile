import { del, get, post, put } from "../AxiosInstance";

export const getAllOSs = (isDeletedFilter = false) => {
  return get(`osadmin?isDeletedFilter=${isDeletedFilter}`);
};

export const getActiveOSs = () => {
  return get("osadmin/active");
};

export const addOS = (data) => {
  return post("osadmin", data);
};

export const updateOS = (osId, data) => {
  return put(`osadmin/${osId}`, data);
};

export const deleteOS = (osId) => {
  return del(`osadmin/${osId}`);
};

export const restoreOS = (osId) => {
  return get(`osadmin/restore/${osId}`);
};
