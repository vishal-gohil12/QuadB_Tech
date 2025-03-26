import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task } from "../../types/index";

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
      // Save to localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task: { id: string }) => task.id !== action.payload)
      // Save to localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task: { id: string }) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
        // Save to localStorage
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
      }
    },
    loadTasksFromStorage: (state) => {
      const tasksString = localStorage.getItem("tasks")
      if (tasksString) {
        try {
          state.tasks = JSON.parse(tasksString)
        } catch (error) {
          console.error("Failed to parse tasks from localStorage:", error)
          state.tasks = []
        }
      }
    },
  },
})

export const { addTask, deleteTask, toggleTask, loadTasksFromStorage } = taskSlice.actions
export default taskSlice.reducer

