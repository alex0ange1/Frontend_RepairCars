import React, { useState } from 'react'
import { loginUser } from '../services/LoginService'
import { useNavigate } from 'react-router-dom'
import '../assets/Login.css'
import { useDispatch } from 'react-redux'
import { setAuthToken } from '../features/auth/authSlice'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		console.log('Входим...', { email, password })

		try {
			const response = await loginUser({ email, password })

			console.log('Login response:', response)

			const access_token: string = response.access_token

			console.log('Login token = ', access_token)

			const isAuthenticated = true

			localStorage.setItem('userId', response.user.id)
			localStorage.setItem('userPhone', response.user.phone_number)
			localStorage.setItem('userName', response.user.name)
			localStorage.setItem('userEmail', response.user.email)
			localStorage.setItem('isRegistered', '1')
			localStorage.setItem('isAdmin', response.user.is_admin ? 'true' : 'false')
			dispatch(setAuthToken(access_token))
			//localStorage.setItem('AuthToken', access_token)
			localStorage.setItem('AuthToken', response.access_token)
			localStorage.setItem('isAuth', 'true')
			console.log('!1!1', localStorage.getItem('isAuth'))
			navigate('/profile')
		} catch (err: any) {
			console.error('Login error:', err)
		}
	}

	return (
		<div className='login-container'>
			<h1>Вход</h1>
			<div>
				<div>
					<label>Email</label>
					<input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					<label>Пароль</label>
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<button onClick={handleSubmit}>Войти</button>
			</div>

			<div>
				<button onClick={() => navigate('/register')}>Еще нет аккаунта? Зарегистрируйтесь</button>
			</div>
		</div>
	)
}

export default Login
