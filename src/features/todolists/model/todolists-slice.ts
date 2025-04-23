import { createSlice, nanoid } from "@reduxjs/toolkit"
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    fetchTodolistsAC: create.reducer<{ todolists: Todolist[] }>((_state, action) => {
      return action.payload.todolists.map((todolist)=>{
        return {...todolist, filter: 'all'}
      })
    }),

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

    // todolists/createTodolistAC     //это когда action сфoрмируется в redux-toolkit такое будет имя
    createTodolistAC: create.preparedReducer(
      // подготавливаем
      (title: string) => ({
        payload: { title, id: nanoid(), },
      }),

      (state, action) => {
        // изменяем
        const newTodolist: DomainTodolist = {
          ...action.payload,
          filter: "all",
          order: 1,
          addedDate: ''
        }
        state.push(newTodolist)
      },
    ),
  }),
  selectors: {
    selectTodolists : (state) => state,
  },
})

export const { deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, fetchTodolistsAC } = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

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

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
