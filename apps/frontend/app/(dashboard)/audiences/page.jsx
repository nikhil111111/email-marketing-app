"use client";

import { useEffect, useState } from "react";

import {
  getAudiences,
  createAudience,
  updateAudience,
  deleteAudience,
  getAudienceContacts,
} from "@/services/audienceService";

import AudienceToolbar from "@/components/audiences/AudienceToolbar";
import AudienceTable from "@/components/audiences/AudienceTable";
import AudienceModal from "@/components/audiences/AudienceModal";
import AudienceForm from "@/components/audiences/AudienceForm";
import DeleteAudienceModal from "@/components/audiences/DeleteAudienceModal";

export default function AudiencesPage() {
  const [audiences, setAudiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [selectedAudience, setSelectedAudience] =
    useState(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAudiences();
  }, []);

  const fetchAudiences = async () => {
    try {
      setLoading(true);

      const response = await getAudiences();

      setAudiences(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAudiences = audiences.filter((audience) =>
    audience.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSubmit = async (values) => {
    try {
      setSaving(true);

      if (isEditing) {
        await updateAudience(
          selectedAudience.id,
          values
        );
      } else {
        await createAudience(values);
      }

      await fetchAudiences();

      setShowModal(false);
      setSelectedAudience(null);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);

      await deleteAudience(selectedAudience.id);

      await fetchAudiences();

      setShowDeleteModal(false);
      setSelectedAudience(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleViewContacts = async (audience) => {
    try {
      const response = await getAudienceContacts(
        audience.id
      );

      console.log(response.data);

      alert(
        `This audience has ${response.count} contact(s).\n\nCheck the console to view them.`
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading audiences...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Audiences
        </h1>

        <p className="text-gray-500">
          Manage your audiences.
        </p>
      </div>

      <AudienceToolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => {
          setSelectedAudience(null);
          setIsEditing(false);
          setShowModal(true);
        }}
      />

      <AudienceTable
        audiences={filteredAudiences}
        onEdit={(audience) => {
          setSelectedAudience(audience);
          setIsEditing(true);
          setShowModal(true);
        }}
        onDelete={(audience) => {
          setSelectedAudience(audience);
          setShowDeleteModal(true);
        }}
        onViewContacts={handleViewContacts}
      />

      <AudienceModal
        open={showModal}
        title={
          isEditing
            ? "Edit Audience"
            : "Create Audience"
        }
        onClose={() => {
          setShowModal(false);
          setSelectedAudience(null);
          setIsEditing(false);
        }}
      >
        <AudienceForm
          initialValues={selectedAudience}
          loading={saving}
          onSubmit={handleSubmit}
        />
      </AudienceModal>

      <DeleteAudienceModal
        open={showDeleteModal}
        audience={selectedAudience}
        loading={saving}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedAudience(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}