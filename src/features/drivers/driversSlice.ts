import { createSlice } from "@reduxjs/toolkit";
interface Driver { id: string; name: string; online: boolean; }
const driversSlice = createSlice({
  name: "drivers",
  initialState: [] as Driver[],
  reducers: {
    setDrivers: (_, action) => action.payload
  }
});
export const { setDrivers } = driversSlice.actions;
export default driversSlice.reducer;
