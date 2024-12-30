import React, { useEffect, useState } from 'react'
import { fetchClientProfile } from '../services/clientService'
import { getOrdersByDateRange, getOrdersForClient } from '../services/OrderService'
import '../assets/Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '../features/auth/authSlice'
import { Button, TextField, Snackbar } from '@mui/material'

interface ClientProfile {
	id: number
	full_name: string
	date_of_birth: string
	phone_number: string
	total_amount_of_work?: number
}

const phone_number = String(localStorage.getItem('userPhone'))

const Profile: React.FC = () => {
	const token = useSelector(selectAuthToken)
	const [profile, setProfile] = useState<ClientProfile | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const [startDate, setStartDate] = useState<string>('')
	const [endDate, setEndDate] = useState<string>('')
	const [userId, setUserId] = useState<string>('')

	const [successMessage, setSuccessMessage] = useState<{ isSuccess: boolean; message?: string }>({ isSuccess: false })

	const [editMode, setEditMode] = useState(false)
	const [editedProfile, setEditedProfile] = useState<ClientProfile | null>(null)

	const access_token = localStorage.getItem('AuthToken')
	const selector = useSelector(selectAuthToken)

	useEffect(() => {
		const loadProfile = async () => {
			// Получаем токен и номер телефона из localStorage
			const tokenFromStorage = localStorage.getItem('AuthToken')
			const phoneFromStorage = localStorage.getItem('userPhone')

			if (phoneFromStorage !== 'null' && tokenFromStorage) {
				setLoading(true) // Устанавливаем состояние загрузки
				try {
					const data = await fetchClientProfile(tokenFromStorage!, phoneFromStorage!)
					setProfile(data)
					setEditedProfile(data) // Сохраняем данные для редактирования
				} catch (err: any) {
					setError('Не удалось загрузить профиль. Попробуйте позже.')
					console.error('Ошибка загрузки профиля:', err)
				} finally {
					setLoading(false) // Завершаем состояние загрузки
				}
			} else {
				setError('Данные авторизации отсутствуют. Пожалуйста, войдите заново.')
				setLoading(false) // Останавливаем состояние загрузки
			}
		}

		loadProfile()
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editedProfile) {
			setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
		}
	}

	const handleCloseSnackbar = () => {
		setSuccessMessage({ ...successMessage, isSuccess: false })
		setError(null)
	}

	const convertToCSV = (data: any[]) => {
		const header = Object.keys(data[0]).join(',') // Получаем заголовки из первого объекта
		const rows = data.map(item => {
			return Object.values(item).join(',') // Преобразуем каждый объект в строку
		})
		return [header, ...rows].join('\n') // Объединяем заголовки и строки
	}

	const handleDownloadReportByDate = async () => {
		if (!startDate || !endDate) {
			setError('Пожалуйста, укажите начальную и конечную дату.')
			return
		}

		try {
			// Преобразуем даты в формат ISO
			const startDateISO = new Date(startDate).toISOString().split('T')[0]
			const endDateISO = new Date(endDate).toISOString().split('T')[0]

			const response = await getOrdersByDateRange(access_token!, startDateISO, endDateISO)

			// Преобразуем данные в CSV
			const csvData = convertToCSV(response.data)

			// Добавляем BOM для UTF-8
			const bom = '\uFEFF'
			const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' })
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'receipts_by_date_range.csv' // Имя файла для скачивания
			document.body.appendChild(a)
			a.click()
			a.remove()
			window.URL.revokeObjectURL(url)

			setSuccessMessage({ isSuccess: true, message: 'Отчет успешно скачан!' })
		} catch (error) {
			setError('Ошибка при скачивании отчета.')
		}
	}

	const handleDownloadReportByUserId = async () => {
		if (!userId) {
			setError('Пожалуйста, укажите ID пользователя.')
			return
		}

		try {
			const response = await getOrdersForClient(access_token!, userId)

			// Преобразуем данные в CSV
			const csvData = convertToCSV(response.data)

			// Добавляем BOM для UTF-8
			const bom = '\uFEFF'
			const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' })
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'receipts_by_user_id.csv' // Имя файла для скачивания
			document.body.appendChild(a)
			a.click()
			a.remove()
			window.URL.revokeObjectURL(url)

			setSuccessMessage({ isSuccess: true, message: 'Отчет успешно скачан!' })
		} catch (error) {
			setError('Ошибка при скачивании отчета.')
		}
	}

	if (loading) return <div>Загрузка профиля...</div>
	if (error) return <div className='error'>{error}</div>
	const isAdmin = localStorage.getItem('isAdmin')

	return (
		<div>
			{isAdmin === 'false' && (
				<div className='profile-container'>
					<h1>Профиль клиента</h1>
					{editMode ? (
						<div className='profile-edit'>
							<label>
								Имя:
								<input type='text' name='full_name' value={editedProfile?.full_name || ''} onChange={handleChange} />
							</label>
							<label>
								Дата рождения:
								<input type='date' name='date_of_birth' value={editedProfile?.date_of_birth || ''} onChange={handleChange} />
							</label>
							<label>
								Номер телефона:
								<input type='text' name='phone_number' value={editedProfile?.phone_number || ''} onChange={handleChange} />
							</label>
						</div>
					) : (
						<div className='profile-info'>
							<p>
								<strong>Имя:</strong> {profile?.full_name}
							</p>
							<p>
								<strong>Дата рождения:</strong> {profile?.date_of_birth}
							</p>
							<p>
								<strong>Номер телефона:</strong> {profile?.phone_number}
							</p>
							<p>
								<strong>Объем выполненных работ:</strong> {profile?.total_amount_of_work || 'Нет данных'}
							</p>
						</div>
					)}
				</div>
			)}

			{isAdmin === 'true' && (
				<div>
					<h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Вы вошли в систему как администратор</h1>
					<h2 style={{ fontSize: '21px', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Получить отчет</h2>

					<div className='date-picker-container'>
						<h3>По времени</h3>
						<div className='date-field'>
							<label htmlFor='start-date'>Начальная дата</label>
							<TextField id='start-date' type='datetime-local' value={startDate} onChange={e => setStartDate(e.target.value)} />
						</div>
						<div className='date-field'>
							<label htmlFor='end-date'>Конечная дата</label>
							<TextField id='end-date' type='datetime-local' value={endDate} onChange={e => setEndDate(e.target.value)} />
						</div>
						<Button onClick={handleDownloadReportByDate}>Получить отчет за период</Button>
					</div>

					<div className='user-report-container' style={{ marginTop: '16px', textAlign: 'center' }}>
						<h3>По пользователю</h3>
						<div className='user-report-input'>
							<TextField value={userId} onChange={e => setUserId(e.target.value)} label='ID пользователя' style={{ marginRight: '8px', width: '300px' }} />
							<Button onClick={handleDownloadReportByUserId}>Получить отчет по пользователю</Button>
						</div>
					</div>
				</div>
			)}

			<Snackbar open={successMessage.isSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar} message={successMessage.message} />
		</div>
	)
}

export default Profile
