import {createSlice} from "@reduxjs/toolkit"


export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
  },
  reducers: (create) => ({
    // reducer / action creator
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  selectors: {
      selectThemeMode: (state) => state.themeMode
  },
})

export const { changeThemeModeAC } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
