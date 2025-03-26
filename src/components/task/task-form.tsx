import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { addTask } from "../../store/slices/taskSlice";

type Priority = "low" | "medium" | "high"

export default function TaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [isOutdoor, setIsOutdoor] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        priority,
        isOutdoor,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      dispatch(addTask(newTask))
      setTitle("")
      setDescription("")
      setPriority("medium")
      setIsOutdoor(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full -mr-20 -mt-20 z-0"></div>

      <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white relative z-10 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="group">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-focus-within:text-blue-500 transition-colors"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="group">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group-focus-within:text-blue-500 transition-colors"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            placeholder="Add some details about this task..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
          <div className="flex space-x-4">
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="radio"
                name="priority"
                checked={priority === "low"}
                onChange={() => setPriority("low")}
                className="sr-only"
              />
              <div
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  priority === "low"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Low
              </div>
            </label>

            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="radio"
                name="priority"
                checked={priority === "medium"}
                onChange={() => setPriority("medium")}
                className="sr-only"
              />
              <div
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  priority === "medium"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Medium
              </div>
            </label>

            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="radio"
                name="priority"
                checked={priority === "high"}
                onChange={() => setPriority("high")}
                className="sr-only"
              />
              <div
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  priority === "high"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                High
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="inline-flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={isOutdoor}
                onChange={() => setIsOutdoor(!isOutdoor)}
                className="sr-only"
              />
              <div
                className={`w-10 h-5 rounded-full transition-all ${isOutdoor ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-all ${isOutdoor ? "translate-x-5" : ""}`}
                ></div>
              </div>
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">This is an outdoor activity</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2.5 px-4 rounded-lg transition-all duration-200 font-medium flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Task
        </button>
      </form>
    </div>
  )
}

