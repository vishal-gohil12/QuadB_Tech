# Enhanced Todo Application

A feature-rich Todo application built with React, Redux Toolkit, and TypeScript. This application goes beyond basic task management by incorporating weather data, task prioritization, and user authentication.

## Features

- **User Authentication**
  - Simple email/password login system
  - Persistent authentication state
  - Protected routes for authenticated users

- **Task Management**
  - Add, edit, and delete tasks
  - Mark tasks as complete/incomplete
  - Task prioritization (Low, Medium, High)
  - Outdoor activity indicator
  - Persistent storage of tasks

- **Weather Integration**
  - Real-time weather updates
  - Weather information for outdoor tasks
  - Automatic updates every 5 minutes

- **Modern UI/UX**
  - Responsive, mobile-first design
  - Clean and intuitive interface
  - Visual feedback for user actions
  - Loading states and error handling

## Technical Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Toastify for notifications
- Lucide React for icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided local server URL

## Usage

1. **Login**
   - Use any email and password combination to log in
   - Authentication state persists across page reloads

2. **Managing Tasks**
   - Click the "Add Task" button to create a new task
   - Set priority level and outdoor activity status
   - Use checkboxes to mark tasks as complete
   - Delete tasks using the trash icon
   - Change task priority using the dropdown

3. **Weather Integration**
   - Weather information automatically updates
   - Outdoor tasks display current weather conditions
   - Weather widget shows temperature and conditions

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── LoginForm.tsx
│   ├── Todo/
│   │   ├── AddTask.tsx
│   │   └── TaskList.tsx
│   └── Weather/
│       └── WeatherWidget.tsx
├── store/
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── todoSlice.ts
│       └── weatherSlice.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Development

- The application uses Redux Toolkit for state management
- Authentication is simulated (no backend required)
- Weather data is currently mocked but can be easily integrated with a real API
- Tasks are stored in Redux state and persist in localStorage

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request