import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencyState: 0,
  },
  reducers: {
    selectCurrency: (state, action) => {
      state.currencyState = action.payload.currencyState;
    },
  },
});

export const { selectCurrency } = currencySlice.actions;

export default currencySlice.reducer;
