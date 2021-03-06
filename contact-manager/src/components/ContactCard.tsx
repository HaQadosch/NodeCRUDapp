import React from 'react'
import { Contact } from '../types/contacts'
import { Card, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';


interface IContactCard {
  contact: Contact
}

export const ContactCard: React.FC<IContactCard> = ({ contact: { _id, name, email, phone } }) => {
  const dispatch: AppDispatch = useDispatch()

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> { `${ name.first } ${ name.last }` }
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="phone" /> { phone }
          </p>
          <p>
            <Icon name="mail outline" /> { email }
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons"></div>
        <Button basic color="green"
          as={ Link }
          to={ `/contacts/edit/${ _id }` }
        >Edit</Button>
        <Button basic color="red"
          onClick={ handleDeleteClick }
        >Delete</Button>
      </Card.Content>
    </Card>
  )

  function handleDeleteClick () {
    dispatch({ type: 'saga/deleteContact', payload: _id })
  }
}