import React from 'react'
import { ContactList } from '../components/ContactList'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { Message } from '../types/contacts'
import { FlashMessage } from '../components/flashMessage copy'


interface IContactListPage {

}

export const ContactListPage: React.FC<IContactListPage> = () => {
  const { contacts, message } = useSelector(({ contacts }: RootState) => contacts)

  return (
    <div>
      <h1>List of contacts</h1>
      {
        (message as Message)?.content
          ? <FlashMessage message={ message as Message } />
          : null
      }
      <ContactList contacts={ contacts } />
    </div>
  )
}