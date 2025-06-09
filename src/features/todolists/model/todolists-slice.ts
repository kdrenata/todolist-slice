import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    // fetchTodolistsAC: create.reducer<{ todolists: Todolist[] }>((_state, action) => {
    //   // 5
    //   // return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all" }))
    // }),

    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
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
      // подготавливаем , в первом callback мы генерируем payload, собираем данные как мы хотим
      (title: string) => ({
        payload: { title, id: nanoid() },
      }),

      (state, action) => {
        // изменяем state, во втором callback находится подредьюсер
        const newTodolist: DomainTodolist = {
          ...action.payload,
          filter: "all",
          order: 1,
          addedDate: "",
        }
        state.push(newTodolist)
      },
    ),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder)=> {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_state, action)=> {
      return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all" }))
    })
      .addCase(fetchTodolistsTC.rejected, ()=> {
      // alert(action.payload.message)
    })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action)=> {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
    })
  }
})
export const todolistsReducer = todolistsSlice.reducer
export const { deleteTodolistAC, changeTodolistFilterAC, createTodolistAC } =
  todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

// Thunk
export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_arg, { rejectWithValue }) => {
    // 2 side effect
    try {
      const res = await todolistsApi.getTodolists()
      // 4 dispatch actions
      // dispatch(fetchTodolistsAC({ todolists: res.data }))
      return {todolists: res.data}
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// Thunk
export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string}, { rejectWithValue }) => {
    // 2 side effect
    try {
      await todolistsApi.changeTodolistTitle(args)
      // 4 dispatch actions
      // dispatch(fetchTodolistsAC({ todolists: res.data }))
      return args
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"


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
