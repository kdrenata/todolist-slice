import {createSlice, nanoid} from "@reduxjs/toolkit"
import { deleteTodolistAC } from "./todolists-slice.ts"
import { createTodolistAC } from "@/features/todolists/model/todolists-slice.ts"



export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: Task = { title: action.payload.title, isDone: false, id: nanoid() }
      state[action.payload.todolistId].unshift(newTask)
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
    // ❌ tasks/createTodolistAC      //это когда action сфoрмируется в redux-toolkit такое будет имя
    // createTodolistAC: create.reducer((state, action)=> {
    //
    // }),
  }),
  extraReducers: (builder) => {
    // ✅ todolists/createTodolistAC
    builder
      .addCase(createTodolistAC, (state, action) => {   // то что в колбэк ф - это классическмй редьюсер

        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
})
export const tasksReducer = tasksSlice.reducer
export const {deleteTaskAC, changeTaskTitleAC, changeTaskStatusAC, createTaskAC} = tasksSlice.actions




export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>







//
// export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
// export const createTaskAC = createAction<{ todolistId: string; title: string }>("tasks/createTask")
// export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
//   "tasks/changeTaskStatus",
// )
// export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; title: string }>(
//   "tasks/changeTaskTitle",
// )
