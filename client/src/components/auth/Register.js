import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import { setAlert } from './../../redux/actions/alert';
import { register } from './../../redux/actions/auth';

const Register = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			dispatch(setAlert('Passwords do not match', 'danger', 1000));
		} else {
			dispatch(register({ name, email, password }));
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						value={name}
						onChange={(e) => onChange(e)}
						name='name'
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						onChange={(e) => onChange(e)}
						value={email}
						name='email'
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
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
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						onChange={(e) => onChange(e)}
						value={password2}
						minLength='6'
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	);
};

Register.propTypes = {
	setAlert: propTypes.func,
	register: propTypes.func,
	isAuthenticated: propTypes.bool.isRequired,
};

export default Register;
