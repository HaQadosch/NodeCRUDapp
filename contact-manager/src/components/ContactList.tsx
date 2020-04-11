import React from 'react'
import { Contact } from '../types/contacts'

interface IContactList {
  contacts: Array<Contact>
}

export const ContactList: React.FC<IContactList> = ({ contacts }) => {

  return (
    <div>
      <p>Contact List</p>
      <ul>{
        contacts.map(contact => (
          <li key={ contact._id }>{ `${ contact.name.first } ${ contact.name.last }` }</li>
        ))
      }</ul>
    </div>
  )
}