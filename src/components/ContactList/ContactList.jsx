import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { selectFilteredContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <motion.div className={clsx('container', css.cotainerList)} layout>
      <AnimatePresence>
        {Object.keys(visibleContacts).map(letter => (
          <motion.div key={letter} className={css.groupItem}>
            <motion.h2 layout>{letter}</motion.h2>
            <motion.ul className={css.contactList} layout>
              {visibleContacts[letter].map(contact => (
                <motion.li
                  key={contact.id}
                  layout
                  className={css.contactItem}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Contact data={contact} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactList;
