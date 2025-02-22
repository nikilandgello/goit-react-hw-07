import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://67b710bd2bddacfb270d7fb6.mockapi.io/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await axios.get('/contacts');
      return contacts.data;
    } catch (error) {
      toast.error('Oops... something went wrong');

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      toast.success(`Contact deleted successfully.`);
      return id;
    } catch (error) {
      toast.error('Oops... something went wrong');

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      const contact = await axios.post('/contacts', body);
      toast.success(`${contact.data.firstname} added successfully`);
      return contact.data;
    } catch (error) {
      toast.error('Oops... something went wrong');

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (body, thunkAPI) => {
    try {
      const contact = await axios.put(`/contacts/${body.id}`, body);
      toast.success(`${contact.data.firstname} updated successfully`);

      return contact.data;
    } catch (error) {
      toast.error('Oops... something went wrong');

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
