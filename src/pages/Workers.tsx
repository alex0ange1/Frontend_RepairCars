import React, { useEffect, useState } from 'react'
import { getWorkers, addWorker, updateWorker, deleteWorker } from '../services/WorkerService'
import '../assets/Workers.css'

interface Worker {
	id: number
	full_name: string
	experience: number
	salary: number
}

const Workers: React.FC = () => {
	const [workers, setWorkers] = useState<Worker[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [currentWorker, setCurrentWorker] = useState<Partial<Worker>>({
		full_name: '',
		experience: 0,
		salary: 0,
	})
	const isAdmin = localStorage.getItem('isAdmin') === 'true'

	useEffect(() => {
		fetchWorkers()
	}, [])

	const fetchWorkers = async () => {
		setLoading(true)
		try {
			const response = await getWorkers()
			setWorkers(response)
		} catch (err: any) {
			console.error('Error fetching workers:', err)
			setError('Не удалось загрузить список работников.')
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setCurrentWorker(prevState => ({
			...prevState,
			[name]: name === 'experience' || name === 'salary' ? Number(value) : value,
		}))
	}

	const handleAddWorker = async () => {
		try {
			await addWorker(currentWorker as Worker)
			setIsModalOpen(false)
			setCurrentWorker({ full_name: '', experience: 0, salary: 0 })
			await fetchWorkers()
		} catch (err) {
			console.error('Ошибка при создании работника:', err)
		}
	}

	const handleUpdateWorker = async () => {
		try {
			await updateWorker((currentWorker as Worker).id, currentWorker as Worker)
			setIsModalOpen(false)
			setCurrentWorker({ full_name: '', experience: 0, salary: 0 })
			await fetchWorkers()
		} catch (err) {
			console.error('Ошибка при обновлении работника:', err)
		}
	}

	const handleDeleteWorker = async (workerId: number) => {
		try {
			await deleteWorker(workerId)
			await fetchWorkers()
		} catch (err) {
			console.error('Ошибка при удалении работника:', err)
		}
	}

	const openModal = (mode: 'create' | 'edit', worker?: Worker) => {
		setModalMode(mode)
		setCurrentWorker(worker || { full_name: '', experience: 0, salary: 0 })
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setCurrentWorker({ full_name: '', experience: 0, salary: 0 })
	}

	if (loading) return <div>Загрузка...</div>
	if (error) return <div className='error-message'>{error}</div>

	return (
		<div className='workers-container'>
			<h1>Наши работники</h1>

			{isAdmin && <button onClick={() => openModal('create')}>Добавить нового работника</button>}

			{isModalOpen && (
				<div className='modal'>
					<div className='modal-content'>
						<h3>{modalMode === 'create' ? 'Добавить нового работника' : 'Редактировать работника'}</h3>
						<input type='text' name='full_name' placeholder='Имя' value={currentWorker.full_name || ''} onChange={handleInputChange} />
						<input type='number' name='experience' placeholder='Опыт (лет)' value={currentWorker.experience || 0} onChange={handleInputChange} />
						<input type='number' name='salary' placeholder='Зарплата' value={currentWorker.salary || 0} onChange={handleInputChange} />
						<div className='modal-actions'>
							<button onClick={modalMode === 'create' ? handleAddWorker : handleUpdateWorker}>Сохранить</button>
							<button onClick={closeModal}>Отмена</button>
						</div>
					</div>
				</div>
			)}

			<div className='workers-grid'>
				{workers.map(worker => (
					<div key={worker.id} className='worker-card'>
						<h3>{worker.full_name}</h3>
						<p>Опыт работы: {worker.experience} лет(года)</p>
						<p>Зарплата: {worker.salary} руб.</p>
						{isAdmin && (
							<>
								<button onClick={() => openModal('edit', worker)}>Обновить</button>
								<button onClick={() => handleDeleteWorker(worker.id)}>Удалить</button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Workers
