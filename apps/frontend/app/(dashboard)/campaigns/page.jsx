"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createCampaign,
  deleteCampaign,
  duplicateCampaign,
  getCampaigns,
  updateCampaign,
} from "@/services/campaignService";

import CampaignToolbar from "@/components/campaigns/CampaignToolbar";
import CampaignTable from "@/components/campaigns/CampaignTable";
import CampaignModal from "@/components/campaigns/CampaignModal";
import CampaignForm from "@/components/campaigns/CampaignForm";
import DeleteCampaignModal from "@/components/campaigns/DeleteCampaignModal";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [campaigns, search]);

  const handleCreate = () => {
    setSelectedCampaign(null);
    setShowFormModal(true);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setShowFormModal(true);
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);

      if (selectedCampaign) {
        await updateCampaign(selectedCampaign.id, formData);
      } else {
        await createCampaign(formData);
      }

      await fetchCampaigns();

      setShowFormModal(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteCampaign(selectedCampaign.id);

      await fetchCampaigns();

      setShowDeleteModal(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await duplicateCampaign(id);
      await fetchCampaigns();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAttachmentUploaded = async (
    campaign,
    attachment
  ) => {
    console.log("Attachment uploaded", campaign, attachment);

    /**
     * Later we'll update the campaign with:
     * attachmentName
     * attachmentPath
     * attachmentMimeType
     * attachmentSize
     */
  };

  return (
    <div className="space-y-6">
      <CampaignToolbar
        search={search}
        setSearch={setSearch}
        onCreate={handleCreate}
      />

      <CampaignTable
        campaigns={filteredCampaigns}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onDuplicate={handleDuplicate}
        onUploadAttachment={handleAttachmentUploaded}
      />

      <CampaignModal
        open={showFormModal}
        title={
          selectedCampaign
            ? "Edit Campaign"
            : "Create Campaign"
        }
        onClose={() => {
          setShowFormModal(false);
          setSelectedCampaign(null);
        }}
      >
        <CampaignForm
          initialValues={selectedCampaign}
          onSubmit={handleSave}
          loading={loading}
        />
      </CampaignModal>

      <DeleteCampaignModal
        open={showDeleteModal}
        campaign={selectedCampaign}
        loading={loading}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCampaign(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}