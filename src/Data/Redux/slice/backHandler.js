import { createSlice } from "@reduxjs/toolkit";

const backHandler = createSlice({
  name: "backHandler",
  initialState: false,
  reducers: {
    saveBackHandler: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveBackHandler } = backHandler.actions;
export default backHandler.reducer;
