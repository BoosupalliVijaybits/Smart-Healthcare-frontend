// src/features/api/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  tagTypes: [],
  endpoints: (builder) => ({
    registerPatient: builder.mutation({
      query: (formData) => ({
        url: "/auth/register/patient",
        method: "POST",
        body: formData,
      }),
    }),

    registerDoctor: builder.mutation({
      query: (formData) => ({
        url: "auth/register/doctor",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterPatientMutation, useRegisterDoctorMutation } =
  healthApi;
