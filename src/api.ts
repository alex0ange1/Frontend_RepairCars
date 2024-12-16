import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8020/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const getClients = async () => {
	try {
		const response = await api.get('/clients')
		return response.data
	} catch (error) {
		console.error('Error fetching clients:', error)
	}
}

export default api
