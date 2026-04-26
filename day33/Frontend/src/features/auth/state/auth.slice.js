import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login, register, getMe } from "../service/auth.api"

export const registerUser = createAsyncThunk(
    'auth/registerUser', async (userData, { rejectWithValue }) => {
        try {
            const response = await register(userData)
            return response
        }
        catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data?.message || "Registration failed")
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser', async (credentials, { rejectWithValue }) => {
        try {
            return await login(credentials)
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed")
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser', async (_, { rejectWithValue }) => {
        try {
            const response = await getMe()
            return response
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user data")
        }

    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.loading = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.loading = false
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {logout}=authSlice.actions
export default authSlice.reducer
