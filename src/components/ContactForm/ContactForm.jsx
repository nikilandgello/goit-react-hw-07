import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import ContactFormBase from '../ContactFormBase/ContactFormBase';
import css from './ContactForm.module.css';
import {
  closeAdditionalInfoForm,
  openAdditionalInfoForm,
} from '../../redux/slice/additionalInfoSlice';
import { addContact } from '../../redux/contactsOps';
import { selectedAdditionalInfoForm } from '../../redux/selected';

const ContactForm = () => {
  const dispatch = useDispatch();
  const additionalInfoForm = useSelector(selectedAdditionalInfoForm);

  const initialValues = {
    firstname: '',
    number: '',
    lastname: '',
    email: '',
    dateofbith: '',
    notes: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
    dispatch(closeAdditionalInfoForm());
  };

  const onClick = () => {
    dispatch(openAdditionalInfoForm());
  };

  return (
    <div className={clsx('container', css.containerForm)}>
      <div className={css.block}>
        <h2 className={css.title}>Add Contact!</h2>
        <ContactFormBase
          onSubmit={handleSubmit}
          initialValues={initialValues}
          contentBtn="Add Contact"
          onClick={onClick}
          open={additionalInfoForm}
        />
      </div>
    </div>
  );
};

export default ContactForm;
