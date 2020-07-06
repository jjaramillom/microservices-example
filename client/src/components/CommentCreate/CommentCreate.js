import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = (props) => {
	const [content, setContent] = useState('');

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (!content) return;
		await axios.post(`http://localhost:4001/post/${props.postId}/comment`, { content: content });

		setContent('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>New Comment</label>
					<input
						value={content}
						onChange={(ev) => setContent(ev.target.value)}
						className='form-control'
					/>
				</div>
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};

export default PostCreate;
