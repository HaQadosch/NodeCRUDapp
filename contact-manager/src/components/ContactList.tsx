import React from 'react'
import { Contact } from '../types/contacts'
import { Card } from "semantic-ui-react";
import { ContactCard } from './ContactCard'

interface IContactList {
  contacts: Array<Contact>
}

export const ContactList: React.FC<IContactList> = ({ contacts }) => {

  return (
    <div>
      <p>Contact List</p>
      <Card.Group>{
        contacts.map(contact => (
          <ContactCard key={ contact._id } contact={ contact } />
        ))
      }</Card.Group>
    </div>
  )
}