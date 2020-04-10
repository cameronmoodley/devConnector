import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import { logout } from './../../redux/actions/auth';

export const Navbar = () => {
	// useEffect(() => {}, []);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { isAuthenticated, loading } = auth;
	const guestLinks = (
		<ul>
			<li>
				<Link to='!#'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	const authLinks = (
		<ul>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user'></i>
					{'  '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li>
				<a
					href='#!'
					onClick={() => {
						dispatch(logout());
					}}
				>
					<i className='fas fa-sign-out-alt'></i>
					{'  '}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			{!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	);
};

Navbar.propTypes = {
	logout: propTypes.func,
};

export default Navbar;
