export interface SignupBody {
  fullname: string;
  number: string;
  pin: string;
}

export interface VerifySignupBody {
  number: string;
  otp: string;
}

export interface LoginBody {
  number: string;
  pin: string;
}

export interface ForgetPinBody {
  number: string;
}

export interface VerifyForgetPinBody {
  number: string;
  userOtp: string;
}

export interface SetPinBody {
  number: string;
  userPin: string;
}
