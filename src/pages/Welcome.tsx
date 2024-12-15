import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Welcome.css' // Import the CSS file

const Welcome = () => {
	return (
		<div className='welcome-container'>
			<h1>Добро пожаловать в АвтоДоктор!</h1>
			<p>Войдите или зарегистрируйтесь, чтобы продолжить</p>
			<div>
				<button>
					<Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>
						Войти
					</Link>
				</button>
				<button>
					<Link to='/register' style={{ color: 'white', textDecoration: 'none' }}>
						Зарегистрироваться
					</Link>
				</button>
			</div>
		</div>
	)
}

export default Welcome
