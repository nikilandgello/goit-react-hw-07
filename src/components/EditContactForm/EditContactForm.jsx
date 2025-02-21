import ContactFormBase from '../ContactFormBase/ContactFormBase';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slice/modalSlice';
import Modal from '../Modal/Modal';
import css from './EditContactForm.module.css';
import { editContact } from '../../redux/contactsOps';
import { selectedModalContact, selectedModalOpen } from '../../redux/selected';

const EditContactForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectedModalOpen);
  const selectedContact = useSelector(selectedModalContact);

  if (!selectedContact) return null;

  const initialValues = {
    firstname: selectedContact.firstname || '',
    number: selectedContact.number || '',
    lastname: selectedContact.lastname || '',
    email: selectedContact.email || '',
    dateofbith: selectedContact.dateofbith || '',
    notes: selectedContact.notes || '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(editContact({ ...values, id: selectedContact.id }));
    actions.resetForm();
    dispatch(closeModal());
    document.body.style.overflow = '';
  };

  const handleClose = () => {
    dispatch(closeModal());
    document.body.style.overflow = '';
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className={css.title}>Edit Contact!</h2>
      <ContactFormBase
        onSubmit={handleSubmit}
        initialValues={initialValues}
        contentBtn="Edit Contact"
        open={true}
        btn={false}
      />
    </Modal>
  );
};

export default EditContactForm;
