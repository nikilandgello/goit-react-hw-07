import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { openModal } from '../../redux/slice/modalSlice';
import { deleteContact } from '../../redux/contactsOps';
import { motion } from 'framer-motion';

const Contact = ({
  data: { id, firstname, number, lastname, email, dateofbith, notes },
}) => {
  const dispatch = useDispatch();
  const fullNameFunc = (firstname, lastname) => {
    if (!lastname) {
      return `${firstname}`;
    } else {
      return `${firstname} ${lastname}`;
    }
  };
  const fullname = fullNameFunc(firstname, lastname);
  const maxLegth = 15;

  const formattedNumber = number.replace(/-/g, '');

  const handleOpenModal = () => {
    dispatch(
      openModal({
        id,
        firstname,
        number,
        lastname,
        email,
        dateofbith,
        notes,
      })
    );
    document.body.style.overflow = 'hidden';
  };

  return (
    <motion.div className={css.contact} layout>
      <div className={css.contactGroup}>
        <div className={css.contactItem}>
          <svg className={css.icon} width={20} height={20}>
            <use href="/sprite.svg#icon-user"></use>
          </svg>
          <p className={css.contactDescription}>
            {fullname.length <= maxLegth
              ? fullname
              : `${fullname.substring(0, maxLegth)}...`}
          </p>
        </div>
        <div className={css.contactItem}>
          <svg className={css.icon} width={20} height={20}>
            <use href="/sprite.svg#icon-phone"></use>
          </svg>
          <p className={css.contactDescription}>
            <a href={`tel:+38${formattedNumber}`} className={css.phoneLink}>
              +38-{number}
            </a>
          </p>
        </div>
      </div>
      <div className={css.blockBtn}>
        <button className={css.button} onClick={handleOpenModal}>
          Edit
        </button>
        <button
          className={css.button}
          onClick={() => {
            dispatch(deleteContact(id));
          }}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default Contact;
