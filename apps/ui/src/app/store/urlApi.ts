import { urlApi as generatedUrlApi } from "./generatedUrlApi"

export const TAG_TYPES = ["Urls"]

export const urlApi = generatedUrlApi.enhanceEndpoints({
  addTagTypes: TAG_TYPES,
  endpoints: {
    listUrls: {
      providesTags: ["Urls"],
    },
    createUrl: {
      invalidatesTags: ["Urls"],
    },
    deleteUrl: {
      invalidatesTags: ["Urls"],
    },
  },
})
