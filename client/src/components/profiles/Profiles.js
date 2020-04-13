import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

import { getProfiles } from '../../redux/actions/profile';

const Profiles = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);
	const userProfile = useSelector((state) => state.profile);
	const { profiles, loading } = userProfile;
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 className='large text-primary'>Profiles</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and connect with
						developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => {
								return <ProfileItem key={profile._id} profile={profile} />;
							})
						) : (
							<h4>No profiles found...</h4>
						)}
					</div>
				</>
			)}
		</>
	);
};

Profiles.propTypes = {
	getProfiles: propTypes.func.isRequired,
	profile: propTypes.object.isRequired,
};

export default Profiles;
