import { useState } from "react"
import {
  useCreateUrlMutation,
  useDeleteUrlMutation,
  useListUrlsQuery,
} from "../../app/store/urlApi"
import type { Url } from "../../app/store/urlApi"
import { XCircleIcon } from "@heroicons/react/20/solid"

export const Index = () => {
  const { isLoading: isLoadingUrls, data: urlsResponse } = useListUrlsQuery()
  const [createUrl, createResult] = useCreateUrlMutation()
  const [deleteUrl, deleteResult] = useDeleteUrlMutation()
  const [longUrl, setLongUrl] = useState("")

  return (
    <div>
      <div className="bg-white py-16 sm:py-24">
        <div className="relative sm:py-16">
          <div aria-hidden="true" className="hidden sm:block">
            <div className="inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
            <svg
              className="absolute top-8 left-1/2 -ml-3"
              width="404"
              height="392"
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
              />
            </svg>
          </div>
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 1463 360"
                >
                  <path
                    className="text-indigo-500 text-opacity-40"
                    fill="currentColor"
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                  />
                  <path
                    className="text-indigo-700 text-opacity-40"
                    fill="currentColor"
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Enter a long URL to make it short
                  </h2>
                  <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                    URLs must start with http:// or https://
                  </p>
                </div>

                {createResult.error && (
                  <div className="rounded-md bg-red-50 p-4 mt-12">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-red-400"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          There were {createResult.error.data.length} errors
                          with your submission
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <ul role="list" className="list-disc space-y-1 pl-5">
                            {createResult.error.data.errors.map(
                              (error: any) => (
                                <li key={error.message}>{error.message}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form
                  id="url-shortener-form"
                  className="mt-12 sm:mx-auto sm:max-w-lg"
                  onSubmit={async event => {
                    event.preventDefault()

                    try {
                      await createUrl({
                        body: { data: { longUrl } },
                      })
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                >
                  <div className="sm:flex mt-3">
                    <div className="min-w-0 flex-1">
                      <div className="mt-2">
                        <input
                          type="text"
                          name="longUrl"
                          id="longUrl"
                          onChange={e => {
                            setLongUrl(e.target.value)
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Enter a long URL"
                          aria-describedby="long-url"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-2 ml-2">
                      <button
                        type="submit"
                        className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                      >
                        Shorten
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          URL
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          To
                        </th>

                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Go</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoadingUrls ? (
                        urlsResponse?.data?.map((url: Url, index: number) => (
                          <tr
                            key={url.id}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {url.shortUrl}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {url.longUrl}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                              <a
                                href={url.longUrl}
                                className="text-indigo-600 hover:text-indigo-900"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                              >
                                Go
                              </a>
                            </td>
                            <td>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => {
                                  deleteUrl({ id: url.id })
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>Loading...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
