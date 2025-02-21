import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { changeFilter, selectNameFilter } from '../../redux/slice/filtersSlice';
import { selectError, selectLoading } from '../../redux/slice/contactsSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div className="container">
      <div className={css.searchBox}>
        {isLoading && !error && (
          <p className={`${css.text} ${css.loading}`}>Request in progress...</p>
        )}
        {!isLoading && !error && (
          <>
            <p className={css.text}>Find contacts by first name</p>
            <input
              className={css.input}
              type="text"
              value={filter}
              placeholder="enter first name"
              onChange={e => dispatch(changeFilter(e.target.value))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
