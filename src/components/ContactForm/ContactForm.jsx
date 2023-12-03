import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addContact,
  fetchContacts,
} from '../../redux/contacts/contacts-operations';
// import { getContacts } from '../../redux/contacts/contacts-selectors'
import {
  ContactFormWrapper,
  Form,
  ContactTitle,
  Button,
  Label,
  ContactInput,
} from './ContactFormStyles';
import { useSelector } from 'react-redux';

export default function ContactForm({ onSubmit }) {
  const contacts = useSelector(state => state.contacts.items);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleChange = ({ currentTarget: { name, value } }) => {
    name === 'name' ? setName(value) : setPhone(value);
  };

  const resetState = () => {
    setName('');
    setPhone('');
  };
  console.log(onSubmit);

  const isContactDuplicate = (contacts, name, phone) => {
  if (!contacts || !Array.isArray(contacts)) {
    return false;
  }
  return contacts.some(
    contact => contact.name === name || contact.phone === phone
  );
};


  const handleSubmit = e => {
  e.preventDefault();
  resetState();

  const isDuplicateContact = isContactDuplicate(contacts, name, phone);

  if (isDuplicateContact) {
    alert(`Contact with this name or phone number already exists!`);
    return;
  }

  dispatch(addContact({ name, phone }));
};

  return (
    <ContactFormWrapper>
    <ContactTitle>Phonebook</ContactTitle>
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <ContactInput
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </Label>
      <Label>
        Number
        <ContactInput
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </Label>
      <Button type="submit">
        Add contact
      </Button>
      </Form>
    </ContactFormWrapper>
  );
}


// import PropTypes from 'prop-types';
// import React from 'react';
// import * as Yup from 'yup';
// import { Formik, Form, Field } from 'formik';
// import {
//   ContactFormWrapper,
//   ContactTitle,
//   Button,
//   FormWrapper,
//   FormGroup,
//   Label,
//   ErrorText,
// } from './ContactFormStyles';
// import Notiflix from 'notiflix';
// import {
//   addContact,
//   fetchContacts,
// } from '../../redux/contacts/contacts-operations';

// const phonebookSchema = Yup.object().shape({
//   name: Yup.string()
//     .trim()
//     .matches(
//       /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
//       'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
//     )
//     .required('Name is required'),
//   phone: Yup.string()
//     .trim()
//     .matches(
//       /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
//       'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
//     )
//     .required('Phone number is required'),
// });

// function ContactForm() {
//   const initialValues = {
//     name: '',
//     phone: '',
//   };

//   const { data: contacts } = useGetContactsQuery();
//   const [addContactToFilter] = useAddContactToFilterMutation();

//   const isContactDuplicate = (name, phone) => {
//     if (!contacts || !Array.isArray(contacts)) {
//       return false;
//     }
//     return contacts.some(
//       contact => contact.name === name || contact.phone === phone
//     );
//   };

// condition: (data, { getState }) => {
//   const { contacts } = getState();
//   if (isDublicate(data, contacts.items)) {
//     alert(`${data.name} is already exist!`);
//     return false;
//   }
// },

//   const handleSubmit = async (values, actions) => {
//     const { name, phone } = values;
//     const isDuplicateContact = isContactDuplicate(name, phone);

//     const successMessage = 'Contact added successfully!';
//     const errorMessage = 'An error occurred while adding the contact.';

//     if (isDuplicateContact) {
//       Notiflix.Notify.failure(
//         'Contact with the same name or phone number already exists!'
//       );
//       return;
//     }

//     try {
//       const response = await addContactToFilter({ name, phone });

//       if (response.error) {
//         Notiflix.Notify.failure(errorMessage);
//         return;
//       }

//       actions.resetForm();
//       Notiflix.Notify.success(successMessage);
//     } catch (error) {
//       Notiflix.Notify.failure(errorMessage);
//     }
//   };

//   return (
//     <ContactFormWrapper>
//       <ContactTitle>Phonebook</ContactTitle>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={phonebookSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form as={FormWrapper}>
//           <FormGroup>
//             <Label htmlFor="name">Name</Label>
//             <Field type="text" id="name" name="name" />
//             <ErrorText name="name" component="div" className="error" />
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="phone">Phone</Label>
//             <Field type="text" id="phone" name="phone" />
//             <ErrorText name="phone" component="div" className="error" />
//           </FormGroup>

//           <Button type="submit">Add Contact</Button>
//         </Form>
//       </Formik>
//     </ContactFormWrapper>
//   );
// }

// // ContactForm.propTypes = {
// //   contacts: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       id: PropTypes.string.isRequired,
// //       name: PropTypes.string.isRequired,
// //       phone: PropTypes.string.isRequired,
// //     })
// //   ).isRequired,
// // };
// export default ContactForm;