import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
	getCurrentProfile,
	deleteAccount,
} from './../../redux/actions/profile';

import DashboardActions from './DashboardActions';

import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const { profile, loading } = userProfile;
	const { user } = auth;
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);
	return loading && profile === null ? (
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
				<>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button
							className='btn btn-danger'
							onClick={() => {
								dispatch(deleteAccount());
							}}
						>
							<i className='fas fa-user-minus'></i> {'    '}
							Delete My Account
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet set up a profile please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
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
