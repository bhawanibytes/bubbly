import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    value: {
      fullname: "",
      number: "",
      pin: "",
    },
  },
  reducers: {
    setFormData: (state, action) => {
      const { fullname, number, pin } = action.payload;
      state.value.fullname = fullname;
      state.value.number = number;
      state.value.pin = pin;
    },
  },
});

export const { setFormData } = signupSlice.actions;

export default signupSlice.reducer;
