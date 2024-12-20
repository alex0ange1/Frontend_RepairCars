import React, { JSX, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css' // импортируем стили
import { Provider, useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Workers from './pages/Workers'
import store from './store'
import Orders from './pages/Orders'
import AllClients from './pages/AllClients'

interface ProtectedRouteInterface {
	isAuth: boolean
	children: JSX.Element
}

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteInterface) => {
	return isAuth ? children : <Navigate to='/login' />
}

const App = () => {
	const userLoggedIn = localStorage.getItem('isAuth')
	const isLogged = !!userLoggedIn

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/profile'
					element={
						<ProtectedRoute isAuth={isLogged}>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/workers'
					element={
						<ProtectedRoute isAuth={isLogged}>
							<Workers />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/orders'
					element={
						<ProtectedRoute isAuth={isLogged}>
							<Orders />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/all_clients'
					element={
						<ProtectedRoute isAuth={isLogged}>
							<AllClients />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	)
}

const AppWrapper = () => {
	return <App />
}

const WrappedApp = () => (
	<Provider store={store}>
		<AppWrapper />
	</Provider>
)

export default WrappedApp
