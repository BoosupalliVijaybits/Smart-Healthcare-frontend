import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import backHandler from "../slice/backHandler";
import forgotPassword from "../slice/ForgotPasswordSlice";
import { rtkQueryErrorLogger } from "../../Api/errorLogger";
import { api } from "../../Api/api";
import { healthApi } from "../../Api/formapi";

const store = configureStore({
  reducer: {
    backHandler: backHandler,
    forgotPassword: forgotPassword,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      api.middleware,
      healthApi.middleware,
      rtkQueryErrorLogger
    );
  },
});

export default store;
