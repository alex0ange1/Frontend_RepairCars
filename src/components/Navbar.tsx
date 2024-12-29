import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthToken, selectIsAuthenticated } from '../features/auth/authSlice'
import '../assets/Navbar.css'
import { clearProfile, isAdmin } from '../features/profile/profileSlice'

const Navbar: React.FC = () => {
	const isAuthenticated = localStorage.getItem('isAuth')
	const is_admin = localStorage.getItem('isAdmin')
	const dispatch = useDispatch()
	const isAuthenticated1 = useSelector(selectIsAuthenticated)
	console.log('!!!!', isAuthenticated)
	const navigate = useNavigate()

	const is_admin1 = useSelector(isAdmin)
	const handleLogout = () => {
		dispatch(clearAuthToken())
		dispatch(clearProfile())
		localStorage.setItem('isAuth', 'false')
		localStorage.removeItem('userPhone')
		navigate('/login') // Перенаправляем на страницу входа
	}

	return (
		<nav className='navbar'>
			<div className='navbar-brand'>СТО "АвтоДоктор"</div>
			<ul className='navbar-links'>
				{isAuthenticated == 'false' && (
					<>
						<li>
							<Link to='/login'>Авторизация</Link>
						</li>
						<li>
							<Link to='/register'>Регистрация</Link>
						</li>
					</>
				)}
				{isAuthenticated == 'true' && (
					<>
						{is_admin == 'true' && (
							<li>
								<Link to='/all_clients'>Работа с клиентами</Link>
							</li>
						)}
						<li>
							<Link to='/profile'>Профиль</Link>
						</li>
						<li>
							<Link to='/orders'>Услуги</Link>
						</li>
						<li>
							<Link to='/my_orders'>Мои услуги</Link>
						</li>
						<li>
							<Link to='/workers'>Мастера</Link>
						</li>
						<li>
							<button className='logout-button' onClick={handleLogout}>
								Выйти из аккаунта
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
