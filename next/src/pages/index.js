import { useState } from 'react';
import { connect } from 'react-redux';

function Index(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const inputHandlers = {
		username: e => setUsername(e.target.value),
		password: e => setPassword(e.target.value),
	};

	const methods = {
		login() {
			const action = {
				type: 'users/login',
				credentials: {
					username: username,
					password: password,
				},
			};

			props.dispatch(action);
		},
		logout() {
			props.dispatch({ type: 'users/logout' });
		},
	};

	return (
		<>
			<input type="text" onChange={inputHandlers.username} />
			<input type="password" onChange={inputHandlers.password} />

			<button onClick={methods.login}>LOGIN</button>
			<button onClick={methods.logout}>LOGOUT</button>

			<p>Your name: {props.users.name}</p>
			<p>Your email: {props.users.email}</p>
		</>
	);
}

function mapStateToProps(state) {
	return state;
};

export default connect(mapStateToProps)(Index);
