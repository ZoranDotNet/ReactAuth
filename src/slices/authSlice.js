import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	role: "",
	accessToken: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload.user;
			state.role = action.payload.role;
			state.accessToken = action.payload.accessToken;
		},
		clearAuth: (state) => {
			state.user = null;
			state.role = "";
			state.accessToken = "";
		},
	},
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
