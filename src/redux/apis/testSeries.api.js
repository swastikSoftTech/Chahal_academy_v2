import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TAG_TEST_SERIERS} from '../apiTags';
import {
  API_ENDPOINT_TEST_SERIES_ANALYTICS,
  API_ENDPOINT_TEST_SERIES_ANALYTICS_SINGLE,
  API_ENDPOINT_TEST_SERIES_COURSE,
  API_ENDPOINT_TEST_SERIES_COURSE_SUBMODULE,
  API_ENDPOINT_TEST_SERIES_COURSES,
  BASE_URL_STUDENT,
} from '../apiTypes';
import {header} from '../headers';

export const TEST_SERIES_API = createApi({
  reducerPath: 'TEST_SERIES_API',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_STUDENT,
    prepareHeaders: headers => {
      return header(headers);
    },
    // timeout: 5000,
  }),
  tagTypes: [TAG_TEST_SERIERS],
  endpoints: builder => ({
    getTestSeriesCourses: builder.query({
      query: () => API_ENDPOINT_TEST_SERIES_COURSES,
      providesTags: [TAG_TEST_SERIERS],
    }),
    getTestSeriesCourse: builder.query({
      query: id => API_ENDPOINT_TEST_SERIES_COURSE + `/${id}`,
      providesTags: [TAG_TEST_SERIERS],
    }),
    getTestSeriesCourseSubmodule: builder.query({
      query: id => API_ENDPOINT_TEST_SERIES_COURSE_SUBMODULE + `/${id}`,
      providesTags: [TAG_TEST_SERIERS],
    }),
    getTestSeriesResults: builder.query({
      query: query =>
        API_ENDPOINT_TEST_SERIES_ANALYTICS + `/${query.id}/${query.attempt}`,
      providesTags: [TAG_TEST_SERIERS],
    }),
    getTestSeriesSingleResult: builder.query({
      query: query =>
        API_ENDPOINT_TEST_SERIES_ANALYTICS_SINGLE +
        `/${query.id}/${query.attempt}`,
      providesTags: [TAG_TEST_SERIERS],
    }),

    // saveUserEducation: builder.mutation({
    //   query: payload => ({
    //     url: API_ENDPOINT_USER_EDUCATION,
    //     method: 'POST',
    //     body: payload,
    //   }),
    // }),
  }),
});
export const {
  useGetTestSeriesCoursesQuery,
  useLazyGetTestSeriesCoursesQuery,
  useGetTestSeriesCourseQuery,
  useGetTestSeriesCourseSubmoduleQuery,
  useLazyGetTestSeriesResultsQuery,
  useLazyGetTestSeriesSingleResultQuery,
} = TEST_SERIES_API;
