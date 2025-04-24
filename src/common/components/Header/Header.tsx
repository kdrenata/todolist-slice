import {changeThemeModeAC, selectThemeMode} from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  )




  // return (
  //     <AppBar position="static" sx={{ mb: "30px", backgroundColor: "#2196f3" }}>
  //       <Toolbar>
  //         <Container
  //             maxWidth="lg"
  //             sx={{
  //               display: "flex",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //             }}
  //         >
  //           <IconButton
  //               edge="start"
  //               color="inherit"
  //               aria-label="menu"
  //               sx={{ borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.1)" }}
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //
  //           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  //             <NavButton
  //                 sx={{
  //                   backgroundColor: "#42a5f5",
  //                   color: "#fff",
  //                   fontWeight: "bold",
  //                   borderRadius: "8px",
  //                   px: 3,
  //                   boxShadow: 3,
  //                   "&:hover": {
  //                     backgroundColor: "#64b5f6",
  //                   },
  //                 }}
  //             >
  //               Sign In
  //             </NavButton>
  //             <NavButton
  //                 sx={{
  //                   backgroundColor: "#42a5f5",
  //                   color: "#fff",
  //                   fontWeight: "bold",
  //                   borderRadius: "8px",
  //                   px: 3,
  //                   boxShadow: 3,
  //                   "&:hover": {
  //                     backgroundColor: "#64b5f6",
  //                   },
  //                 }}
  //             >
  //               Sign Up
  //             </NavButton>
  //             <NavButton
  //                 sx={{
  //                   backgroundColor: "#2196f3",
  //                   color: "#fff",
  //                   fontWeight: "bold",
  //                   borderRadius: "8px",
  //                   px: 3,
  //                   boxShadow: 3,
  //                   "&:hover": {
  //                     backgroundColor: "#64b5f6",
  //                   },
  //                 }}
  //             >
  //               FAQ
  //             </NavButton>
  //             <Switch color="default" onChange={changeMode} />
  //           </Box>
  //         </Container>
  //       </Toolbar>
  //     </AppBar>
  // )


}
