import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'realEstate',
  initialState: {
    init: false,
    loading: false,
    error: null,
    selected: null,
    list: [],
    cursor: null,
    filter: null,
    hasMore: false
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
    },

    gotList: (state, action) => {
      state.init = true;
      state.error = null;
      state.loading = false;
      state.filter = action.payload?.filter;
      state.list = action.payload?.list;
      state.cursor = action.payload?.cursor;
      state.hasMore = action.payload?.hasMore;
    }

  }
});

export const { hasError, startLoading, gotSelectedRealEstate, gotList } = slice.actions;

const realEstateReducer = slice.reducer;

export default realEstateReducer;