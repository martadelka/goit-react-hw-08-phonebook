// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const contactsApi = createApi({
//   reducerPath: 'contactsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://656b8c6bdac3630cf72836dd.mockapi.io/api/v3',
//   }),

//   endpoints: builder => ({
//     getContacts: builder.query({
//       query: () => `/contacts`,
//       providesTags: ['contacts'],
//     }),
//     getFilter: builder.query({
//       query: (name = '') => `/contacts${name ? `?name=${name}` : ''}`,
//       providesTags: ['contacts'],
//     }),

//     addContactToFilter: builder.mutation({
//       query: body => ({
//         url: '/contacts',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['contacts'],
//     }),
//     deleteContactFromFilter: builder.mutation({
//       query: id => ({
//         url: `/contacts/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['contacts'],
//     }),
//   }),
// });

// export const {
//   useGetContactsQuery,
//   useGetFilterQuery,
//   useAddContactToFilterMutation,
//   useDeleteContactFromFilterMutation,
// } = contactsApi;