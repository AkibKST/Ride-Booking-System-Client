import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login mutation
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    // -------------------------------

    // logout mutation
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      // Invalidate the USER tag to refetch user info after logout
      invalidatesTags: ["USER"],
    }),
    // -------------------------------

    // register mutation
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    // -------------------------------

    // send OTP mutation
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    // -------------------------------

    // verify OTP mutation
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    // -------------------------------

    // get user info
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      //for automatic refetching of user data
      providesTags: ["USER"],
    }),
    // -------------------------------
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
