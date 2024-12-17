import axios from 'axios'
import api from '../api'

const phone_number = localStorage.getItem('userPhone')
export const fetchClientProfile = async (phone_number: string) => {
	try {
		// Шаг 1: Получить clientId по phone_number
		console.log(`Fetching client ID for phone number: ${phone_number}`)
		const idResponse = await api.get(`/client/by-phone/${phone_number}`)
		const clientId = idResponse.data.id

		if (!clientId) {
			throw new Error('Client ID not found for provided phone number')
		}

		// Шаг 2: Запросить данные клиента по clientId
		console.log(`Fetching client profile for ID: ${clientId}`)
		const response = await api.get(`/client/${clientId}`)
		return response.data
	} catch (err: any) {
		console.error('Error during fetchClientProfile request:', err)
		throw err
	}
}
