import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import { fetchWeather } from "../../store/slices/weatherSlice"

export default function WeatherWidget() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.weather)
  const outdoorTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.isOutdoor && !task.completed),
  )

  useEffect(() => {
    // Fetch weather data when component mounts
    dispatch(fetchWeather())

    // Refresh weather data every 30 minutes
    const intervalId = setInterval(
      () => {
        dispatch(fetchWeather())
      },
      30 * 60 * 1000,
    )

    return () => clearInterval(intervalId)
  }, [dispatch])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return (
          <div className="text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        )
      case "clouds":
        return (
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 9.5a5 5 0 0 1 9.7-1.5A3.5 3.5 0 1 1 18 15H5a4 4 0 0 1-.5-8z" />
            </svg>
          </div>
        )
      case "rain":
        return (
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4.5 9.5a5 5 0 0 1 9.7-1.5A3.5 3.5 0 1 1 18 15H5a4 4 0 0 1-.5-8z" />
              <path d="M7 19v2" />
              <path d="M11 19v2" />
              <path d="M15 19v2" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4.5 9.5a5 5 0 0 1 9.7-1.5A3.5 3.5 0 1 1 18 15H5a4 4 0 0 1-.5-8z" />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-16 -mt-16 z-0"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -ml-12 -mb-12 z-0"></div>

      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white relative z-10 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        Weather Forecast
      </h2>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="relative">
            <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
            <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md dark:bg-red-900/50 dark:text-red-200 dark:border-red-600 relative z-10"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">Weather data unavailable</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {data && !loading && !error && (
        <div className="text-center relative z-10">
          <div className="flex justify-center mb-4 transform transition-transform hover:scale-110 duration-300">
            {getWeatherIcon(data.weather[0].main)}
          </div>
          <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{Math.round(data.main.temp)}°C</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 capitalize mb-3">{data.weather[0].description}</p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {data.name}, {data.sys.country}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/80 dark:bg-gray-700/50 p-3 rounded-lg shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-center mb-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{data.main.humidity}%</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-700/50 p-3 rounded-lg shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-center mb-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

      {outdoorTasks.length > 0 && (
        <div className="mt-8 relative z-10">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Outdoor Tasks
          </h3>
          <div className="space-y-3">
            {outdoorTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-white/90 dark:bg-gray-700/50 rounded-lg shadow-sm backdrop-blur-sm border-l-4 border-green-500 transition-transform hover:scale-102 hover:shadow-md"
              >
                <p className="text-gray-800 dark:text-white font-medium">{task.title}</p>
                {data && !loading && !error && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <div className="mr-2 text-blue-500">
                      {data.weather[0].main === "Clear" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : data.weather[0].main === "Clouds" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                        </svg>
                      )}
                    </div>
                    <span>
                      {data.weather[0].description}, {Math.round(data.main.temp)}°C
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

