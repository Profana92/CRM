import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
   value: string;
}

const initialState: CounterState = {
   value: 'Home',
};

export const currentPageTitleSlice = createSlice({
   name: 'currentPageTitle',
   initialState,
   reducers: {
      setPageTitle: (state, action: PayloadAction<string>) => {
         state.value = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setPageTitle } = currentPageTitleSlice.actions;

export default currentPageTitleSlice.reducer;
