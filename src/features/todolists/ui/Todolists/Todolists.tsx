import {useAppDispatch, useAppSelector} from "@/common/hooks"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import {useEffect} from "react";
import {fetchTodolistsTC, selectTodolists} from "@/features/todolists/model/todolists-slice.ts";

export const Todolists = () => {
  // 6  здесь получаем тудулисты
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // 1 ui
    dispatch(fetchTodolistsTC())  // отсюда берем тудулисты диспатчим санку

  }, [])



  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
