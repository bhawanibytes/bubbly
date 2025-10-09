import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  fullname: string;
  number: string;
  pin: number | null;
  otpStatus: boolean;
  otp: number | null;
  // userId: string;
}
const initialState: InitialState = {
  fullname: "",
  number: "",
  pin: null,
  otpStatus: false,
  otp: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
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
