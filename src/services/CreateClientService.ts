import axios from 'axios'
import api from '../api'
interface NewClient {
	full_name: string
	date_of_birth: string
	phone_number: string
	total_amount_of_work: string | number
}

export const createClient = async (client: NewClient) => {
	try {
		const response = await api.post('/add_client', client)
		return response.data
	} catch (error) {
		console.error('Ошибка при создании клиента:', error)
		throw error
	}
}
