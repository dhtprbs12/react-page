/*
	Comment.js

	This is a function component.
	This is a helper component to create a comment in an element.
*/

import React from 'react'
function Comment(props){
	return(
		<li id={props.id}>
			<div>
				<span><b>{props.nickname} </b> {props.comment}</span>
			</div>
		</li>
	)
}

export default Comment
