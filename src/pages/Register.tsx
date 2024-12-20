import React, { useState } from 'react'
import '../assets/Register.css'
import { registerUser } from '../services/RegisterService'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [first_name, setFName] = useState('')
	const [last_name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone_number, setPhoneNumber] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState('')

	const navigate = useNavigate() // Инициализируем navigate

	const handleRegister = async () => {
		const payload = { first_name, last_name, email, password, phone_number: phone_number, date_of_birth: dateOfBirth }
		try {
			const response = await registerUser(payload)
			setTimeout(() => {
				navigate('/login') // Перенаправление на страницу логина
			}, 2000)

			console.log(response)
		} catch (err: any) {
			console.error(err)
		}
	}

	return (
		<div className='register-container'>
			<h1>Зарегистрироваться</h1>
			<div>
				<label htmlFor='fullName'>Фамилия и имя</label>
				<input
					type='text'
					id='fullName'
					placeholder='Введите фамилию и имя через пробел'
					onChange={e => {
						const [first_name, last_name] = e.target.value.split(' ', 2) // Разделение по первому пробелу
						setFName(first_name || '') // Устанавливаем фамилию
						setName(last_name || '') // Устанавливаем имя
					}}
					required
				/>
				<div>
					Email
					<input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					Пароль
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<div>
					Номер телефона
					<input type='tel' placeholder='+1234567890' value={phone_number} onChange={e => setPhoneNumber(e.target.value)} required />
				</div>
				<div>
					Дата рождения
					<input type='date' value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required />
				</div>
				<button type='button' onClick={handleRegister}>
					Зарегистрироваться
				</button>
			</div>

			{/* Кнопка для перехода на страницу логина */}
			<div>
				<button onClick={() => navigate('/login')}>Уже есть аккаунт?</button>
			</div>
		</div>
	)
}

export default Register
