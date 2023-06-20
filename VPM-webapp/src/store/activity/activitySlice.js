import { createSlice } from '@reduxjs/toolkit';

export const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activitys: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {
    getActivityStart: (state) => {
      state.loading = true;
      state.activitys = [];
      state.errorMessage = null;
    },
    getActivitySuccess: (state, { payload }) => {
      state.loading = false;
      state.activitys = payload.data;
      state.errorMessage = null;
    },

    getActivityFailure: (state, { payload }) => {
      state.loading = false;
      state.activitys = [];
      state.errorMessage = payload.errorMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getActivityStart, getActivitySuccess, getActivityFailure } =
  activitySlice.actions;
