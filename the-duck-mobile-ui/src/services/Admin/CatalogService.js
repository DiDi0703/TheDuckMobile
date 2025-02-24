import { del, get, post, put } from "../AxiosInstance";

export const getAllCatalogs = (isDeletedFilter = false) => {
  return get(`catalogadmin?isDeletedFilter=${isDeletedFilter}`);
};

export const getActiveCatalogs = () => {
  return get("catalogadmin/active");
};

export const addCatalog = (data) => {
  return post("catalogadmin", data);
};

export const updateCatalog = (catalogId, data) => {
  return put(`catalogadmin/${catalogId}`, data);
};

export const deleteCatalog = (catalogId) => {
  return del(`catalogadmin/${catalogId}`);
};

export const restoreCatalog = (catalogId) => {
  return get(`catalogadmin/restore/${catalogId}`);
};

export const getCatalogSpecialFeatures = (catalogId) => {
  return get(`catalogadmin/${catalogId}/special-features`);
};

export const addCatalogSpecialFeatures = (catalogId, specialFeatureId) => {
  return post(`catalogadmin/${catalogId}/special-features`, {
    specialFeatureId,
  });
};

export const deleteCatalogSpecialFeatures = (catalogId, specialFeatureId) => {
  return del(`catalogadmin/${catalogId}/special-features/${specialFeatureId}`);
};
