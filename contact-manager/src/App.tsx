import React from 'react'
import './App.css'

import { Container } from "semantic-ui-react";
import { NavLink, Route } from "react-router-dom";
import { ContactListPage } from './pages/ContactListPage';
import { ContactFormPage } from './pages/ContactFormPage';

export const App: React.FC = () => {
  return (
    <Container >
      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/">
          Contacts list
        </NavLink>
        <NavLink className="item" activeClassName="active" exact to="/contacts/new">
          Add contact
        </NavLink>
      </div>
      <Route exact path="/" component={ ContactListPage } />
      <Route path="/contacts/new" component={ ContactFormPage } />
      <Route path="/contacts/edit/:_id" component={ ContactFormPage } />
    </Container>
  );
}
