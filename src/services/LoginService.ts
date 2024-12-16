import axios from 'axios'
import api from '../api'

export const loginUser = async (credentials: { email: string; password: string }) => {
	console.log('Making POST request to login with', credentials)

	try {
		const response = await api.post('/login', credentials)
		console.log('Response from login:', response)
		return response.data
	} catch (err: any) {
		console.error('Error during login request:', err)
		throw err
	}
}
