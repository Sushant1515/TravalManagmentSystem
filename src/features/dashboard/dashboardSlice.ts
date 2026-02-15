import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  activeTrips: number;
  totalTrips: number;
  driversOnline: number;
}

const initialState: DashboardState = {
  activeTrips: 0,
  totalTrips: 0,
  driversOnline: 0
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateKPIs(state, action) {
      return action.payload;
    }
  }
});

export const { updateKPIs } = dashboardSlice.actions;
export default dashboardSlice.reducer;
