import api from '../api'

export const fetchClientProfile = async (dataToken: string, phone_number: string) => {
	// Проверяем, авторизован ли пользователь
	const isAuth = localStorage.getItem('isAuth')
	console.log('InService: ', isAuth)

	if (isAuth !== 'true') {
		console.error('User is not authenticated. Aborting request.')
		throw new Error('Unauthorized access. Please log in.')
	}

	try {
		// Шаг 1: Получить clientId по phone_number
		console.log(`Fetching client ID for phone number: ${phone_number}`)
		console.log(`Token: ${dataToken}`)
		const idResponse = await api.get(`/client/by-phone/${phone_number}`, {
			headers: {
				Authorization: `Bearer ${dataToken}`,
			},
		})

		const clientId = idResponse.data.id

		if (!clientId) {
			throw new Error('Client ID not found for provided phone number')
		}

		// Шаг 2: Запросить данные клиента по clientId
		console.log(`Fetching client profile for ID: ${clientId}`)
		const response = await api.get(`/client/${clientId}`, {
			headers: {
				Authorization: `Bearer ${dataToken}`,
			},
		})

		return response.data
	} catch (err: any) {
		console.error('Error during fetchClientProfile request:', err)
		throw err
	}
}
