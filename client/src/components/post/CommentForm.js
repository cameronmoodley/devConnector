import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions/post';

const CommentForm = ({ postId }) => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(addComment(postId, { text }));
					setText('');
				}}
			>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					name='text'
					cols='30'
					rows='5'
					placeholder='Add a comment'
					required
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {};

export default CommentForm;
