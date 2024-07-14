import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    listUrls: build.query<ListUrlsApiResponse, ListUrlsApiArg>({
      query: () => ({ url: `/api/v1/url` }),
    }),
    createUrl: build.mutation<CreateUrlApiResponse, CreateUrlApiArg>({
      query: queryArg => ({
        url: `/api/v1/url`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deleteUrl: build.mutation<DeleteUrlApiResponse, DeleteUrlApiArg>({
      query: queryArg => ({
        url: `/api/v1/url/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as urlApi }
export type ListUrlsApiResponse = /** status 200 Successful operation */ {
  data: Url[]
}
export type ListUrlsApiArg = void
export type CreateUrlApiResponse = /** status 200 Successful operation */ Url
export type CreateUrlApiArg = {
  /** Create a new short url for a long url */
  body: {
    data: CreateUrl
  }
}
export type DeleteUrlApiResponse = unknown
export type DeleteUrlApiArg = {
  /** ID of short url to delete */
  id: string
}
export type Url = {
  id: number
  longUrl: string
  shortUrl: string
}
export type CreateUrl = {
  longUrl: string
}
export const { useListUrlsQuery, useCreateUrlMutation, useDeleteUrlMutation } =
  injectedRtkApi
