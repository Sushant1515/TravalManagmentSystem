import { createSlice } from "@reduxjs/toolkit";
interface Shift { id: string; type: "Day" | "Night"; }
const shiftsSlice = createSlice({
  name: "shifts",
  initialState: [] as Shift[],
  reducers: {
    setShifts: (_, action) => action.payload
  }
});
export const { setShifts } = shiftsSlice.actions;
export default shiftsSlice.reducer;
