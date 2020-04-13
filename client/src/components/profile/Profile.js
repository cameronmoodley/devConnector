import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../redux/actions/profile';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

import Spinner from './../layout/Spinner';

const Profile = ({ match }) => {
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const { profile, loading } = userProfile;

	useEffect(() => {
		dispatch(getProfileById(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<>
					<Link to='/profiles' className='btn btn-light'>
						Back to profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}

					<div className='profile-top bg-primary p-2'>
						<ProfileTop profile={profile} />
					</div>
					<ProfileAbout profile={profile} />
					<div className='profile-exp bg-white p-2'>
						<h2 className='text-primary'>Experience</h2>
						{profile.experience.length > 0 ? (
							<>
								{profile.experience.map((v) => {
									return <ProfileExperience key={v._id} experience={v} />;
								})}
							</>
						) : (
							<>No Experience</>
						)}
					</div>

					<div className='profile-edu bg-white p-2'>
						<h2 className='text-primary'>Education</h2>
						{profile.education.length > 0 ? (
							<>
								{profile.education.map((v) => {
									return <ProfileEducation key={v._id} education={v} />;
								})}
							</>
						) : (
							<>No Education</>
						)}
					</div>

					<div>
						{profile.githubusername ? (
							<ProfileGithub username={profile.githubusername} />
						) : (
							<>Doesnt exsist</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
