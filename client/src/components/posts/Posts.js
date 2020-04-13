import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/post';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const Posts = () => {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post);
	const { loading, posts } = post;

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch, post]);
	return loading ? (
		<Spinner />
	) : (
		<>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the community
			</p>
			{/* Post form */}
			<div className='posts'>
				{posts.map((post) => {
					return <PostItem key={post._id} post={post} />;
				})}
			</div>
		</>
	);
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
};

export default Posts;
