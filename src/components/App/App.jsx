import React from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

export default function App() {
  return (
    <>
      <ContactForm />
      <Filter />
      <ContactList />
    </>
  );
}
