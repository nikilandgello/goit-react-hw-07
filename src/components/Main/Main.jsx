import { useSelector } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import css from './Main.module.css';
import {
  selectContacts,
  selectError,
  selectLoading,
} from '../../redux/contactsSlice';

const Main = () => {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <main>
      <div className={css.background}>
        <ContactForm />
        {loading && !error && <p className={css.loading}>loading...</p>}
        {!loading && !error && contacts.length > 0 && <SearchBox />}{' '}
        {!loading && !error && contacts.length === 0 && (
          <h2 className={css.noContacts}>You have no contacts!</h2>
        )}
        <ContactList />
      </div>
    </main>
  );
};

export default Main;
