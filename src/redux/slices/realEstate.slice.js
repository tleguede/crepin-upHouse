import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'realEstate',
  initialState: {
    loading: false,
    error: null,
    selected: null
  },
  reducers: {
    startLoading: state => {
      state.error = null;
      state.loading = true;
    },
    hasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error(action.payload);

    },
    gotSelectedRealEstate: (state, action) => {
      state.error = null;
      state.loading = false;
      state.selected = action.payload;
    }
  }
});

export const { hasError, startLoading, gotSelectedRealEstate } = slice.actions;

const realEstateReducer = slice.reducer;

export default realEstateReducer;