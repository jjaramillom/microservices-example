import React from 'react';

const CommentList = (props) => {
	const renderPosts = props.comments.map((comment) => (
		<li key={comment.id}>
			{comment.content} - {<i>{comment.status}</i>}
		</li>
	));

	return <ul>{renderPosts}</ul>;
};

export default CommentList;
