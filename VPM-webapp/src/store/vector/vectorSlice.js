import { createSlice } from '@reduxjs/toolkit';

export const vectorSlice = createSlice({
  name: 'vector',
  initialState: {
    status: 'uploaded',
    uid: null,
    vector: null,
    username: null,
    area: null,
    subarea: null,
    activity: null,
    criteria: null,
    availabulity: null,
    powerinput: null,
    airvelocity: null,
    aream2: null,
    fixq: null,
    position: null,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
});

export const { increment } = vectorSlice.actions;
