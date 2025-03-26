export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  isOutdoor: boolean
  completed: boolean
  createdAt: string
}

