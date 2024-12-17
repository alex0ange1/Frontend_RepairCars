import React, { useState } from 'react'
import { loginUser } from '../services/LoginService'
import { useNavigate } from 'react-router-dom'
import '../assets/Login.css'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		console.log('Входим...', { email, password })

		try {
			const response = await loginUser({ email, password })

			console.log('Login response:', response)

			const access_token: string = response.access_token
			console.log('Login token = ', access_token)

			console.log(response)

			localStorage.setItem('userId', response.user.id)
			localStorage.setItem('userPhone', response.user.phone_number)
			localStorage.setItem('userName', response.user.name)
			localStorage.setItem('userEmail', response.user.email)
		} catch (err: any) {
			console.error('Login error:', err)
		}
	}

	return (
		<div className='login-container'>
			<h1>Login</h1>
			<div>
				<div>
					<label>Email</label>
					<input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					<label>Пароль</label>
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<button onClick={handleSubmit}></button>
			</div>

			{/* Кнопка для перехода на страницу регистрации */}
			<div>
				<button onClick={() => navigate('/register')}>Еще нет аккаунта? Зарегистрируйтесь</button>
			</div>
		</div>
	)
}

export default Login
