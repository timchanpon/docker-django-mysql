import { useAuthGuard } from '../../hooks';
import { usersProvider } from '../../providers';

function UserInfo(props) {
	return (
		<>
			<p>Your name: {props.userInfo.name}</p>
			<p>Your email: {props.userInfo.email}</p>
		</>
	);
}

export async function getServerSideProps(ctx) {
	useAuthGuard(ctx);

	const payload = {
		withTodos: false,
		cookie: ctx.req.headers.cookie,
	};
	const { data } = await usersProvider.fetchUserData(payload);

	return {
		props: {
			userInfo: data,
		},
	};
}

export default UserInfo;
