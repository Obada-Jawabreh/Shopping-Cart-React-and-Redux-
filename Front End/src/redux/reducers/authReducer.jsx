import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: null,
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log("Current auth state:", auth); 

      if (!auth.isAuthenticated) {
        return rejectWithValue("User is not authenticated");
      }

      const response = await axios.get("http://localhost:5000/api/users/get", {
        withCredentials: true,
      });

      console.log("User Data Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error fetching user"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login/user",
        formData,
        { withCredentials: true }
      );
      console.log("Login Response:", response.data);
      return response.data; // تأكد أن response.data يحتوي على بيانات المستخدم
    } catch (error) {
      console.log("Login Error:", error);
      return rejectWithValue(error.response?.data?.message || "Error logging in");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register/user",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("User Data Response:", action.payload); // تحقق من البيانات
        state.user = action.payload.user || action.payload; // تحقق من البنية الصحيحة للبيانات
        state.isAuthenticated = !!state.user; // تأكد من تحديث الحالة بناءً على البيانات
      })
      
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching user";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.success = action.payload.message || "Logged in successfully!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error logging in";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error registering user";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
