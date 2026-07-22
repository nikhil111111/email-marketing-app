const csv = require("csv-parser");
const { Readable } = require("stream");
const { Op } = require("sequelize");

const { Contact } = require("../../database/models");

const importContacts = async (workspaceId, fileBuffer) => {
  const rows = [];

  return new Promise((resolve, reject) => {
    Readable.from(fileBuffer)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        try {
          const validRows = [];
          const invalidRows = [];

          // Remove invalid rows & extract custom fields
          for (const row of rows) {
            const name = row.name?.trim();
            const email = row.email?.trim().toLowerCase();
            const phone = row.phone?.trim() || null;

            if (!name || !email) {
              invalidRows.push(row);
              continue;
            }

            const customFields = {};

            Object.keys(row).forEach((key) => {
              if (!["name", "email", "phone"].includes(key)) {
                customFields[key] = row[key];
              }
            });

            validRows.push({
              workspaceId,
              name,
              email,
              phone,
              customFields,
            });
          }

          // Remove duplicate rows inside uploaded CSV
          const uniqueRows = [];
          const seenEmails = new Set();
          const seenPhones = new Set();

          for (const row of validRows) {
            if (seenEmails.has(row.email)) continue;

            if (row.phone && seenPhones.has(row.phone)) continue;

            seenEmails.add(row.email);

            if (row.phone) {
              seenPhones.add(row.phone);
            }

            uniqueRows.push(row);
          }

          // Fetch existing contacts
          const existingContacts = await Contact.findAll({
            where: {
              workspaceId,
              [Op.or]: [
                {
                  email: uniqueRows.map((r) => r.email),
                },
                {
                  phone: uniqueRows
                    .filter((r) => r.phone)
                    .map((r) => r.phone),
                },
              ],
            },
            attributes: ["email", "phone"],
          });

          const existingEmails = new Set(
            existingContacts.map((c) =>
              c.email.toLowerCase()
            )
          );

          const existingPhones = new Set(
            existingContacts
              .filter((c) => c.phone)
              .map((c) => c.phone)
          );

          const contactsToInsert = uniqueRows.filter((row) => {
            if (existingEmails.has(row.email)) return false;

            if (row.phone && existingPhones.has(row.phone))
              return false;

            return true;
          });

          if (contactsToInsert.length) {
            await Contact.bulkCreate(contactsToInsert);
          }

          resolve({
            totalRows: rows.length,
            imported: contactsToInsert.length,
            skipped:
              rows.length - contactsToInsert.length,
            invalid: invalidRows.length,
          });
        } catch (error) {
          reject(error);
        }
      })
      .on("error", reject);
  });
};

module.exports = {
  importContacts,
};