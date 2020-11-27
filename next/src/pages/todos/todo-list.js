import { compose } from 'redux';
import { useState } from 'react';

import { withState } from '../../stores/store';
import { todosProvider } from '../../providers';
import { withAuthGuard } from '../../utils/auth';
import { todosAction } from '../../stores/actions';

function TodoList() {
	const [isValid, setIsValid] = useState(false);

	const submit = async (e) => {
		e.preventDefault();

		const payload = { body: e.target.body.value };
		const { data } = await todosProvider.createTodo(payload);

		setIsValid(data.isValid);
		setTimeout(() => setIsValid(false), 2500);
	}

	return (
		<>
			<form onSubmit={submit}>
				<input
					name="body"
					type="text"
					max="20"
					required
				/>
				<button type="submit">Submit</button>
			</form>

			{isValid && <p>Your todo has been created successfully.</p>}
		</>
	);
}

TodoList.getInitialProps = async ({ req, store }) => {
	const payload = process.browser ? {} : { cookie: req.headers.cookie };
	const action = todosAction.saga.fetchTodoList(payload);

	return await store.dispatch(action);
};

export default compose(withAuthGuard, withState)(TodoList);
