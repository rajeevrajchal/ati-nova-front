/* eslint-disable react-hooks/rules-of-hooks */
import useAxios from "@/plugins/call.axios";
import { METHOD } from "@/types/axios-get";
import {
  FORGET_PASSWORD,
  LOGIN_TYPE,
  RESET_PASSWORD,
} from "../types/auth.type";

const AuthService = {
  login: (payload: LOGIN_TYPE) =>
    useAxios({
      url: `login`,
      method: METHOD.POST,
      data: payload,
    }),
  logout: () =>
    useAxios({
      url: `logout`,
      method: METHOD.POST,
    }),
  whoIAM: () =>
    useAxios({
      url: `who-i-am`,
      method: METHOD.GET,
    }),
  forgetPassword: (email: string) =>
    useAxios({
      url: "forget-password",
      method: METHOD.POST,
      data: {
        email,
      },
    }),
  forgetPasswordWithOtp: (payload: FORGET_PASSWORD) =>
    useAxios({
      url: "forget-password-otp",
      method: METHOD.POST,
      data: payload,
    }),
  resetPassword: (payload: RESET_PASSWORD) =>
    useAxios({
      url: "reset-password",
      method: METHOD.POST,
      data: payload,
    }),
  google: () =>
    useAxios({
      url: "google/login",
      method: METHOD.POST,
    }),
};

export default AuthService;
