import React, { useEffect, useState } from 'react'
import { fetchAllClients } from '../services/AllClientsService'
import { addClient, updateClient, deleteClient } from '../services/AllClientsService'
import { useNavigate } from 'react-router-dom'
import '../assets/AllClients.css'

interface Client {
	id: number
	full_name: string
	date_of_birth: string
	phone_number: string
	total_amount_of_work: number
}

const AllClients: React.FC = () => {
	const [clients, setClients] = useState<Client[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [accessDenied, setAccessDenied] = useState(false)

	const [newClient, setNewClient] = useState<Client>({
		id: 0,
		full_name: '',
		date_of_birth: '',
		phone_number: '',
		total_amount_of_work: 0,
	})

	const navigate = useNavigate()

	useEffect(() => {
		const userRole = localStorage.getItem('isAdmin')
		if (userRole !== 'true') {
			setAccessDenied(true)
			return
		}

		setIsAdmin(true)

		const getClients = async () => {
			try {
				const data = await fetchAllClients()
				setClients(data)
			} catch (err: any) {
				setError('Не удалось загрузить список клиентов.')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		getClients()
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewClient(prevState => ({ ...prevState, [name]: value }))
	}

	const handleAddClient = async () => {
		try {
			await addClient(newClient)
			setIsModalOpen(false)
			setNewClient({
				id: 0,
				full_name: '',
				date_of_birth: '',
				phone_number: '',
				total_amount_of_work: 0,
			})
			const updatedClients = await fetchAllClients()
			setClients(updatedClients)
		} catch (err) {
			console.error('Ошибка при создании клиента:', err)
		}
	}

	const handleUpdateClient = async (client: Client) => {
		try {
			await updateClient(client.id, client)
			setIsModalOpen(true)
			setNewClient(client)
			const updatedClients = await fetchAllClients()
			setClients(updatedClients)
		} catch (err) {
			console.error('Ошибка при обновлении клиента:', err)
		}
	}

	const handleDeleteClient = async (clientId: number) => {
		try {
			await deleteClient(clientId)
			const updatedClients = await fetchAllClients()
			setClients(updatedClients)
		} catch (err) {
			console.error('Ошибка при удалении клиента:', err)
		}
	}

	if (accessDenied) {
		return (
			<div className='clients-container error-message'>
				<h1>Доступ запрещен</h1>
				<p>Эта страница доступна только для администраторов.</p>
				<button onClick={() => navigate('/profile')}>Вернуться на страницу профиля</button>
			</div>
		)
	}

	if (loading) {
		return <div className='clients-container'>Загрузка...</div>
	}

	if (error) {
		return <div className='clients-container error-message'>{error}</div>
	}

	return (
		<div className='clients-container'>
			<h1>Список клиентов</h1>
			{isAdmin && (
				<button className='add-client-button' onClick={() => setIsModalOpen(true)}>
					Добавить клиента
				</button>
			)}
			<table className='clients-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Полное имя</th>
						<th>Дата рождения</th>
						<th>Телефон</th>
						<th>Объем работы (₽)</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{clients.map(client => (
						<tr key={client.id}>
							<td>{client.id}</td>
							<td>{client.full_name}</td>
							<td>{new Date(client.date_of_birth).toLocaleDateString()}</td>
							<td>{client.phone_number}</td>
							<td>{client.total_amount_of_work || 'Нет данных'}</td>
							<td>
								<button onClick={() => handleUpdateClient(client) || setIsModalOpen(true)}>Обновить</button>
								<button onClick={() => handleDeleteClient(client.id)}>Удалить</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modal for adding/updating a client */}
			{isModalOpen && (
				<div className='modal'>
					<div className='modal-content'>
						<h2>{newClient.id ? 'Обновить клиента' : 'Добавить нового клиента'}</h2>
						<div>
							<label>Полное имя:</label>
							<input type='text' name='full_name' value={newClient.full_name} onChange={handleInputChange} required />
						</div>
						<div>
							<label>Дата рождения:</label>
							<input type='date' name='date_of_birth' value={newClient.date_of_birth} onChange={handleInputChange} required />
						</div>
						<div>
							<label>Телефон:</label>
							<input type='text' name='phone_number' value={newClient.phone_number} onChange={handleInputChange} required />
						</div>
						<div>
							<label>Объем работы (₽):</label>
							<input type='number' name='total_amount_of_work' value={newClient.total_amount_of_work} onChange={handleInputChange} />
						</div>
						<div className='modal-actions'>
							<button onClick={newClient.id ? () => handleUpdateClient(newClient) : handleAddClient} className='submit-button'>
								{newClient.id ? 'Обновить' : 'Сохранить'}
							</button>
							<button onClick={() => setIsModalOpen(false)} className='cancel-button'>
								Отмена
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AllClients
