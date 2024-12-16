import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import './App.css'
import Welcome from './pages/Welcome'
import Register from './components/Register'
import Login from './components/Login'

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</Router>
	)
}

export default App
