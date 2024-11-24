import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/mockApi'

export type User = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

interface UsersState {
  users: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
}

const validateUser = (user: Partial<User>): string | null => {
  if (!user.name || user.name.trim() === '') return 'Name is required'
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) return 'Valid email is required'
  if (!user.role || !['Admin', 'Editor', 'Viewer'].includes(user.role)) return 'Valid role is required'
  if (user.status && !['Active', 'Inactive'].includes(user.status)) return 'Status must be Active or Inactive'
  return null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.users.getAll()
  return response
})

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: Omit<User, 'id'>, { rejectWithValue }) => {
    const error = validateUser(user)
    if (error) return rejectWithValue(error)
    try {
      const response = await api.users.add(user)
      return response
    } catch (err) {
        console.log(err)
      return rejectWithValue('Failed to add user')
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: User, { rejectWithValue }) => {
    const error = validateUser(user)
    if (error) return rejectWithValue(error)
    try {
      const response = await api.users.update(user)
      return response
    } catch (err) {
        console.log(err)
      return rejectWithValue('Failed to update user')
    }
  }
)

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await api.users.delete(id)
  return id
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export default usersSlice.reducer

