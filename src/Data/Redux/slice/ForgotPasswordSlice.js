import { createSlice } from "@reduxjs/toolkit";

const forgotPassword = createSlice({
  name: "forgotPassword",
  initialState: null,
  reducers: {
    saveForgotPassword: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveForgotPassword } = forgotPassword.actions;
export default forgotPassword.reducer;
