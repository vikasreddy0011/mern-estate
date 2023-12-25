import { createSlice,nanoid } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    test : "This is test",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false;
            state.error = null;
            state.test = "This is test" ;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;