import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store";
import { login, logout } from "../../store/slices/authSlice"
import { 
  User, 
  Lock, 
  LogOut, 
  Info, 
  UserCircle2, 
  ArrowRight 
} from "lucide-react"

export default function Auth() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && password.trim()) {
      setIsLoading(true)
      // Simulate authentication delay
      setTimeout(() => {
        dispatch(login({ username }))
        setUsername("")
        setPassword("")
        setIsLoading(false)
      }, 800)
    }
  }

  const handleLogout = () => {
    setIsLoading(true)
    // Simulate logout delay
    setTimeout(() => {
      dispatch(logout())
      setIsLoading(false)
    }, 500)
  }

  if (isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 transform transition-all hover:scale-[1.02]">
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Welcome, {user?.username}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ready to tackle your tasks?
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="group bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-pulse">Logging out...</div>
            ) : (
              <>
                <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      <div className="flex items-center mb-6">
        <UserCircle2 className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Task Manager Login
        </h2>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="group">
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all"
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="group">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          {isLoading ? (
            <div className="animate-pulse">Logging in...</div>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center space-x-3">
        <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          This is a simulated login. Any username and password will work.
        </p>
      </div>
    </div>
  )
}