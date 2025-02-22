import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './slice/modalSlice';
import { additionalInfoReducer } from './slice/additionalInfoSlice';
import { filterReducer } from './filtersSlice';
import { contactReducer } from './contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
    modal: modalReducer,
    additionalInfo: additionalInfoReducer,
  },
});
