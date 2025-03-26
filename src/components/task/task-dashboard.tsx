import { useSelector } from "react-redux"
import type { RootState } from "../../store/store";
import TaskForm from "./task-form"
import TaskList from "./task-list"
import WeatherWidget from "../../components/weather/WeatherWidget";

export default function TaskDashboard() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-700 dark:text-gray-300">Please login to view and manage your tasks.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TaskForm />
        <TaskList />
      </div>
      <div className="lg:col-span-1">
        <WeatherWidget />
      </div>
    </div>
  )
}

