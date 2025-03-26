import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload))
      localStorage.setItem("isAuthenticated", "true")
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null

      // Clear from localStorage
      localStorage.removeItem("user")
      localStorage.removeItem("isAuthenticated")
    },
    loadUserFromStorage: (state) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
      const userString = localStorage.getItem("user")

      if (isAuthenticated && userString) {
        try {
          const user = JSON.parse(userString)
          state.isAuthenticated = true
          state.user = user
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error)
          state.isAuthenticated = false
          state.user = null
        }
      }
    },
  },
})

export const { login, logout, loadUserFromStorage } = authSlice.actions
export default authSlice.reducer

