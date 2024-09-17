import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch data (GET)
export const fetchData = createAsyncThunk(
  "entities/fetchData",
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${type}/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to create data (POST)
export const createData = createAsyncThunk(
  "entities/createData",
  async ({ type, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/${type}/create`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to update data (PUT)
export const updateData = createAsyncThunk(
  "entities/updateData",
  async ({ type, id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${type}/edit/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to delete data (DELETE)
export const deleteData = createAsyncThunk(
  "entities/deleteData",
  async ({ type, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/${type}/del/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
