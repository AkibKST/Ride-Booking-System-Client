import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRide, ITourPackage } from "@/types";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add ride mutation
    addRideRequest: builder.mutation({
      query: (rideData) => ({
        url: "/ride/request",
        method: "POST",
        data: rideData,
      }),

      //for cache invalidation
      invalidatesTags: ["RIDE"],
    }),

    // cancel ride mutation
    cancelRide: builder.mutation<IRide, string>({
      query: (rideId) => ({
        url: `/ride/cancel/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),
    // -------------------------------
    // -------------------------------

    // add tour type mutation
    addRideType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),

      //for cache invalidation
      invalidatesTags: ["RIDE"],
    }),
    // -------------------------------

    // delete tour type mutation
    // removeTourType: builder.mutation({
    //   query: (tourTypeId) => ({
    //     url: `/tour/tour-types/${tourTypeId}`,
    //     method: "DELETE",
    //   }),

    //   //for cache invalidation
    //   invalidatesTags: ["RIDE"],
    // }),
    // -------------------------------

    // get tour type query
    // getTourTypes: builder.query({
    //   query: (params) => ({
    //     url: "/tour/tour-types",
    //     method: "GET",
    //     params: params,
    //   }),

    //   //for cache invalidation
    //   providesTags: ["TOUR"],

    //   //useful for transforming response before using it in the component and filtering essential data which we want
    //   transformResponse: (response) => response.data,
    // }),
    // -------------------------------

    // get all tours query with params for filtering
    getAllRides: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/all-ride",
        method: "GET",
        params: params,
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
    // -------------------------------

    // get single ride query
    getRide: builder.query<IRide, string>({
      query: (id) => ({
        url: `/ride/singleRide/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: IResponse<IRide>) => response.data,
    }),
    // -------------------------------

    // get rides with status filter (for driver incoming requests)
    getRequestedRides: builder.query({
      query: () => ({
        url: "/ride",
        method: "GET",
        params: { status: "requested" },
      }),
      providesTags: ["RIDE"],
      transformResponse: (response) => response.data,
    }),
    // -------------------------------

    // accept ride mutation (driver accepts a ride request)
    acceptRide: builder.mutation<IRide, string>({
      query: (rideId) => ({
        url: `/driver/ride/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
      transformResponse: (response: IResponse<IRide>) => response.data,
    }),
    // -------------------------------

    // reject ride mutation (driver rejects a ride request)
    rejectRide: builder.mutation<IRide, string>({
      query: (rideId) => ({
        url: `/ride/reject/${rideId}`,
        method: "POST",
      }),
      invalidatesTags: ["RIDE"],
      transformResponse: (response: IResponse<IRide>) => response.data,
    }),
    // -------------------------------

    // update ride status mutation (driver updates ride status)
    updateRideStatus: builder.mutation<
      IRide,
      { rideId: string; status: string }
    >({
      query: ({ rideId, status }) => ({
        url: `/driver/update-ride-status/${rideId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDE"],
      transformResponse: (response: IResponse<IRide>) => response.data,
    }),
    // -------------------------------

    // get active ride query (driver's current active ride)
    getActiveRide: builder.query<IRide | null, void>({
      query: () => ({
        url: "/ride/active",
        method: "GET",
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: IResponse<IRide | null>) => response.data,
    }),
    // -------------------------------

    // get ride history query (user's completed/cancelled rides)
    getRideHistory: builder.query<IRide[], { status?: string }>({
      query: (params) => ({
        url: "/ride/history",
        method: "GET",
        params: params,
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: IResponse<IRide[]>) => response.data,
    }),
    // -------------------------------

    // initiate payment mutation (SSL Commerz payment initiation)
    initiatePayment: builder.mutation<{ paymentUrl: string }, string>({
      query: (rideId) => ({
        url: `/payment/initiate`,
        method: "POST",
        data: { rideId },
      }),
      transformResponse: (response: IResponse<{ paymentUrl: string }>) =>
        response.data,
    }),
    // -------------------------------
  }),
});

export const {
  useAddRideRequestMutation,
  useCancelRideMutation,
  useAddRideTypeMutation,
  useGetAllRidesQuery,
  useGetRideQuery,
  useGetRequestedRidesQuery,
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
  useGetActiveRideQuery,
  useGetRideHistoryQuery,
  useInitiatePaymentMutation,
} = rideApi;
