import React, { useEffect, useState } from 'react'
import { fetchClientProfile } from '../services/clientService'
import '../assets/Profile.css'

const phone_number = String(localStorage.getItem('userPhone'))

console.log('Phone number alo', phone_number)

interface ClientProfile {
	id: number
	full_name: string
	date_of_birth: string
	phone_number: string
	total_amount_of_work?: number
}

const Profile: React.FC = () => {
	const [profile, setProfile] = useState<ClientProfile | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Для редактирования
	const [editMode, setEditMode] = useState(false)
	const [editedProfile, setEditedProfile] = useState<ClientProfile | null>(null)

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const data = await fetchClientProfile(phone_number) // Передаем clientId
				setProfile(data)
				setEditedProfile(data) // Сохраняем данные для редактирования
			} catch (err: any) {
				setError('Не удалось загрузить профиль. Попробуйте позже.')
			} finally {
				setLoading(false)
			}
		}

		loadProfile()
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editedProfile) {
			setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
		}
	}

	if (loading) return <div>Загрузка профиля...</div>
	if (error) return <div className='error'>{error}</div>

	return (
		<div className='profile-container'>
			<h1>Профиль клиента</h1>
			{editMode ? (
				<div className='profile-edit'>
					<label>
						Имя:
						<input type='text' name='full_name' value={editedProfile?.full_name || ''} />
					</label>
					<label>
						Дата рождения:
						<input type='date' name='date_of_birth' value={editedProfile?.date_of_birth || ''} />
					</label>
					<label>
						Номер телефона:
						<input type='text' name='phone_number' value={editedProfile?.phone_number || ''} />
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
	)
}

export default Profile
