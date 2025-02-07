import { program } from 'commander';
import { listContacts, getContactById, addContact, removeContact } from './contacts.js';

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
            case 'list':
                const contacts = await listContacts();
                console.table(contacts);
                break;

            case 'get':
                if (!id) throw new Error('Please provide a contact ID.');
                const contact = await getContactById(id);
                console.log(contact || 'Contact not found');
                break;

            case 'add':
                if (!name || !email || !phone) throw new Error('Please provide name, email, and phone.');
                const newContact = await addContact(name, email, phone);
                console.log('Added contact:', newContact);
                break;

            case 'remove':
                if (!id) throw new Error('Please provide a contact ID.');
                const removedContact = await removeContact(id);
                console.log(removedContact ? 'Removed contact:' : 'Contact not found', removedContact);
                break;

            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
        console.error('Error executing action:', error.message);
    }
}

invokeAction(options);
