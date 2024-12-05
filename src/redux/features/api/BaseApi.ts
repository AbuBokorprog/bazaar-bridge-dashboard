import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';
import { toast } from 'sonner';
import { login, logout } from '../auth-slice/AuthSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://pokeapi.co/api/v2/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  console.log(result);
  if (result?.error) {
    toast.error(result?.error?.data?.message as string);
  }

  // if (result?.error?.status === 400) {
  //   toast.error(result?.error?.data?.message as string);
  // }

  if (result?.error?.status === 401) {
    const res = await fetch('http://localhost:5000/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(login({ user: user, token: data.data?.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => ({
        url: `pokemon/${name}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = baseApi;
