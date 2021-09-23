const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);

    if (data.length === 0) {
      return console.log(`No contacts`);
    }
    const contacts = JSON.parse(data);
    return console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    return console.log(contacts[idx]);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return console.table(contacts);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  id = v4();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return console.table(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
