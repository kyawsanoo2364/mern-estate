import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSucces: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSucces,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
