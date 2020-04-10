import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Alert = () => {
	const alerts = useSelector((state) => state.alert);
	return (
		<div>
			{alerts !== null &&
				alerts.length > 0 &&
				alerts.map((alert) => {
					return (
						<div key={alert.id} className={`alert alert-${alert.alertType}`}>
							{alert.msg}
						</div>
					);
				})}
		</div>
	);
};

Alert.propTypes = {
	alerts: propTypes.array,
};

export default Alert;
