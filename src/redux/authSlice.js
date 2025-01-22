// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    },
    login(state, action) {
      
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, login, clearUser } = authSlice.actions;
export default authSlice.reducer;
