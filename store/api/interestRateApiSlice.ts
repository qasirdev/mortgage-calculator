import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

// Define the base URL for the Bank of England's website
const baseURL = 'https://www.bankofengland.co.uk/boeapps/iadb/';
//@ts-ignore
const fetchCsvBaseQuery: BaseQueryFn<string | null, unknown, string> = async (url, _args, _options, _fetchFn) => {
  const response = await fetch(url);
  const text = await response.text();
  return { data: text };
};

export const interestRateApiSlice = createApi({
  reducerPath: 'interestRateApiSlice',
  baseQuery: fetchCsvBaseQuery,
  endpoints: (builder) => ({
    getInterestRates: builder.query({
      query: (params) => `${baseURL}fromshowcolumns.asp?${params}&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`,
    }),
  }),
});

export const { useGetInterestRatesQuery } = interestRateApiSlice;
