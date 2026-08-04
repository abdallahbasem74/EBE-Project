import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type Theme = 'light' | 'dark';

interface ThemeState {
  value: Theme;
}

const initialState: ThemeState = {
  value: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.value;
export default themeSlice.reducer;