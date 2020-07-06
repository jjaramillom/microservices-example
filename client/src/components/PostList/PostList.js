import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CommentCreate from '../CommentCreate/CommentCreate';
import CommentList from '../CommentList/CommentList';

const PostList = (props) => {
	const [posts, setPosts] = useState({});

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get('http://localhost:4002/post');
			setPosts(res.data);
		};
		fetchPosts();
	}, []);

	const renderPosts = Object.values(posts).map((post) => (
		<div className='card' style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
			<div className='card-body'>
				<h3>{post.title}</h3>
				<CommentList comments={post.comments} />
				<CommentCreate postId={post.id} />
			</div>
		</div>
	));

	return (
		<div className='d-flex flex-row flex-wrap justify-content-between'>{renderPosts}</div>
	);
};

export default PostList;
