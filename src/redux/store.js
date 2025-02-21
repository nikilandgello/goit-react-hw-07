import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './slice/contactsSlice';
import { filterReducer } from './slice/filtersSlice';
import { modalReducer } from './slice/modalSlice';
import { additionalInfoReducer } from './slice/additionalInfoSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
    modal: modalReducer,
    additionalInfo: additionalInfoReducer,
  },
});
