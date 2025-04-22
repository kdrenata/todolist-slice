import { createSlice, nanoid } from "@reduxjs/toolkit"
import { appSlice } from "@/app/app-slice.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    // createTodolistAC: create.reducer<{ id: string; title: string }>((state, action) => {
    //   const newTodolist: Todolist = {
    //     id: action.payload.id, // id достаем из payload
    //     title: action.payload.title,
    //     filter: "all",
    //   }
    //   state.push(newTodolist)
    // }),
    createTodolistAC: create.preparedReducer(             // подготавливаем
        (title) => ({
          payload: {title, id: nanoid()},
        }),

        (state, action) => {                              // изменяем
          state.push({...action.payload, filter: "all"})
        },
    ),
  }),
})

export const { deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC } = todolistsSlice.actions
export const todolistsReducer = appSlice.reducer

// export const _todolistsReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(createTodolistAC, (state, action) => {
//       state.push({ ...action.payload, filter: "all" })
//     })
// })
//
// export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
