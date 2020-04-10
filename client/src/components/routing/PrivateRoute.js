import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

//...rest gets anything else thats passed in which you are unsure about
const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useSelector((state) => state.auth);
	const { isAuthenticated, loading } = auth;

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (!isAuthenticated && !loading) {
						return <Redirect to='/login' />;
					} else {
						return <Component {...props} />;
					}
				}}
			/>
		</>
	);
};
export default PrivateRoute;
