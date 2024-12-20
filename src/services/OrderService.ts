import api from '../api'
import { ReceiptType } from '../types/receiptType'

export const fetchAllServices = async () => {
	try {
		const response = await api.get('/all_services')
		console.log('Fetched services:', response.data)
		return response.data
	} catch (error: any) {
		console.error('Error fetching services:', error)
		throw new Error('Failed to fetch services')
	}
}

export const getOrdersByDateRange = async (userToken: string, start_date: string, end_date: string): Promise<{ data: ReceiptType[] }> => {
	if (!userToken || !start_date || !end_date) {
		throw new Error('No authToken or date range provided')
	}

	const isAuth = localStorage.getItem('isAuth')

	try {
		if (isAuth === 'true') {
			const response = await api.get(`/receipts/date_range/${start_date}/${end_date}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			})
			console.log('DATA: ', response.data)
			return { data: response.data } // Return the fetched data
		} else {
			// If not authenticated, handle the case gracefully
			// For example, you could return an empty array, or throw a specific error
			console.log('User is not authenticated')
			return { data: [] } // Return an empty data array if not authenticated
		}
	} catch (error) {
		throw new Error('Error fetching orders by date range')
	}
}

export const getOrdersForClient = async (userToken: string, customer_id: string): Promise<{ data: ReceiptType[] }> => {
	if (!userToken) {
		throw new Error('No authToken or date range provided')
	}

	const isAuth = localStorage.getItem('isAuth')

	try {
		if (isAuth === 'true') {
			const response = await api.get(`/receipts/client/${customer_id}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			})
			console.log('DATA: ', response.data)
			return { data: response.data } // Return the fetched data
		} else {
			// If not authenticated, handle the case gracefully
			// For example, return an empty data array or throw a specific error
			console.log('User is not authenticated')
			return { data: [] } // Return an empty data array if not authenticated
		}
	} catch (error) {
		throw new Error('Error fetching orders for the client')
	}
}
