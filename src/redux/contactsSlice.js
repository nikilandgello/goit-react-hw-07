import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const initialState = {
  items: [],
  loading: false,
  error: false,
};

const handlePending = state => {
  state.loading = true;
};

const handleFulfilled = state => {
  state.loading = false;
  state.error = false;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      //fetchContacts
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      //deleteContact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteContact.rejected, handleRejected)

      //addContact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      //editContact
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        handleFulfilled(state);
        const itemIndex = state.items.findIndex(
          item => item.id === action.payload.id
        );
        if (itemIndex !== -1) {
          state.items[itemIndex] = action.payload;
        }
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export const contactReducer = slice.reducer;

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const groupContacts = contacts
      .filter(contact =>
        contact.firstname.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.firstname.trim().localeCompare(b.firstname.trim()))
      .reduce((acc, contact) => {
        const firstLater = contact.firstname[0].toUpperCase();

        if (!acc[firstLater]) {
          acc[firstLater] = [];
        }

        acc[firstLater].push(contact);

        return acc;
      }, {});

    Object.keys(groupContacts).forEach(key => {
      if (groupContacts[key].length === 0) {
        delete groupContacts[key];
      }
    });

    return groupContacts;
  }
);
