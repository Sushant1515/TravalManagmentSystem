import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: "Admin" | "Vendor" | "Driver" | "Client" | null;
}

const initialState: AuthState = {
  token: null,
  role: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout(state) {
      state.token = null;
      state.role = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
