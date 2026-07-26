import api from "@/lib/api";

export const getContacts = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  order = "DESC",
}) => {
  const { data } = await api.get("/contacts", {
    params: {
      page,
      limit,
      search,
      sortBy,
      order,
    },
  });

  return data;
};

export const getContactById = async (id) => {
  const { data } = await api.get(`/contacts/${id}`);
  return data;
};

export const createContact = async (payload) => {
  const { data } = await api.post("/contacts", payload);
  return data;
};

export const updateContact = async (id, payload) => {
  const { data } = await api.put(`/contacts/${id}`, payload);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await api.delete(`/contacts/${id}`);
  return data;
};

export const importContacts = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/contacts/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};