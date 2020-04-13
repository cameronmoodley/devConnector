import React from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../redux/actions/profile';

const Experience = ({ experience }) => {
	const dispatch = useDispatch();
	const experiences = experience.map((exp) => {
		return (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td className='hide-sm'>{exp.title}</td>
				<td className='hide-sm'>
					<Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
					{exp.to !== null ? (
						<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
					) : (
						<span>Current</span>
					)}
				</td>
				<td>
					<button
						className='btn btn-danger'
						onClick={() => {
							dispatch(deleteExperience(exp.id));
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
			<h2 className='my2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<th>Company</th>
					<th className='hide-sm'>Title</th>
					<th className='hide-sm'>Years</th>
					<th>Delete </th>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</>
	);
};

Experience.propTypes = {
	experience: propTypes.array.isRequired,
};

export default Experience;
