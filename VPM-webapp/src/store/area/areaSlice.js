import { createSlice } from '@reduxjs/toolkit';

export const areaSlice = createSlice({
  name: 'area',
  initialState: {
    areas: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {
    getAreasStart: (state) => {
      state.loading = true;
      state.areas = [];
      state.errorMessage = null;
    },
    getAreasSuccess: (state, { payload }) => {
      state.loading = false;
      state.areas = payload.data;
      state.errorMessage = null;
    },
    getAreasFailure: (state, { payload }) => {
      state.loading = false;
      state.areas = [];
      state.errorMessage = payload.errorMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAreasStart, getAreasSuccess, getAreasFailure } =
  areaSlice.actions;
