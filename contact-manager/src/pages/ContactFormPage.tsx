import React from 'react'
import { ContactForm } from '../components/ContactForm'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { RootState, updateContact } from '../store/rootReducer';
import { Contact } from '../types/contacts';

interface IContactFormPage {
}

export const ContactFormPage: React.FC<IContactFormPage> = () => {
  const dispatch: AppDispatch = useDispatch()
  const { contact }: { contact: Contact | null } = useSelector(({ contacts }: RootState) => contacts)
  let { _id } = useParams()

  React.useEffect(() => {
    if (_id) {
      dispatch(updateContact(_id))
    }
    // eslint-disable-next-line
  }, [_id])

  if (!_id) {
    return <ContactForm />
  }

  return (
    <div>
      { contact && (contact as Contact)?._id
        ? <ContactForm />
        : <p>Loading please wait...</p>
      }
    </div>
  )
}