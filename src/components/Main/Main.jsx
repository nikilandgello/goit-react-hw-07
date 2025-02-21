import { useSelector } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import css from './Main.module.css';
import { selectContacts } from '../../redux/slice/contactsSlice';

const Main = () => {
  const contacts = useSelector(selectContacts);

  return (
    <main>
      <div className={css.background}>
        <ContactForm />
        {contacts.length > 0 ? (
          <SearchBox />
        ) : (
          <h2 className={css.noContacts}>You have no contacts!</h2>
        )}
        <ContactList />
      </div>
    </main>
  );
};

export default Main;
