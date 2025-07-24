import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    fullname: null,
    number: "",
    pin: null,
    otpStatus: false,
    otp: null,
  },
  reducers: {
    signupFormData: (state, action) => {
      const { fullname, number, pin } = action.payload;
      state.fullname = fullname;
      state.number = number;
      state.pin = pin;
    },
    verifyFormData: (state, action) => {
      state.otp = action.payload.otp;
    },
    otpStatus: (state, action) => {
      state.otpStatus = action.payload.otpStatus;
    },
  },
});

export const { signupFormData, verifyFormData, otpStatus } = authSlice.actions;

export default authSlice.reducer;
