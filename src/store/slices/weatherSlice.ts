import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
  }>
  wind: {
    speed: string
  }
  name: string
  sys: {
    country: string
  }
}

interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
}

// Replace the entire fetchWeather thunk with this improved version
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (_, { rejectWithValue }) => {
  try {
    // For demo purposes, we'll return mock data since we don't want to rely on API keys
    // In a real application, you would use a proper API key and fetch real data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return mock weather data
    return {
      main: {
        temp: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30°C
        humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-80%
      },
      weather: [
        {
          main: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)], // Random weather condition
          description: ["clear sky", "scattered clouds", "light rain"][Math.floor(Math.random() * 3)],
        },
      ],
      wind: {
        speed: (Math.random() * 5 + 1).toFixed(1), // Random wind speed between 1-6 m/s
      },
      name: "New York",
      sys: {
        country: "US",
      },
    }
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default weatherSlice.reducer

