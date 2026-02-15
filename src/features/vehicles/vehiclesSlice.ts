import { createSlice } from "@reduxjs/toolkit";
interface Vehicle { id: string; status: string; }
const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: [] as Vehicle[],
  reducers: {
    setVehicles: (_, action) => action.payload
  }
});
export const { setVehicles } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
