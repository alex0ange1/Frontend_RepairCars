import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import profileReducer from './features/profile/profileSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
