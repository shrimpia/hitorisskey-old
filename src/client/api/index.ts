import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../config'
import { Meta } from '../models/meta';
import { Note } from '../models/note';
import { User } from '../models/User';
import { SignInResponse } from '../models/sign-in-response';
import { ReadTimelineProp } from './request-properties/read-timeline';
import { SignInProp } from './request-properties/signin';
import { SignUpProp } from './request-properties/signup';
import { NotesCreateProp as CreateNoteProp } from './request-properties/create-note';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
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
    readMeta: builder.query<Meta, void>({
      query: () => ({
				url: 'meta',
				method: 'POST',
			}),
    }),
		readI: builder.query<User, void>({
			query: (body) => ({
				url: 'i',
				method: 'POST',
				body,
			})
		}),
		readTimeline: builder.query<Note[], ReadTimelineProp>({
			query: (body) => ({
				url: 'notes/timeline',
				method: 'POST',
				body,
			})
		}),
		readLocalTimeline: builder.query<Note[], ReadTimelineProp>({
			query: (body) => ({
				url: 'notes/local-timeline',
				method: 'POST',
				body,
			})
		}),
		createNote: builder.mutation<Note, CreateNoteProp>({
			query: (body) => ({
				url: 'notes/create',
				method: 'POST',
				body,
			})
		}),
  }),
})

export const {
	useSignUpMutation,
	useSignInMutation,
	useReadMetaQuery,
	useReadIQuery,
	useReadTimelineQuery,
	useReadLocalTimelineQuery,
	useCreateNoteMutation,
} = api;
