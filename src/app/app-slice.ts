import {createSlice} from "@reduxjs/toolkit"


export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
  },
  reducers: (create) => ({
    // подreducer / action creator потому что мы его будем dispatch(ить)
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode // на основании payload меняем state
    }),
  }),
  selectors: {
      selectThemeMode: state => state.themeMode
  },
})
export const appReducer = appSlice.reducer

export const { changeThemeModeAC } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors


export type ThemeMode = "dark" | "light"
