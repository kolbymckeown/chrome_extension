import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {} as any;

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<any>) => ({
			...action.payload,
		}),
		resetUser: () => {
			return initialState;
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;

export const selectUser = (state: { user: any }) => state.user;

export default userSlice.reducer;
