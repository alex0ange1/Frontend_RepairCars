import React, { useState } from 'react'
import '../assets/Register.css'

const Register: React.FC = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: '',
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const { username, email, password, role } = formData

		if (!username || !email || !password || !role) {
			setError('Все поля должны быть заполнены!')
			setSuccess('')
		} else {
			setError('')
			setSuccess('Вы успешно зарегистрировались!')
		}
	}

	return (
		<div className='register-container'>
			<h1>Регистрация</h1>
			{error && <div className='error-message'>{error}</div>}
			{success && <div className='success-message'>{success}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<input type='text' name='username' placeholder='Введите ваше имя' value={formData.username} onChange={handleChange} />
				</div>
				<div>
					<input type='email' name='email' placeholder='Введите ваш email' value={formData.email} onChange={handleChange} />
				</div>
				<div>
					<input type='password' name='password' placeholder='Введите пароль' value={formData.password} onChange={handleChange} />
				</div>
				<button type='submit'>Зарегистрироваться</button>
			</form>
		</div>
	)
}

export default Register
