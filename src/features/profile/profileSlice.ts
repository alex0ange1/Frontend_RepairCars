// src/features/profile/profileSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileState {
	id: number
	first_name: string
	second_name: string
	phone_number: string
	date_of_birth: string
	email: string
	is_admin: boolean
}

const initialState: ProfileState = {
	id: 1,
	first_name: '',
	second_name: '',
	phone_number: '',
	date_of_birth: '',
	email: '',
	is_admin: false,
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<ProfileState>) {
			state.id = action.payload.id
			state.first_name = action.payload.first_name
			state.second_name = action.payload.second_name
			state.phone_number = action.payload.phone_number
			state.date_of_birth = action.payload.date_of_birth
			state.email = action.payload.email
			state.is_admin = action.payload.is_admin
		},
		clearProfile(state) {
			// Обнуляем все значения по отдельности
			state.id = 1
			state.first_name = ''
			state.second_name = ''
			state.phone_number = ''
			state.date_of_birth = ''
			state.email = ''
			state.is_admin = false
		},
	},
})

export const { setProfile, clearProfile } = profileSlice.actions
export default profileSlice.reducer

export const selectUser = (state: { profile: ProfileState }) => state.profile
export const isAdmin = (state: { profile: ProfileState }) => state.profile.is_admin
