import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../../redux/contacts/contacts-operations.js';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors.js';
import { AiFillDelete } from 'react-icons/ai';
import { RiContactsLine } from 'react-icons/ri';
import {
  ContactListItem,
  ContactIcon,
  ContactListWrapper,
  ContactListName,
  ContactListPhone,
  ContactDetails,
  DeleteButton,
} from './ContactListStyles.jsx';

const ContactItem = ({ id, name, phone, onDelete }) => (
  <ContactListItem key={id}>
    <ContactIcon>
      <RiContactsLine />
    </ContactIcon>
    <ContactDetails>
      <ContactListName>{name}</ContactListName>
      <ContactListPhone>{phone}</ContactListPhone>
    </ContactDetails>
    <DeleteButton type="button" onClick={() => onDelete(id)}>
      <AiFillDelete />
    </DeleteButton>
  </ContactListItem>
);

function ContactList() {
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  return (
    <ContactListWrapper>
      {visibleContacts.map(({ id, name, phone }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          phone={phone}
          onDelete={(id) => dispatch(removeContact(id))}
        />
      ))}
    </ContactListWrapper>
  );
}

export default ContactList;