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

    // Add Driver
    addDriver: builder.mutation({
      query: (data) => ({
        url: "/driver/createDriverProfile",
        method: "POST",
        data,
      }),
    }),

    // Get current driver profile
    getMyDriverProfile: builder.query({
      query: (userId) => ({
        url: "/driver/myProfile",
        method: "GET",
        params: { userId },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DRIVER"],
    }),
  }),
});

export const {
  useApprovedSuspendToggleMutation,
  useGetDriversQuery,
  useAddDriverMutation,
  useGetMyDriverProfileQuery,
} = driverApi;
