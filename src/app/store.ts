import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import shiftsReducer from "../features/shifts/shiftsSlice";
import vehiclesReducer from "../features/vehicles/vehiclesSlice";
import driversReducer from "../features/drivers/driversSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    shifts: shiftsReducer,
    vehicles: vehiclesReducer,
    drivers: driversReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
