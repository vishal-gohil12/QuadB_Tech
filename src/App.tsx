import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"
import Auth from "./components/Auth/Auth";
import TaskDashboard from "./components/task/task-dashboard";
import { loadUserFromStorage } from "./store/slices/authSlice"
import { loadTasksFromStorage } from "./store/slices/taskSlice"

export default function App() {
  useEffect(() => {
    // Load saved state from localStorage on initial render
    store.dispatch(loadUserFromStorage())
    store.dispatch(loadTasksFromStorage())
  }, [])

  return (
    <Provider store={store}>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
              Enhanced To-Do Application
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A feature-rich task management application with weather integration, priority management, and more.
            </p>
          </header>

          <Auth />
          <TaskDashboard />

          <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Built with React, Redux, and Next.js</p>
          </footer>
        </div>
      </main>
    </Provider>
  )
}

