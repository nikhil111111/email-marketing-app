"use client";

import { useEffect, useRef, useState } from "react";
import {
    getContacts,
    createContact,
    updateContact,
    importContacts,
    deleteContact
} from "@/services/contactService";

import ContactsTable from "@/components/contacts/ContactTable";
import ContactToolbar from "@/components/contacts/ContactToolbar";
import Pagination from "@/components/contacts/Pagination";
import ContactModal from "@/components/contacts/ContactModal";
import ContactForm from "@/components/contacts/ContactForm";
import DeleteContactModal from "@/components/contacts/DeleteContactModal";

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const [selectedContact, setSelectedContact] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchContacts();
        }, 500);

        return () => clearTimeout(timer);
    }, [search, page]);

    const fetchContacts = async () => {
        try {
            setLoading(true);

            const response = await getContacts({
                page,
                limit: 10,
                search,
            });

            setContacts(response.data.contacts);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            setSaving(true);

            if (isEditing) {
                await updateContact(selectedContact.id, values);
            } else {
                await createContact(values);
            }

            await fetchContacts();

            setShowModal(false);
            setSelectedContact(null);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save contact:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
        setIsEditing(false);
    };

    if (loading) {
        return <div>Loading contacts...</div>;
    }

    const handleDelete = async () => {
        try {
            setSaving(true);

            await deleteContact(selectedContact.id);

            await fetchContacts();

            setShowDeleteModal(false);
            setSelectedContact(null);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        try {
            setUploading(true);

            await importContacts(file);

            await fetchContacts();

            alert("Contacts imported successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to import contacts."
            );
        } finally {
            setUploading(false);

            // Allows selecting the same file again
            e.target.value = "";
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Contacts</h1>
                <p className="text-gray-500">
                    Manage your contacts.
                </p>
            </div>

            <ContactToolbar
                search={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                onAdd={() => {
                    setSelectedContact(null);
                    setIsEditing(false);
                    setShowModal(true);
                }}
                onImport={() => fileInputRef.current?.click()}
            />

            <ContactsTable
                contacts={contacts}
                onEdit={(contact) => {
                    setSelectedContact(contact);
                    setIsEditing(true);
                    setShowModal(true);
                }}
                onDelete={(contact) => {
                    setSelectedContact(contact);
                    setShowDeleteModal(true);
                }}
            />

            <Pagination
                pagination={pagination}
                onPageChange={setPage}
            />

            <ContactModal
                open={showModal}
                title={isEditing ? "Edit Contact" : "Add Contact"}
                onClose={handleCloseModal}
            >
                <ContactForm
                    initialValues={selectedContact}
                    loading={saving}
                    onSubmit={handleSubmit}
                />
            </ContactModal>

            <DeleteContactModal
                open={showDeleteModal}
                contact={selectedContact}
                loading={saving}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedContact(null);
                }}
                onConfirm={handleDelete}
            />

            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileSelect}
            />

        </div>
    );
}