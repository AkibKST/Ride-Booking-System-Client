import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Admin approve/suspend driver
    approvedSuspendToggle: builder.mutation({
      query: ({ id }) => ({
        url: `/driver/admin-approve/${id}`,
        method: "PATCH",
      }),
    }),

    // Get all drivers
    getDrivers: builder.query({
      query: () => ({
        url: "/driver",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useApprovedSuspendToggleMutation, useGetDriversQuery } =
  driverApi;
