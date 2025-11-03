import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add tour mutation
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),

      //for cache invalidation
      invalidatesTags: ["TOUR"],
    }),
    // -------------------------------

    // add tour type mutation
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),

      //for cache invalidation
      invalidatesTags: ["TOUR"],
    }),
    // -------------------------------

    // delete tour type mutation
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),

      //for cache invalidation
      invalidatesTags: ["TOUR"],
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
      providesTags: ["TOUR"],

      //useful for transforming response before using it in the component and filtering essential data which we want
      transformResponse: (response) => response.data,
    }),
    // -------------------------------

    // get all tours query with params for filtering
    getAllTours: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
    // -------------------------------
  }),
});

export const {
  useAddTourMutation,
  useAddTourTypeMutation,
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
  useGetAllToursQuery,
} = tourApi;
