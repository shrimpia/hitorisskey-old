import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../config'
import { Meta } from '../models/meta';
import { Note } from '../models/note';
import { SignInResponse } from '../models/sign-in-response';
import { User } from '../models/User';
import { GetTimelineProp } from './request-properties/get-timeline';
import { SignInProp } from './request-properties/signin';
import { SignUpProp } from './request-properties/signup';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getMeta: builder.query<Meta, void>({
      query: () => ({
				url: 'meta',
				method: 'POST',
			}),
    }),
		signUp: builder.mutation<SignInResponse, SignUpProp>({
			query: (body) => ({
				url: 'signup',
				method: 'POST',
				body,
			})
		}),
		signIn: builder.mutation<SignInResponse, SignInProp>({
			query: (body) => ({
				url: 'signin',
				method: 'POST',
				body,
			})
		}),
		i: builder.query<User, void>({
			query: (body) => ({
				url: 'i',
				method: 'POST',
				body,
			})
		}),
		timeline: builder.query<Note[], GetTimelineProp>({
			query: (body) => ({
				url: 'notes/timeline',
				method: 'POST',
				body,
			})
		}),
		localTimeline: builder.query<Note[], GetTimelineProp>({
			query: (body) => ({
				url: 'notes/local-timeline',
				method: 'POST',
				body,
			})
		}),
  }),
})

export const {
	useGetMetaQuery,
	useIQuery,
	useTimelineQuery,
	useLocalTimelineQuery,
	useSignUpMutation,
	useSignInMutation,
} = api;
