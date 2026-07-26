import api from "@/lib/api";

export const getAudiences = async () => {
  const { data } = await api.get("/audiences");
  return data;
};

export const getAudienceById = async (id) => {
  const { data } = await api.get(`/audiences/${id}`);
  return data;
};

export const createAudience = async (payload) => {
  const { data } = await api.post("/audiences", payload);
  return data;
};

export const updateAudience = async (id, payload) => {
  const { data } = await api.patch(`/audiences/${id}`, payload);
  return data;
};

export const deleteAudience = async (id) => {
  const { data } = await api.delete(`/audiences/${id}`);
  return data;
};

export const getAudienceContacts = async (id) => {
  const { data } = await api.get(`/audiences/${id}/contacts`);
  return data;
};