import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRide, ITourPackage } from "@/types";

export const tourApi = baseApi.injectEndpoints({
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
  }),
});

export const {
  useAddRideRequestMutation,
  useAddRideTypeMutation,
  useGetAllRidesQuery,
  useGetRideQuery,
} = tourApi;
