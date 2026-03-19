import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complainsList: [],
    loading: false,
    error: null,
    response: null,
};

const complainSlice = createSlice({
    name: 'complain',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.complainsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createRequest: (state) => {
            state.loading = true;
        },
        createSuccess: (state) => {
            state.loading = false;
            state.response = "Complaint submitted successfully!";
            state.error = null;
        },
        createFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        createError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});


export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    createRequest,
    createSuccess,
    createFailed,
    createError
} = complainSlice.actions;


export const complainReducer = complainSlice.reducer;