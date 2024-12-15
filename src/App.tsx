import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import './App.css'
import Welcome from './pages/Welcome'

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Welcome />} />
			</Routes>
		</Router>
	)
}

export default App
