import api from '../api'
import { ClientType } from '../types/clientType'

/**
 * Fetch all clients from the server.
 */
export const fetchAllClients = async () => {
	try {
		const response = await api.get('/all_clients')
		console.log('Fetched clients:', response.data)
		return response.data
	} catch (error: any) {
		console.error('Error fetching clients:', error)
		throw new Error('Failed to fetch clients')
	}
}

/**
 * Add a new client to the server.
 * @param clientData - Data of the new client to be added.
 */
export const addClient = async (clientData: ClientType): Promise<{ data: ClientType }> => {
	const userToken = localStorage.getItem('AuthToken')

	if (!userToken) {
		throw new Error('No authToken or user information')
	}

	try {
		const response = await api.post('/add_client', clientData, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})

		return { data: response.data }
	} catch (error) {
		console.error('Error adding client:', error)
		throw new Error('Failed to add client')
	}
}

export const updateClient = async (clientId: number, updatedData: ClientType): Promise<{ data: ClientType }> => {
	const userToken = localStorage.getItem('AuthToken')

	if (!userToken) {
		throw new Error('No authToken or user information')
	}

	try {
		const response = await api.put(`/update_client/${clientId}`, updatedData, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})

		console.log('Client updated successfully:', response.data)
		return { data: response.data }
	} catch (error) {
		console.error('Error updating client:', error)
		throw new Error('Failed to update client')
	}
}

export const deleteClient = async (clientId: number): Promise<void> => {
	const userToken = localStorage.getItem('AuthToken')

	if (!userToken) {
		throw new Error('No authToken or user information')
	}

	try {
		await api.delete(`/delete_client/${clientId}`, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})

		console.log('Client deleted successfully')
	} catch (error) {
		console.error('Error deleting client:', error)
		throw new Error('Failed to delete client')
	}
}
