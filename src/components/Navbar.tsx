import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Navbar.css'

const Navbar: React.FC = () => {
	return (
		<nav className='navbar'>
			<div className='navbar-brand'>СТО "АвтоДоктор"</div>
			<ul className='navbar-links'>
				<li>
					<Link to='/'>Домой</Link>
				</li>
				<li>
					<Link to='/login'>Войти</Link>
				</li>
				<li>
					<Link to='/register'>Зарегистрироваться</Link>
				</li>
				<li>
					<Link to='/profile'>Профиль</Link>
				</li>
				<li>
					<Link to='/orders'>Услуги</Link>
				</li>
				<li>
					<Link to='/workers'>Работники</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
