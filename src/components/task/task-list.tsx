import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store";
import { deleteTask, toggleTask } from "../../store/slices/taskSlice";
import type { Task } from "../../types/index";

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const dispatch = useDispatch()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 dark:border-red-800"
      case "medium":
        return "border-yellow-200 dark:border-yellow-800"
      case "low":
        return "border-green-200 dark:border-green-800"
      default:
        return "border-gray-200 dark:border-gray-700"
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
        <div className="flex justify-center mb-4 text-gray-400 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">No tasks yet</p>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Add a task to get started with your day!</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Your Tasks
      </h2>
      <div className="space-y-4">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className={`p-5 rounded-lg border-l-4 ${getPriorityBorder(task.priority)} bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 ${
              task.completed ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="pt-0.5">
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch(toggleTask(task.id))}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {task.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </label>
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-white"}`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`mt-1 text-sm ${task.completed ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"}`}
                    >
                      {task.description}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    {task.isOutdoor && (
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Outdoor
                      </span>
                    )}
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

