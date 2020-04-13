import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/actions/post';

import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentsItem from './CommentsItem';
import { Link } from 'react-router-dom';

const Post = ({ match }) => {
	const specificPost = useSelector((state) => state.post);
	const dispatch = useDispatch();
	const { post, loading } = specificPost;
	useEffect(() => {
		dispatch(getPost(match.params.id));
	}, []);
	return loading || post === null ? (
		<Spinner />
	) : (
		<>
			<Link className='btn' to='/posts'>
				Back to posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => {
					return (
						<CommentsItem
							key={comment._id}
							comment={comment}
							postId={post._id}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Post;
