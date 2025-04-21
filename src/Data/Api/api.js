import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./const";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      console.log("endpoint:", endpoint);
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  refetchOnMountOrArgChange: true,
  tagTypes: [],
  endpoints: (builder) => ({
    // Pationt Register
    pationtregister: builder.mutation({
      query: (payload) => ({
        url: URL.PATIONT_REGISTER,
        method: "POST",
        body: payload,
      }),
    }),

    //  Doctor Register
    doctorregister: builder.mutation({
      query: (payload) => ({
        url: URL.DOCTOR_REGISTER,
        method: "POST",
        body: payload,
      }),
    }),

    //  Contactus
    contactus: builder.mutation({
      query: (payload) => ({
        url: URL.CONTACT,
        method: "POST",
        body: payload,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: URL.LOGOUT,
        method: "POST",
      }),
    }),

    // Forgot Password
    forgotpassword: builder.mutation({
      query: (payload) => ({
        url: URL.FORGOT_PASSWORD,
        method: "POST",
        body: payload,
      }),
    }),

    //Time slots
    doctortimeslot: builder.mutation({
      query: (payload) => ({
        url: URL.DOCTOR_TIME_SLOT,
        method: "POST",
        body: payload,
      }),
    }),

    //Appoinment book
    book_appoinment: builder.mutation({
      query: (payload) => ({
        url: URL.BOOK_APPOINMENT,
        method: "POST",
        body: payload,
      }),
    }),

    //Priscribe App
    priscribe_add: builder.mutation({
      query: (payload) => ({
        url: URL.PRISCRIBE_ADD,
        method: "POST",
        body: payload,
      }),
    }),

    //Review post
    review_post: builder.mutation({
      query: (payload) => ({
        url: URL.REVIEW_POST,
        method: "POST",
        body: payload,
      }),
    }),

    //Doctor Profile Update
    doctor_profile_update: builder.mutation({
      query: (payload) => ({
        url: URL.DOCTOR_UPDATE,
        method: "PUT",
        body: payload,
      }),
    }),

    //Patient Profile Update
    patient_profile_update: builder.mutation({
      query: (payload) => ({
        url: URL.PATIENT_UPDATE,
        method: "PUT",
        body: payload,
      }),
    }),

    // Reset Password
    resetpassword: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${URL.RESET_PASSWORD}${token}&newPassword=${payload?.newPassword}`,
        method: "POST",
        body: payload,
      }),
    }),

    //All Doctors
    alldoctors: builder.query({
      query: () => ({
        url: URL.ALL_DOCTORS,
        method: "GET",
      }),
    }),

    //All Doctors time slote
    alldoctorstimeslote: builder.query({
      query: (id) => ({
        url: `${URL.DOCTOR_FULL_SLOTE}/${id}`,
        method: "GET",
      }),
    }),

    //Get Doctor by Status
    doctorgetbystatus: builder.query({
      query: (status) => ({
        url: `${URL.ALL_DOCTORS}?doctorStatus=${status}`,
        method: "GET",
      }),
    }),

    //Upcomming Appoinments
    upcomming_appoinments: builder.query({
      query: () => ({
        url: URL.UPCOMMING_APPOINMENTS,
        method: "GET",
      }),
    }),

    //Today Appoinments
    today_appoinments: builder.query({
      query: () => ({
        url: URL.APPOINMENTS,
        method: "GET",
      }),
    }),

    //Doctor View
    doctorView: builder.query({
      query: (id) => ({
        url: URL.ALL_DOCTORS + `/${id}`,
        method: "GET",
      }),
    }),

    patientpriscribeview: builder.query({
      query: (id) => ({
        url: URL.GET_PRISCRIBE + `${id}`,
        method: "GET",
      }),
    }),

    //Patient View
    patientView: builder.query({
      query: (id) => ({
        url: URL.GET_PATIENT + `${id}`,
        method: "GET",
      }),
    }),

    //Review View
    getreviwe: builder.query({
      query: (id) => ({
        url: URL.GET_REVIEW + `/${id}`,
        method: "GET",
      }),
    }),

    //Timeslots View
    gettimeslotsView: builder.query({
      query: ({ id, date }) => ({
        url: URL.GET_TIME_SLOAT + `/${id}/date/${date}`,
        method: "GET",
      }),
    }),

    // Accept Doctor
    acceptdoctor: builder.mutation({
      query: (id) => ({
        url: `${URL.DOCTOR_ACCEPT}${id}`,
        method: "PUT",
      }),
    }),

    notificationread: builder.mutation({
      query: (id) => ({
        url: `${URL.NOTIFICATION_READ}/${id}/read`,
        method: "PUT",
      }),
    }),

    // AcRejectcept Doctor
    rejectdoctor: builder.mutation({
      query: (id) => ({
        url: `${URL.DOCTOR_REJECT}${id}`,
        method: "PUT",
      }),
    }),

    // All Patient
    allpatients: builder.query({
      query: () => ({
        url: URL.ALL_PATIENT,
        method: "GET",
      }),
    }),

    //Patientupcomingapp
    patientsupcommingapp: builder.query({
      query: () => ({
        url: URL.PA_UPCOMMING_APP,
        method: "GET",
      }),
    }),

    // Profile View
    profileView: builder.query({
      query: () => ({
        url: URL.PROFILE_VIEW,
        method: "GET",
      }),
    }),

    // Get Notificationd
    getnotification: builder.query({
      query: () => ({
        url: URL.ALL_NOTIFICATION,
        method: "GET",
      }),
    }),

    // Doctor Delete
    doctorDelete: builder.mutation({
      query: (id) => ({
        url: `${URL.ALL_DOCTORS}/${id}`,
        method: "DELETE",
      }),
    }),

    // appoinment Delete
    cancelappoinment: builder.mutation({
      query: (id) => ({
        url: `${URL.CANCEL_APPOINMENT}${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePationtregisterMutation,
  useLoginMutation,
  useDoctorregisterMutation,
  useLogoutMutation,
  useLazyAlldoctorsQuery,
  useLazyDoctorViewQuery,
  useAcceptdoctorMutation,
  useRejectdoctorMutation,
  useLazyAllpatientsQuery,
  useDoctorDeleteMutation,
  useLazyProfileViewQuery,
  useLazyGetnotificationQuery,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useDoctortimeslotMutation,
  useLazyGettimeslotsViewQuery,
  useDoctor_profile_updateMutation,
  usePatient_profile_updateMutation,
  useBook_appoinmentMutation,
  useLazyUpcomming_appoinmentsQuery,
  useLazyDoctorgetbystatusQuery,
  useNotificationreadMutation,
  useLazyAlldoctorstimesloteQuery,
  useLazyToday_appoinmentsQuery,
  useLazyPatientViewQuery,
  usePriscribe_addMutation,
  useLazyPatientpriscribeviewQuery,
  useLazyPatientsupcommingappQuery,
  useCancelappoinmentMutation,
  useLazyGetreviweQuery,
  useReview_postMutation,
  useContactusMutation,
} = api;
