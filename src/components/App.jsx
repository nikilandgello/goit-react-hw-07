import Header from './Header/Header';
import Main from './Main/Main';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps';
import EditContactForm from './EditContactForm/EditContactForm';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    dispatch(fetchContacts({ signal: abortController.signal }));

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main />
      <EditContactForm />
    </>
  );
}

export default App;
