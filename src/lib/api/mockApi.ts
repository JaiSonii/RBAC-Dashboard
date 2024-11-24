import { User } from '../features/users/usersSlice'

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock user data
const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
]

export const api = {
  users: {
    getAll: async (): Promise<User[]> => {
      await delay(500) // Simulate network delay
      return [...users]
    },
    add: async (user: Omit<User, 'id'>): Promise<User> => {
      await delay(500)
      const newUser = { ...user, id: Math.max(...users.map(u => u.id)) + 1 }
      users.push(newUser)
      return newUser
    },
    update: async (updatedUser: User): Promise<User> => {
      await delay(500)
      const index = users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        users[index] = updatedUser
        return updatedUser
      }
      throw new Error('User not found')
    },
    delete: async (id: number): Promise<void> => {
      await delay(500)
      const index = users.findIndex(u => u.id === id)
      if (index !== -1) {
        users.splice(index, 1)
      } else {
        throw new Error('User not found')
      }
    }
  }
}

