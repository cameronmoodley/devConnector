import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import { login } from './../../redux/actions/auth';

const Login = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into your account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						onChange={(e) => onChange(e)}
						value={email}
						name='email'
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						onChange={(e) => onChange(e)}
						value={password}
						minLength='6'
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
				<p className='my-1'>
					Need have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</form>
		</>
	);
};

Login.propTypes = {
	login: propTypes.func,
	isAuthenticated: propTypes.bool,
};

export default Login;
