import api from "@/lib/api";

export const getCampaigns = async () => {
  const { data } = await api.get("/campaigns");
  return data;
};

export const getCampaignById = async (id) => {
  const { data } = await api.get(`/campaigns/${id}`);
  return data;
};

export const createCampaign = async (payload) => {
  const { data } = await api.post("/campaigns", payload);
  return data;
};

export const updateCampaign = async (id, payload) => {
  const { data } = await api.patch(`/campaigns/${id}`, payload);
  return data;
};

export const deleteCampaign = async (id) => {
  const { data } = await api.delete(`/campaigns/${id}`);
  return data;
};

export const duplicateCampaign = async (id) => {
  const { data } = await api.post(
    `/campaigns/${id}/duplicate`
  );

  return data;
};

export const uploadAttachment = async (file) => {
  const formData = new FormData();

  formData.append("attachment", file);

  const { data } = await api.post(
    "/campaigns/upload-attachment",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const sendTestEmail = async (
    campaignId,
    email
) => {
    const response = await api.post(
        `/campaigns/${campaignId}/send-test`,
        { email }
    );

    return response.data;
};