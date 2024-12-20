import React, { useEffect, useState } from 'react'
import { fetchAllServices } from '../services/OrderService'
import '../assets/Orders.css'

interface Service {
	id: number
	name: string
	service_cost: number
	description: string
}

const Orders: React.FC = () => {
	const [services, setServices] = useState<Service[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedService, setSelectedService] = useState<Service | null>(null)
	const [appointmentDate, setAppointmentDate] = useState<string>('')

	useEffect(() => {
		const getServices = async () => {
			try {
				const data = await fetchAllServices()
				setServices(data)
			} catch (err: any) {
				setError('Не удалось загрузить данные об услугах.')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		getServices()
	}, [])

	const handleOpenForm = (service: Service) => {
		setSelectedService(service)
	}

	const handleFormSubmit = () => {
		alert(`Вы записаны на услугу "${selectedService?.name}" на дату: ${appointmentDate}`)
		setSelectedService(null) // Закрыть форму
		setAppointmentDate('') // Очистить дату
	}

	if (loading) {
		return <div className='orders-container'>Загрузка...</div>
	}

	if (error) {
		return <div className='orders-container error-message'>{error}</div>
	}

	return (
		<div className='orders-container'>
			<h1>Услуги</h1>
			<div className='orders-grid'>
				{services.map(service => (
					<div key={service.id} className='order-card'>
						<h3>{service.name}</h3>
						<p>
							<strong>Стоимость:</strong> {service.service_cost} ₽
						</p>
						<p>{service.description}</p>
						<button className='signup-button' onClick={() => handleOpenForm(service)}>
							Записаться
						</button>
					</div>
				))}
			</div>

			{/* Форма для выбора даты */}
			{selectedService && (
				<div className='modal-overlay'>
					<div className='modal'>
						<h2>Запись на услугу: {selectedService.name}</h2>
						<label>
							Выберите дату:
							<input type='date' value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} />
						</label>
						<div className='modal-buttons'>
							<button onClick={handleFormSubmit}>Записаться</button>
							<button onClick={() => setSelectedService(null)}>Отмена</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Orders
