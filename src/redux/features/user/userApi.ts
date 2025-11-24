import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], Record<string, unknown>>({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params: params,
      }),
      providesTags: ["USER"],
      transformResponse: (response: IResponse<IUser[]>) => response.data,
    }),
    updateUserStatus: builder.mutation<IResponse<IUser>, { id: string; isBlocked: boolean }>({
      query: ({ id, isBlocked }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: { isBlocked },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = userApi;
