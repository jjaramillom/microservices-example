import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = (props) => {
	const [title, setTitle] = useState('');

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (!title) return;
		await axios.post('http://localhost:4000/post', { title: title });

		setTitle('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>Title</label>
					<input
						value={title}
						onChange={(ev) => setTitle(ev.target.value)}
						className='form-control'
					/>
				</div>
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};

export default PostCreate;
