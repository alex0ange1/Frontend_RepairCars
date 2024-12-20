import api from '../api'
import { WorkerType } from '../types/workerType'
export {}

export const getWorkers = async () => {
	try {
		const response = await api.get('/all_workers')
		console.log('Fetched workers:', response.data)
		return response.data
	} catch (err: any) {
		console.error('Error fetching workers:', err)
		throw err
	}
}

export const addWorker = async (clientData: WorkerType): Promise<{ data: WorkerType }> => {
	const userToken = localStorage.getItem('AuthToken')

	if (!userToken) {
		throw new Error('No authToken or user information')
	}

	try {
		const response = await api.post('/add_worker', clientData, {
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

export const updateWorker = async (workerId: number, updatedData: WorkerType): Promise<{ data: WorkerType }> => {
	const userToken = localStorage.getItem('AuthToken')

	if (!userToken) {
		throw new Error('No authToken or user information')
	}

	try {
		const response = await api.put(`/update_worker/${workerId}`, updatedData, {
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

export const deleteWorker = async (workerId: number): Promise<void> => {
	const userToken = localStorage.getItem('AuthToken')

	if (!userToken) {
		throw new Error('No authToken or user information')
	}

	try {
		await api.delete(`/delete_worker/${workerId}`, {
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
