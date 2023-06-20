import { createSlice } from '@reduxjs/toolkit';

export const subareaSlice = createSlice({
  name: 'subarea',
  initialState: {
    subareas: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {
    getSubareasStart: (state) => {
      state.loading = true;
      state.subareas = [];
      state.errorMessage = null;
    },
    getSubareasSuccess: (state, { payload }) => {
      state.loading = false;
      state.subareas = payload.data;
      state.errorMessage = null;
    },
    getSubareasFailure: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
      state.subareas = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSubareasStart, getSubareasSuccess, getSubareasFailure } =
  subareaSlice.actions;
