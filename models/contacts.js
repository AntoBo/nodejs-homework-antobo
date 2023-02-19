import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === id);
    return contact ?? null;
};

const removeContact = async (id) => {
    const contacts = await listContacts();

    const contactToDel = contacts.find((el) => el.id == id);
    if (!contactToDel) {
        return null;
    }

    const newContacts = contacts.filter((el) => el.id != id);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return id;
};

const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return newContact;
};

const updateContact = async (id, body) => {
    const contacts = await listContacts();

    const index = contacts.findIndex((el) => el.id === id);
    if (index === -1) {
        return null;
    }

    contacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
};

export default { listContacts, getContactById, removeContact, addContact, updateContact };
