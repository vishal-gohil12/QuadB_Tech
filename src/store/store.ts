import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import taskReducer from "./slices/taskSlice"
import weatherReducer from "./slices/weatherSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/login", "auth/loadUserFromStorage", "tasks/loadTasksFromStorage"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

