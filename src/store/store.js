import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from "../reducers/payment/paymentSlice"

const store = configureStore({
  reducer: {
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});


export default store;
