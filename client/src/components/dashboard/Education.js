import React from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from '../../redux/actions/profile';

const Education = ({ education }) => {
	const dispatch = useDispatch();
	const educations = education.map((edu) => {
		return (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td className='hide-sm'>{edu.degree}</td>
				<td className='hide-sm'>
					<Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
					{edu.to !== null ? (
						<Moment format='YYYY/MM/DD'>{edu.to}</Moment>
					) : (
						<span>Current</span>
					)}
				</td>
				<td>
					<button
						className='btn btn-danger'
						onClick={() => {
							dispatch(deleteEducation(edu._id));
						}}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});
	return (
		<>
			<h2 className='my2'>Education Credentials</h2>
			<table className='table'>
				<thead>
					<th>School</th>
					<th className='hide-sm'>Degree</th>
					<th className='hide-sm'>Years</th>
					<th>Delete </th>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</>
	);
};

Education.propTypes = {
	education: propTypes.array.isRequired,
};

export default Education;
