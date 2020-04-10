import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentProfile } from './../../redux/actions/profile';

import Spinner from '../layout/Spinner';

const Dashboard = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const { userProfile, loading } = profile;
	const { user } = auth;
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);
	return loading && userProfile === null ? (
		<Spinner />
	) : (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>
				{'    '}
				Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<>Has </>
			) : (
				<>
					<p>You have not yet set up a profile please add some info</p>
					<Link to='/create-profile' className='btn btn-primary' />
				</>
			)}
		</>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: propTypes.func,
	auth: propTypes.object,
	profile: propTypes.object,
};

export default Dashboard;
