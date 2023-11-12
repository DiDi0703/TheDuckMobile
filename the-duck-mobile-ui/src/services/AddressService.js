import { del, get, post } from "./AxiosInstance";

export const getProvines = () => {
  return get("address/provinces");
};

export const getDistricts = (provinceId) => {
  return get(`address/districts?provineId=${provinceId}`);
};

export const getWards = (districtId) => {
  return get(`address/wards?districtId=${districtId}`);
};

export const getAddresses = () => {
  return get("address");
};

export const addAddress = (data) => {
  return post("address", data);
};

export const deleteAddress = (id) => {
  return del(`address?addressId=${id}`);
};
