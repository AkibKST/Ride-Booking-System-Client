import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add tour mutation
    addRide: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
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
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),

      //for cache invalidation
      invalidatesTags: ["RIDE"],
    }),
    // -------------------------------

    // get tour type query
    getTourTypes: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params: params,
      }),

      //for cache invalidation
      providesTags: ["RIDE"],

      //useful for transforming response before using it in the component and filtering essential data which we want
      transformResponse: (response) => response.data,
    }),
    // -------------------------------

    // get all tours query with params for filtering
    getAllRides: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/ride",
        method: "GET",
        params: params,
      }),
      providesTags: ["RIDE"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
    // -------------------------------
  }),
});

export const {
  useAddRideMutation,
  useAddRideTypeMutation,
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
  useGetAllToursQuery,
} = tourApi;
